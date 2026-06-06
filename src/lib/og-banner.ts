// ブログ用 OGP バナーをビルド時に自動生成する。
//   - 背景 = src/assets/og-bg/ の9枚（暗い画像）からテーマ別に自動選択（全面）
//   - 左に濃色スクリム＋テキスト（バッジ→タイトル(緑下線)→サブ→ロゴチップ）を合成
//   - 右に「貼り込み画像」(src/assets/og-art/) があれば前景として合成（Geminiで記事ごとに生成して配置）
//   - satori で SVG 化（文字はパス化）→ sharp で PNG 化
//
// 右の貼り込み画像（src/assets/og-art/）:
//   - 記事専用: <slug>.png を置くとその記事で最優先採用
//   - テーマ共通: document* / search* / design* / record* / data* / update* / general*
//   - 透過PNG推奨（暗い背景の上に重なるため、明るめ・白基調が映える）。無ければ右は背景のみ。
import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

const ASSETS = path.join(process.cwd(), 'src', 'assets');
const FONT_700 = fs.readFileSync(path.join(ASSETS, 'fonts', 'NotoSansJP-700.woff'));
const FONT_400 = fs.readFileSync(path.join(ASSETS, 'fonts', 'NotoSansJP-400.woff'));
const BG_DIR = path.join(ASSETS, 'og-bg'); // 背景（9枚・暗い）
const ART_DIR = path.join(ASSETS, 'og-art'); // 右の貼り込み画像（任意）
const LOGO_PATH = path.join(ASSETS, 'og-banner-logo.png');
const LOGO_URI = fs.existsSync(LOGO_PATH) ? `data:image/png;base64,${fs.readFileSync(LOGO_PATH).toString('base64')}` : null;

// ===== デザイントークン（余白・サイズ比・配色・スクリムを一元管理。全記事で再利用）=====
const T = {
  W: 1200,
  H: 630,
  padX: 70, // 左テキストのセーフマージン
  topbarH: 8,
  leftWidth: 700, // 分割時の左パネル幅（右図版＝500px）
  textMaxWidth: 640, // 全面背景時の左テキスト最大幅
  artWidth: 470, // 全面背景時に右へ貼る場合のエリア幅
  artPad: 44,
  ruleWidth: 92,
  ruleHeight: 6,
  color: {
    accent: '#2E8B2E',
    title: '#ffffff',
    sub: '#d3e1f5',
    eyebrowText: '#ffffff',
    sign: '#102a52',
    chipBg: '#ffffff',
    bgFallback: '#0d1c36',
    scrim: '8,16,34', // 左を濃くするスクリムの紺(rgb)
    topbarFrom: '#1B3A6B',
    topbarTo: '#2E8B2E',
  },
  // 横スクリムの不透明度（左濃→右薄）。白文字のコントラスト比 4.5:1 以上を確保。
  scrim: { left: 0.86, mid: 0.6, midPos: 40, far: 0.32, farPos: 68, right: 0.12 },
  font: { eyebrow: 22, title: 44, titleLineHeight: 1.42, sub: 23, subLineHeight: 1.55 },
  gap: { eyebrowToTitle: 22, titleToRule: 18, ruleToSub: 18 },
  titleMaxUnits: 12,
  subMaxUnits: 22,
};

function charUnits(ch: string): number {
  return /[\x20-\x7E｡-ﾟ]/.test(ch) ? 0.5 : 1;
}
const BREAK_AFTER = new Set('をはがにへともやのもかねるたで、。・･｜）」』】〕》'.split(''));
function wrapJa(text: string, maxUnits: number): string[] {
  const lines: string[] = [];
  let line = '', units = 0, lastBreak = -1;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    line += ch;
    units += charUnits(ch);
    if (BREAK_AFTER.has(ch)) lastBreak = line.length;
    if (units >= maxUnits && i < text.length - 1) {
      if (lastBreak > 0 && lastBreak < line.length) { lines.push(line.slice(0, lastBreak)); line = line.slice(lastBreak); }
      else { lines.push(line); line = ''; }
      units = line.split('').reduce((s, c) => s + charUnits(c), 0);
      lastBreak = -1;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const THEMES: Array<[string, string[]]> = [
  ['document', ['帳票', 'pdf', 'csv', 'excel', 'エクセル', '出力', '印刷', 'ドキュメント']],
  ['search', ['検索', '絞り込み', '一覧', 'サーチ', 'フィルタ']],
  ['design', ['デザイン', '見た目', 'おしゃれ', '装飾', 'ui', 'スタイル', 'テーマ', '配色']],
  ['record', ['レコード', 'フォーム', '入力', '詳細画面', '目次', 'フィールド', 'タブ']],
  ['data', ['集計', '分析', 'グラフ', 'サマリー', 'ランキング', '数値', '採番']],
  ['update', ['アップデート', '最新', '新機能', 'リリース', '20']],
];
const IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);
function listDir(dir: string): string[] {
  try { return fs.readdirSync(dir).filter((f) => IMG_EXT.has(path.extname(f).toLowerCase())).sort(); } catch { return []; }
}
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
function themeOf(tags: string[], title: string): string | null {
  const text = (tags.join(' ') + ' ' + title).toLowerCase();
  for (const [theme, kws] of THEMES) if (kws.some((k) => text.includes(k))) return theme;
  return null;
}
function pickBackground(tags: string[], title: string, slug: string): string {
  const files = listDir(BG_DIR);
  if (files.length === 0) return 'default.png';
  const theme = themeOf(tags, title);
  if (theme) { const m = files.filter((f) => f.toLowerCase().startsWith(theme)); if (m.length) return m[hash(slug) % m.length]; }
  const general = files.filter((f) => /^(general|default)/i.test(f));
  const pool = general.length ? general : files;
  return pool[hash(slug) % pool.length];
}
// 右の貼り込み画像：記事専用(<slug>) → テーマ → 無し
function pickArt(tags: string[], title: string, slug: string): string | null {
  const files = listDir(ART_DIR);
  if (files.length === 0) return null;
  const bySlug = files.find((f) => f.toLowerCase().startsWith(slug.toLowerCase()));
  if (bySlug) return bySlug;
  const theme = themeOf(tags, title);
  if (theme) { const m = files.filter((f) => f.toLowerCase().startsWith(theme)); if (m.length) return m[hash(slug) % m.length]; }
  return null;
}
function toDataUri(dir: string, file: string): string {
  const buf = fs.readFileSync(path.join(dir, file));
  const ext = path.extname(file).toLowerCase();
  const mime = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : ext === '.webp' ? 'image/webp' : 'image/png';
  return `data:${mime};base64,${buf.toString('base64')}`;
}

export interface BannerInput {
  title: string;
  tags?: string[];
  slug: string;
}

export async function renderBanner({ title, tags = [], slug }: BannerInput): Promise<Buffer> {
  const bgUri = toDataUri(BG_DIR, pickBackground(tags, title, slug));
  const artFile = pickArt(tags, title, slug);
  const artUri = artFile ? toDataUri(ART_DIR, artFile) : null;

  const bracket = title.match(/^[【\[]([^】\]]+)[】\]]\s*/);
  const eyebrow = bracket ? bracket[1].trim() : (tags.find((t) => t && t.toLowerCase() !== 'kintone') || 'kintone');
  const afterBracket = bracket ? title.slice(bracket[0].length) : title;
  const [mainRaw, ...restRaw] = afterBracket.split('｜');
  const mainTitle = mainRaw.trim();
  const subTitle = restRaw.join('｜').trim();

  const titleLineNodes = wrapJa(mainTitle, T.titleMaxUnits).map((l) => ({
    type: 'div',
    props: { style: { display: 'flex', fontSize: T.font.title, fontWeight: 700, color: T.color.title, lineHeight: T.font.titleLineHeight, letterSpacing: '0.01em', textShadow: '0 2px 14px rgba(0,0,0,0.5)' }, children: l },
  }));
  const subLineNodes = subTitle
    ? wrapJa(subTitle, T.subMaxUnits).map((l) => ({
        type: 'div',
        props: { style: { display: 'flex', fontSize: T.font.sub, fontWeight: 400, color: T.color.sub, lineHeight: T.font.subLineHeight, textShadow: '0 1px 8px rgba(0,0,0,0.45)' }, children: l },
      }))
    : [];

  const centerChildren: any[] = [
    { type: 'div', props: { style: { display: 'flex', alignSelf: 'flex-start', background: T.color.accent, color: T.color.eyebrowText, fontSize: T.font.eyebrow, fontWeight: 700, padding: '6px 18px', borderRadius: 999, letterSpacing: '0.08em', marginBottom: `${T.gap.eyebrowToTitle}px` }, children: eyebrow } },
    { type: 'div', props: { style: { display: 'flex', flexDirection: 'column' }, children: titleLineNodes } },
    { type: 'div', props: { style: { display: 'flex', width: T.ruleWidth, height: T.ruleHeight, background: T.color.accent, borderRadius: 3, marginTop: `${T.gap.titleToRule}px` } } },
  ];
  if (subLineNodes.length) {
    centerChildren.push({ type: 'div', props: { style: { display: 'flex', flexDirection: 'column', marginTop: `${T.gap.ruleToSub}px` }, children: subLineNodes } });
  }

  const logoChip = LOGO_URI
    ? { type: 'div', props: { style: { position: 'absolute', left: T.padX, bottom: 40, display: 'flex', alignItems: 'center', background: T.color.chipBg, borderRadius: 12, padding: '12px 22px', boxShadow: '0 4px 14px rgba(0,0,0,0.32)' }, children: [{ type: 'img', props: { src: LOGO_URI, style: { height: 44, width: 170, objectFit: 'contain' } } }] } }
    : { type: 'div', props: { style: { position: 'absolute', left: T.padX, bottom: 40, display: 'flex', fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '0.1em' }, children: 'KIZUNA Works' } };

  const s = T.scrim;
  const sc = T.color.scrim;
  const topbar = { type: 'div', props: { style: { position: 'absolute', top: 0, left: 0, right: 0, height: T.topbarH, background: `linear-gradient(90deg, ${T.color.topbarFrom} 0%, ${T.color.topbarTo} 100%)` } } };

  let element: any;
  if (artUri) {
    // 全面背景（暗い1枚）＋左テキスト＋右に透過イラストを重ねる（右パネルの白を廃止して一枚絵に）
    element = {
      type: 'div',
      props: {
        style: { width: T.W, height: T.H, display: 'flex', flexDirection: 'row', position: 'relative', fontFamily: 'Noto Sans JP', backgroundColor: T.color.bgFallback, backgroundImage: `url("${bgUri}")`, backgroundSize: 'cover', backgroundPosition: 'center' },
        children: [
          // 全面スクリム（左濃→右やや薄。右のイラストが沈まない程度に保つ）
          { type: 'div', props: { style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `linear-gradient(90deg, rgba(${sc},0.93) 0%, rgba(${sc},0.82) 45%, rgba(${sc},0.62) 72%, rgba(${sc},0.5) 100%)` } } },
          // 右イラストの背後にやわらかい光（被写体を浮かせる）
          { type: 'div', props: { style: { position: 'absolute', top: 0, right: 0, width: T.W - T.leftWidth + 60, bottom: 0, backgroundImage: 'radial-gradient(closest-side, rgba(255,255,255,0.10), rgba(255,255,255,0) 72%)' } } },
          // 左：テキスト
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', justifyContent: 'center', width: T.leftWidth, height: T.H, position: 'relative', padding: `0 ${T.padX}px 120px` },
              children: [{ type: 'div', props: { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: T.leftWidth - 2 * T.padX }, children: centerChildren } }],
            },
          },
          // 右：透過イラスト（暗い背景の上に直接合成）
          {
            type: 'div',
            props: {
              style: { display: 'flex', flex: 1, height: T.H, alignItems: 'center', justifyContent: 'center', padding: `${T.artPad}px`, position: 'relative' },
              children: [{ type: 'img', props: { src: artUri, style: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' } } }],
            },
          },
          topbar,
          logoChip,
        ],
      },
    };
  } else {
    // 全面背景：背景9枚＋左濃スクリム＋テキスト（右画像が未配置のとき）
    element = {
      type: 'div',
      props: {
        style: { width: T.W, height: T.H, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', fontFamily: 'Noto Sans JP', backgroundColor: T.color.bgFallback, backgroundImage: `url("${bgUri}")`, backgroundSize: 'cover', backgroundPosition: 'center' },
        children: [
          { type: 'div', props: { style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `linear-gradient(90deg, rgba(${sc},${s.left}) 0%, rgba(${sc},${s.mid}) ${s.midPos}%, rgba(${sc},${s.far}) ${s.farPos}%, rgba(${sc},${s.right}) 100%)` } } },
          topbar,
          { type: 'div', props: { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', padding: `0 ${T.padX}px`, maxWidth: T.textMaxWidth }, children: centerChildren } },
          logoChip,
        ],
      },
    };
  }

  const svg = await satori(element as any, {
    width: T.W,
    height: T.H,
    fonts: [
      { name: 'Noto Sans JP', data: FONT_700, weight: 700, style: 'normal' },
      { name: 'Noto Sans JP', data: FONT_400, weight: 400, style: 'normal' },
    ],
  });
  return await sharp(Buffer.from(svg)).png().toBuffer();
}
