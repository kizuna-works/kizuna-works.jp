/**
 * 販売代理店マスタ。
 *
 * ここに 1 件でも登録されると、全プラグイン製品ページのプラン欄の下に
 * 「販売代理店からのご購入」カードが表示される（ResellerCard.astro）。
 * 空配列のあいだはカード自体が出力されない。
 *
 * 掲載は販売代理店契約の締結後に行うこと（契約書 第9条第4項）。
 */
export type Reseller = {
  /** 会社名（掲載表記） */
  name: string;
  /** 肩書・認定表記（正式名称で書くこと） */
  title: string;
  /** 会社サイトの URL */
  siteUrl: string;
  /** 購入・導入相談の問い合わせ先 URL */
  contactUrl: string;
  /** ロゴ画像（public 配下の絶対パス）。未設定なら会社名のみ表示 */
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
};

export const resellers: Reseller[] = [];
