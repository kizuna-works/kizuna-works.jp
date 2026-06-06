// ブログ用 OGP バナーをビルド時に自動生成する。
//   - 背景画像は src/assets/og-bg/ に置いた画像から、記事のタグ/タイトルに合わせて自動選択
//   - その上にタイトル文字（日本語フォントをパス化）とブランド要素を重ねる
//   - satori で SVG 化 → sharp で PNG 化（追加ネイティブ依存なし）
//
// 背景画像の運用:
//   src/assets/og-bg/ に 1200x630 の画像（png/jpg/webp）を置く。
//   ファイル名の先頭でテーマを指定すると、その種類の記事で自動採用される:
//     document* … 帳票/PDF/Excel/CSV/出力 系
//     design*   … デザイン/見た目/UI 系
//     search*   … 検索/絞り込み/一覧 系
//     update*   … アップデート/最新/新機能 系
//     record*   … レコード/フォーム/目次/フィールド 系
//     data*     … 集計/分析/グラフ/ランキング 系
//     general*  … 汎用（テーマに当たらない記事はここから順番に選ばれる）
//   どれにも当たらない場合は general*（無ければ全画像）からスラッグで安定的に選択。
//   1枚も無い場合は default.png が使われる。

import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

// ビルド時の作業ディレクトリ（プロジェクトルート）基準で参照する。
// import.meta.url 相対だとバンドル後に解決位置がずれるため使わない。
const ASSETS = path.join(process.cwd(), 'src', 'assets');
const FONT_700 = fs.readFileSync(path.join(ASSETS, 'fonts', 'NotoSansJP-700.woff'));
const FONT_400 = fs.readFileSync(path.join(ASSETS, 'fonts', 'NotoSansJP-400.woff'));
const BG_DIR = path.join(ASSETS, 'og-bg');

// テーマ → 一致キーワード（タグ・タイトルに含まれていればそのテーマの背景を使う）
const THEMES: Array<[string, string[]]> = [
  ['document', ['帳票', 'pdf', 'csv', 'excel', 'エクセル', '出力', '印刷', 'ドキュメント']],
  ['search', ['検索', '絞り込み', '一覧', 'サーチ', 'フィルタ']],
  ['design', ['デザイン', '見た目', 'おしゃれ', '装飾', 'ui', 'スタイル', 'テーマ', '配色']],
  ['record', ['レコード', 'フォーム', '入力', '詳細画面', '目次', 'フィールド', 'タブ']],
  ['data', ['集計', '分析', 'グラフ', 'サマリー', 'ランキング', '数値', '採番']],
  ['update', ['アップデート', '最新', '新機能', 'リリース', '20']],
];

const IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);

function listBackgrounds(): string[] {
  try {
    return fs.readdirSync(BG_DIR).filter((f) => IMG_EXT.has(path.extname(f).toLowerCase())).sort();
  } catch {
    return [];
  }
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function pickBackground(tags: string[], title: string, slug: string): string {
  const files = listBackgrounds();
  if (files.length === 0) return 'default.png';
  const text = (tags.join(' ') + ' ' + title).toLowerCase();

  for (const [theme, kws] of THEMES) {
    if (kws.some((k) => text.includes(k))) {
      const matches = files.filter((f) => f.toLowerCase().startsWith(theme));
      if (matches.length) return matches[hash(slug) % matches.length];
    }
  }
  const general = files.filter((f) => /^(general|default)/i.test(f));
  const pool = general.length ? general : files;
  return pool[hash(slug) % pool.length];
}

function bgToDataUri(file: string): string {
  const buf = fs.readFileSync(path.join(BG_DIR, file));
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
  const bgFile = pickBackground(tags, title, slug);
  const bgDataUri = bgToDataUri(bgFile);

  const element = {
    type: 'div',
    props: {
      style: {
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundImage: `url("${bgDataUri}")`,
        backgroundSize: '1200px 630px',
        backgroundPosition: 'center',
        fontFamily: 'Noto Sans JP',
        position: 'relative',
      },
      children: [
        // contrast overlay
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage:
                'linear-gradient(180deg, rgba(15,28,51,0.25) 0%, rgba(15,28,51,0.55) 55%, rgba(15,28,51,0.82) 100%)',
            },
          },
        },
        // content
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
              padding: '70px',
              position: 'relative',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    fontSize: 60,
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.35,
                    textShadow: '0 2px 10px rgba(0,0,0,0.45)',
                  },
                  children: title,
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center', gap: '16px' },
                  children: [
                    { type: 'div', props: { style: { display: 'flex', width: 44, height: 6, background: '#2E8B2E', borderRadius: 3 } } },
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', fontSize: 30, fontWeight: 700, color: '#ffffff', letterSpacing: '0.05em', textShadow: '0 2px 8px rgba(0,0,0,0.4)' },
                        children: 'KIZUNA Works',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(element as any, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Noto Sans JP', data: FONT_700, weight: 700, style: 'normal' },
      { name: 'Noto Sans JP', data: FONT_400, weight: 400, style: 'normal' },
    ],
  });

  return await sharp(Buffer.from(svg)).png().toBuffer();
}
