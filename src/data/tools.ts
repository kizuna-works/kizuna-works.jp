// Single source of truth for free web tools (standalone HTML under /public/tools/).
// Add a new entry here and the tools index grid + JSON-LD ItemList, the home page
// hero stat count, the "数字で見る" stat, and the home mini grid all update automatically.
//
// Each tool's card visual is either a preview PNG (`image`) OR an inline SVG (`svg`)
// rendered in a dark wrapper. Provide exactly one of the two.

export interface Tool {
  /** File name under /public/tools/, e.g. 'Utsushi.html'. Page lives at /tools/<file>. */
  file: string;
  /** Display name on the tools index card heading. */
  name: string;
  /** Short brand name for the home page mini card (e.g. 'Utsushi'). */
  shortName: string;
  /** Long description shown on the tools index card. */
  description: string;
  /** schema.org applicationCategory for the JSON-LD SoftwareApplication. */
  applicationCategory: 'BusinessApplication' | 'UtilitiesApplication' | 'MultimediaApplication';
  /** Tag chips for the tools index card. The first chip is rendered with the highlight style. */
  tags: string[];
  /** Emoji icon for the home page mini card. */
  miniIcon: string;
  /** Short description for the home page mini card (e.g. 'PDF→HTML変換'). */
  miniDescription: string;
  /** Preview image (absolute /public path). Provide this OR `svg`, not both. */
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Inline SVG markup for tools without a preview image (rendered in a dark wrapper). */
  svg?: string;
  /** Label shown under the SVG in the dark wrapper. */
  svgLabel?: string;
  /**
   * kintone-specific tool (vs. generic web tools). These get special treatment:
   * a dedicated featured block on the home page and a separate group on the tools index.
   */
  kintoneNative?: boolean;
}

/** Public URL path for a tool (e.g. '/tools/Utsushi.html'). */
export const toolUrl = (t: Tool) => `/tools/${t.file}`;
/** Absolute URL for a tool (e.g. 'https://kizuna-works.jp/tools/Utsushi.html'). */
export const toolAbsUrl = (t: Tool) => `https://kizuna-works.jp/tools/${t.file}`;

// Ordered oldest → newest (release order).
export const tools: Tool[] = [
  {
    file: 'stamp-maker.html',
    name: 'inkan（電子印鑑メーカー）',
    shortName: 'inkan',
    description:
      'ブラウザ上で簡単に、背景が透過された高品質な電子印鑑（認印・データ印）を作成できる完全無料のWebアプリです。書類のペーパーレス化をサポートします。',
    applicationCategory: 'BusinessApplication',
    tags: ['完全無料', '登録不要', '透過PNG対応'],
    miniIcon: '🔴',
    miniDescription: '電子印鑑メーカー',
    image: '/images/stamp-maker-preview.png',
    imageAlt: 'inkan（電子印鑑メーカー）のプレビュー画像',
    imageWidth: 949,
    imageHeight: 813,
  },
  {
    file: 'natsuin.html',
    name: 'Natsuin（PDF捺印ツール）',
    shortName: 'Natsuin',
    description:
      'PDFファイルに電子印鑑・角印・署名を配置して捺印済みPDFを出力できる無料ツールです。日本語・英語署名にも対応。ファイルはブラウザ内で処理され、サーバーにはアップロードされません。',
    applicationCategory: 'BusinessApplication',
    tags: ['完全無料', '登録不要', 'PDF対応'],
    miniIcon: '📄',
    miniDescription: 'PDF捺印ツール',
    image: '/images/natsuin-preview.png',
    imageAlt: 'Natsuin（PDF捺印ツール）- PDFに電子印鑑・署名を配置できる無料ツール',
    imageWidth: 2848,
    imageHeight: 1504,
  },
  {
    file: 'musubi.html',
    name: 'Musubi（PDF結合・分割ツール）',
    shortName: 'Musubi',
    description:
      'PDFファイルを結合・分割・並び替え・回転できる完全無料のWebツールです。ドラッグ＆ドロップで直感的に操作でき、ファイルはブラウザ内で処理されます。',
    applicationCategory: 'BusinessApplication',
    tags: ['完全無料', '登録不要', 'PDF結合・分割'],
    miniIcon: '🔗',
    miniDescription: 'PDF結合・分割',
    image: '/images/musubi-preview.png',
    imageAlt: 'Musubi（PDF結合・分割ツール）- PDFを結合・分割・並び替え・回転できる無料ツール',
    imageWidth: 1200,
    imageHeight: 800,
  },
  {
    file: 'KizunaTsumugi.html',
    name: 'Tsumugi（QRコードジェネレーター）',
    shortName: 'Tsumugi',
    description:
      'URLやテキストからQRコードをブラウザ上で即座に生成できる完全無料のWebツールです。インストール・登録不要で、生成したQRコードはそのままダウンロードできます。',
    applicationCategory: 'UtilitiesApplication',
    tags: ['完全無料', '登録不要', 'QRコード生成'],
    miniIcon: '📱',
    miniDescription: 'QRコード生成',
    svgLabel: 'QRコードジェネレーター',
    svg: `<svg width="80" height="80" viewBox="0 0 72 72" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="24" height="24" rx="3" fill="none" stroke="#c8a872" stroke-width="2.5"/>
            <rect x="8" y="8" width="12" height="12" fill="#c8a872"/>
            <rect x="46" y="2" width="24" height="24" rx="3" fill="none" stroke="#c8a872" stroke-width="2.5"/>
            <rect x="52" y="8" width="12" height="12" fill="#c8a872"/>
            <rect x="2" y="46" width="24" height="24" rx="3" fill="none" stroke="#c8a872" stroke-width="2.5"/>
            <rect x="8" y="52" width="12" height="12" fill="#c8a872"/>
            <rect x="30" y="2" width="4" height="4" fill="#c8a872" opacity="0.8"/>
            <rect x="36" y="2" width="4" height="4" fill="#c8a872" opacity="0.4"/>
            <rect x="42" y="2" width="4" height="4" fill="#c8a872" opacity="0.8"/>
            <rect x="30" y="8" width="4" height="4" fill="#c8a872" opacity="0.4"/>
            <rect x="36" y="8" width="4" height="4" fill="#c8a872" opacity="0.8"/>
            <rect x="30" y="14" width="4" height="4" fill="#c8a872" opacity="0.8"/>
            <rect x="42" y="14" width="4" height="4" fill="#c8a872" opacity="0.4"/>
            <rect x="30" y="20" width="4" height="4" fill="#c8a872" opacity="0.4"/>
            <rect x="36" y="20" width="4" height="4" fill="#c8a872" opacity="0.8"/>
            <rect x="42" y="20" width="4" height="4" fill="#c8a872" opacity="0.8"/>
            <rect x="46" y="30" width="4" height="4" fill="#c8a872" opacity="0.8"/>
            <rect x="52" y="30" width="4" height="4" fill="#c8a872" opacity="0.4"/>
            <rect x="58" y="30" width="4" height="4" fill="#c8a872" opacity="0.8"/>
            <rect x="64" y="30" width="4" height="4" fill="#c8a872" opacity="0.4"/>
            <rect x="46" y="36" width="4" height="4" fill="#c8a872" opacity="0.4"/>
            <rect x="52" y="36" width="4" height="4" fill="#c8a872" opacity="0.8"/>
            <rect x="58" y="36" width="4" height="4" fill="#c8a872" opacity="0.4"/>
            <rect x="64" y="36" width="4" height="4" fill="#c8a872" opacity="0.8"/>
            <rect x="46" y="42" width="4" height="4" fill="#c8a872" opacity="0.8"/>
            <rect x="52" y="42" width="4" height="4" fill="#c8a872" opacity="0.4"/>
            <rect x="64" y="42" width="4" height="4" fill="#c8a872" opacity="0.8"/>
            <rect x="46" y="48" width="4" height="4" fill="#c8a872" opacity="0.4"/>
            <rect x="52" y="48" width="4" height="4" fill="#c8a872" opacity="0.8"/>
            <rect x="58" y="48" width="4" height="4" fill="#c8a872" opacity="0.8"/>
            <rect x="64" y="48" width="4" height="4" fill="#c8a872" opacity="0.4"/>
            <rect x="2" y="30" width="4" height="4" fill="#c8a872" opacity="0.8"/>
            <rect x="8" y="30" width="4" height="4" fill="#c8a872" opacity="0.4"/>
            <rect x="14" y="30" width="4" height="4" fill="#c8a872" opacity="0.8"/>
            <rect x="20" y="30" width="4" height="4" fill="#c8a872" opacity="0.4"/>
            <rect x="30" y="30" width="10" height="10" fill="#c8a872" opacity="0.6"/>
          </svg>`,
  },
  {
    file: 'masuku.html',
    name: 'Masuku（画像・PDFマスキングツール）',
    shortName: 'Masuku',
    description:
      '画像やPDFファイルの個人情報・機密情報をブラウザ上でマスキング（黒塗り）できる完全無料のWebツールです。ファイルはブラウザ内で処理され、サーバーにはアップロードされません。',
    applicationCategory: 'UtilitiesApplication',
    tags: ['完全無料', '登録不要', 'マスキング'],
    miniIcon: '⬛',
    miniDescription: '画像/PDFマスキング',
    svgLabel: 'マスキングツール',
    svg: `<svg width="80" height="80" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <rect x="4" y="10" width="56" height="44" rx="4" fill="#23252c" stroke="#c8a872" stroke-width="2.5"/>
            <rect x="10" y="18" width="20" height="14" rx="2" fill="#c8a872" opacity="0.3"/>
            <line x1="34" y1="22" x2="54" y2="22" stroke="#c8a872" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
            <line x1="34" y1="28" x2="54" y2="28" stroke="#c8a872" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
            <rect x="10" y="38" width="44" height="10" rx="2" fill="#c8a872" opacity="0.85"/>
            <line x1="14" y1="43" x2="50" y2="43" stroke="#1a1b20" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
          </svg>`,
  },
  {
    file: 'Shuku.html',
    name: 'Shuku（画像変換・圧縮・リサイズツール）',
    shortName: 'Shuku',
    description:
      'JPEG・PNG・WebP・GIF・BMP・TIFFをブラウザ上でリサイズ・圧縮・フォーマット変換できる完全無料のWebツールです。ファイルはブラウザ内で処理され、サーバーにはアップロードされません。',
    applicationCategory: 'MultimediaApplication',
    tags: ['完全無料', '登録不要', '画像変換'],
    miniIcon: '📦',
    miniDescription: '画像圧縮ツール',
    svgLabel: '画像変換・圧縮・リサイズ',
    svg: `<svg width="80" height="80" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <rect x="6" y="6" width="28" height="28" rx="3" fill="#c8a872" opacity="0.25" stroke="#c8a872" stroke-width="1.5"/>
            <rect x="6" y="6" width="28" height="28" rx="3" fill="none" stroke="#c8a872" stroke-width="1.5"/>
            <rect x="10" y="10" width="20" height="14" rx="1.5" fill="#c8a872" opacity="0.5"/>
            <circle cx="13" cy="14" r="2" fill="#c8a872" opacity="0.8"/>
            <path d="M10 24l6-5 5 4 4-3 5 4" stroke="#c8a872" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.8"/>
            <path d="M40 20 L58 20 M40 28 L54 28" stroke="#c8a872" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
            <path d="M44 34 L60 34 L60 58 L44 58 Z" fill="#c8a872" opacity="0.15" stroke="#c8a872" stroke-width="1.5"/>
            <path d="M48 46 L52 42 L56 46" stroke="#c8a872" stroke-width="1.5" stroke-linecap="round" fill="none"/>
            <path d="M52 42 L52 52" stroke="#c8a872" stroke-width="1.5" stroke-linecap="round"/>
          </svg>`,
  },
  {
    file: 'Utsushi.html',
    name: 'Utsushi（PDF→HTML変換ツール）',
    shortName: 'Utsushi',
    description:
      'PDFの見た目をそのまま忠実に再現したHTMLファイルに変換できる完全無料のWebツールです。PDFリーダー不要でブラウザで開けます。ファイルはブラウザ内で処理され、サーバーにはアップロードされません。',
    applicationCategory: 'UtilitiesApplication',
    tags: ['完全無料', '登録不要', 'PDF→HTML'],
    miniIcon: '📑',
    miniDescription: 'PDF→HTML変換',
    svgLabel: 'PDF→HTML変換',
    svg: `<svg width="80" height="80" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <rect x="10" y="6" width="30" height="40" rx="3" fill="#23252c" stroke="#c8a872" stroke-width="2.5"/>
            <path d="M32 6 L40 6 L40 14 Z" fill="#c8a872" opacity="0.35"/>
            <line x1="15" y1="16" x2="31" y2="16" stroke="#c8a872" stroke-width="2" stroke-linecap="round" opacity="0.55"/>
            <line x1="15" y1="22" x2="35" y2="22" stroke="#c8a872" stroke-width="2" stroke-linecap="round" opacity="0.35"/>
            <line x1="15" y1="28" x2="33" y2="28" stroke="#c8a872" stroke-width="2" stroke-linecap="round" opacity="0.35"/>
            <path d="M36 34 L48 28 L48 40 Z" fill="#c8a872" opacity="0.9"/>
            <rect x="34" y="36" width="26" height="22" rx="3" fill="#c8a872" opacity="0.18" stroke="#c8a872" stroke-width="2"/>
            <text x="47" y="51" font-family="monospace" font-size="9" font-weight="700" fill="#c8a872" text-anchor="middle" opacity="0.95">&lt;/&gt;</text>
          </svg>`,
  },
  {
    file: 'Shirushi.html',
    name: 'Shirushi（kintoneアプリアイコン作成ツール）',
    shortName: 'Shirushi',
    kintoneNative: true,
    description:
      'kintoneのアプリアイコンをブラウザ上で作成できる完全無料のWebツールです。背景・文字・アイコン・絵文字を組み合わせ、用途別プリセットからも編集できます。透過PNGで書き出せ、画像はブラウザ内で処理されサーバーに送信されません。',
    applicationCategory: 'MultimediaApplication',
    tags: ['完全無料', '登録不要', '透過PNG対応'],
    miniIcon: '🎨',
    miniDescription: 'アプリアイコン作成',
    image: '/images/shirushi-preview.png',
    imageAlt: 'Shirushi（kintoneアプリアイコン作成ツール）のサムネイル画像',
    imageWidth: 1280,
    imageHeight: 800,
  },
];
