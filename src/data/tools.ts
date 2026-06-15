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
    imageAlt: 'inkan（電子印鑑メーカー）のサムネイル画像',
    imageWidth: 1280,
    imageHeight: 800,
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
    imageAlt: 'Natsuin（PDF捺印ツール）のサムネイル画像',
    imageWidth: 1280,
    imageHeight: 800,
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
    imageAlt: 'Musubi（PDF結合・分割ツール）のサムネイル画像',
    imageWidth: 1280,
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
    image: '/images/tsumugi-preview.png',
    imageAlt: 'Tsumugi（QRコードジェネレーター）のサムネイル画像',
    imageWidth: 1280,
    imageHeight: 800,
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
    image: '/images/masuku-preview.png',
    imageAlt: 'Masuku（画像・PDFマスキングツール）のサムネイル画像',
    imageWidth: 1280,
    imageHeight: 800,
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
    image: '/images/shuku-preview.png',
    imageAlt: 'Shuku（画像変換・圧縮・リサイズツール）のサムネイル画像',
    imageWidth: 1280,
    imageHeight: 800,
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
    image: '/images/utsushi-preview.png',
    imageAlt: 'Utsushi（PDF→HTML変換ツール）のサムネイル画像',
    imageWidth: 1280,
    imageHeight: 800,
  },
  {
    file: 'Tsukuroi.html',
    name: 'Tsukuroi（AI物体除去ツール）',
    shortName: 'Tsukuroi',
    description:
      '画像内の人物・看板・電線などの不要物を、消したい場所を塗るだけでAIが周囲となじませて消去できる完全無料のWebツールです。AI処理を含めすべてブラウザ内で完結し、画像はサーバーにアップロードされません。',
    applicationCategory: 'MultimediaApplication',
    tags: ['完全無料', '登録不要', 'AI物体除去'],
    miniIcon: '🪄',
    miniDescription: 'AI物体除去',
    image: '/images/tsukuroi-preview.png',
    imageAlt: 'Tsukuroi（AI物体除去ツール）のサムネイル画像',
    imageWidth: 1280,
    imageHeight: 800,
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
  {
    file: 'Obi.html',
    name: 'Obi（kintoneカバー画像作成ツール）',
    shortName: 'Obi',
    kintoneNative: true,
    description:
      'kintoneのスペース・ポータルのカバー画像をブラウザ上で作成できる完全無料のWebツールです。約30種の柄・グラデ・画像背景に文字やロゴを合成し、左端の正方形アイコンと横長カバー帯の見え方を同時にプレビューできます。画像はブラウザ内で処理されサーバーに送信されません。',
    applicationCategory: 'MultimediaApplication',
    tags: ['完全無料', '登録不要', 'スペース/ポータル対応'],
    miniIcon: '🎏',
    miniDescription: 'カバー画像作成',
    image: '/images/obi-preview.png',
    imageAlt: 'Obi（kintoneカバー画像作成ツール）のサムネイル画像',
    imageWidth: 1280,
    imageHeight: 800,
  },
];
