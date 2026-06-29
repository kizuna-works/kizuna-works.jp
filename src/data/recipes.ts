// Dashboard for kintone — setting recipes (use-case driven configuration guides).
// Each recipe maps a widget type to a concrete use case with goal + steps + result image.
// The optional `config` field embeds the widget definition so result screenshots can be
// regenerated reproducibly against the demo app (not rendered on the page).

export type RecipeGroup = 'card' | 'graph' | 'crosstab' | 'portal';

export const groupLabels: Record<RecipeGroup, string> = {
  card: '数値カード',
  graph: 'グラフ',
  crosstab: 'クロス集計表',
  portal: 'ポータル埋め込み',
};

export type WidgetType =
  | 'card-single'
  | 'card-ratio'
  | 'card-star'
  | 'bar'
  | 'hbar'
  | 'line'
  | 'area'
  | 'pie'
  | 'donut'
  | 'radar'
  | 'stacked-bar'
  | 'stacked-bar-100'
  | 'stacked-hbar'
  | 'stacked-hbar-100'
  | 'stacked-area'
  | 'combo'
  | 'ratio-graph'
  | 'crosstab-value'
  | 'heatmap'
  | 'portal-embed';

export const widgetTypeLabels: Record<WidgetType, string> = {
  'card-single': '数値カード',
  'card-ratio': '割合カード',
  'card-star': '★評価カード',
  bar: '縦棒グラフ',
  hbar: '横棒グラフ',
  line: '折れ線グラフ',
  area: 'エリアグラフ',
  pie: '円グラフ',
  donut: 'ドーナツグラフ',
  radar: 'レーダーチャート',
  'stacked-bar': '積み上げ棒',
  'stacked-bar-100': '100%積み上げ棒',
  'stacked-hbar': '横積み上げ棒',
  'stacked-hbar-100': '横100%積み上げ棒',
  'stacked-area': '積み上げエリア',
  combo: '複合グラフ',
  'ratio-graph': '割合グラフ',
  'crosstab-value': 'クロス集計表',
  heatmap: 'ヒートマップ',
  'portal-embed': 'ポータル埋め込み',
};

export interface Recipe {
  /** kebab-case id; also the screenshot filename (/images/dashboard/recipes/<id>.png) */
  id: string;
  group: RecipeGroup;
  widgetType: WidgetType;
  /** Use-case title */
  title: string;
  /** What this achieves — conclusion first, 1-2 sentences */
  goal: string;
  /** Numbered configuration steps */
  steps: string[];
  /** Purpose tags for filtering */
  tags: string[];
  /**
   * Screenshot generation config (source + widget overrides). Not rendered on the page.
   * Omitted for feature recipes (e.g. portal embed) whose image is a real screenshot.
   */
  config?: { source: 'won' | 'all'; widget: Record<string, unknown> };
}

export const recipeTags = [
  '売上分析',
  '件数管理',
  'KPI',
  '構成比',
  '推移',
  'ランキング',
  'クロス分析',
  '顧客評価',
] as const;

export const recipes: Recipe[] = [
  // ============================ 数値カード ============================
  {
    id: 'card-sales-total',
    group: 'card',
    widgetType: 'card-single',
    title: '売上合計を大きく表示する',
    goal: 'ダッシュボードの主役。受注金額の合計を一番大きな数字で見せ、状況をひと目で把握できます。',
    steps: [
      '「＋ 数値カード」を追加',
      'データソースを受注レコードに設定',
      '表示モード「数値」を選択',
      '集計方法「合計（SUM）」＋対象フィールド「金額」',
      '接頭に「¥」、見出しに「受注金額（合計）」を入力',
    ],
    tags: ['売上分析', 'KPI'],
    config: { source: 'won', widget: { type: 'card', cardMode: 'single', aggregate: { field: '金額', method: 'SUM' }, prefix: '¥', cardCaption: '受注金額（合計）' } },
  },
  {
    id: 'card-count',
    group: 'card',
    widgetType: 'card-single',
    title: '受注件数をカウントする',
    goal: '金額だけでなく「何件成約したか」を並べると、単価と件数の両面で営業状況を読み取れます。',
    steps: [
      '「＋ 数値カード」を追加',
      '表示モード「数値」を選択',
      '集計方法「件数（COUNT）」を選択（対象フィールドは不要）',
      '接尾に「件」、見出しに「受注件数」を入力',
    ],
    tags: ['件数管理', 'KPI'],
    config: { source: 'won', widget: { type: 'card', cardMode: 'single', aggregate: { field: '', method: 'COUNT' }, suffix: '件', cardCaption: '受注件数' } },
  },
  {
    id: 'card-avg-unit-price',
    group: 'card',
    widgetType: 'card-single',
    title: '平均受注単価を出す',
    goal: '合計÷件数の平均単価。値引き傾向や案件の大型化を数字で確認できます。',
    steps: [
      '「＋ 数値カード」を追加',
      '表示モード「数値」を選択',
      '集計方法「平均（AVG）」＋対象フィールド「金額」',
      '接頭に「¥」、見出しに「平均受注単価」を入力',
    ],
    tags: ['売上分析'],
    config: { source: 'won', widget: { type: 'card', cardMode: 'single', aggregate: { field: '金額', method: 'AVG' }, prefix: '¥', cardCaption: '平均受注単価' } },
  },
  {
    id: 'card-win-rate',
    group: 'card',
    widgetType: 'card-ratio',
    title: '受注率を％で表示する',
    goal: '全案件のうち受注に至った割合（成約率）を％で表示。営業の歩留まりを示す代表的なKPIです。',
    steps: [
      '「＋ 数値カード」を追加',
      '表示モード「割合（分子÷分母）」を選択',
      '分子＝件数・条件「ステータス in (受注)」',
      '分母＝件数・条件なし（全案件）',
      '接尾に「%」、見出しに「受注率」を入力',
    ],
    tags: ['KPI'],
    config: { source: 'all', widget: { type: 'card', cardMode: 'ratio', suffix: '%', cardCaption: '受注率', cardNote: '受注 ÷ 全案件', numerator: { field: '', method: 'COUNT', filter: [{ field: '案件ステータス', op: 'in', value: ['受注'] }] }, denominator: { field: '', method: 'COUNT', filter: [] } } },
  },
  {
    id: 'card-rating-star',
    group: 'card',
    widgetType: 'card-star',
    title: '顧客満足度を★で表示する',
    goal: '評価フィールドの平均値を5段階の星で表示。数字より直感的に「良し悪し」が伝わります。',
    steps: [
      '「＋ 数値カード」を追加',
      '表示モード「★ 評価（星）」を選択',
      '集計方法「平均（AVG）」＋対象フィールド「評価」',
      '最大星数「5」、見出しに「平均評価」を入力',
    ],
    tags: ['顧客評価', 'KPI'],
    config: { source: 'all', widget: { type: 'card', cardMode: 'star', aggregate: { field: '評価', method: 'AVG' }, maxStars: 5, cardCaption: '平均評価' } },
  },

  // ============================ グラフ ============================
  {
    id: 'bar-office-sales',
    group: 'graph',
    widgetType: 'bar',
    title: '営業所別の売上を縦棒で比べる',
    goal: '拠点ごとの受注金額を縦棒で並べ、強い拠点・弱い拠点を一目で比較できます。',
    steps: [
      '「＋ グラフ」を追加',
      'グラフ種別「縦棒」を選択',
      '分類項目「営業所」',
      '集計方法「合計（SUM）」＋対象フィールド「金額」',
      '配色を「カスタム多色」にして項目ごとに色分け',
    ],
    tags: ['売上分析', 'ランキング'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'bar', category: '営業所', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'hbar-person-ranking',
    group: 'graph',
    widgetType: 'hbar',
    title: '担当者別ランキングは横棒で',
    goal: '項目名が長い・数が多いときは横棒が読みやすい。担当者別の売上ランキングに最適です。',
    steps: [
      '「＋ グラフ」を追加',
      'グラフ種別「横棒」を選択',
      '分類項目「担当者」',
      '集計方法「合計（SUM）」＋対象フィールド「金額」',
    ],
    tags: ['ランキング', '売上分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'hbar', category: '担当者', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'line-monthly-trend',
    group: 'graph',
    widgetType: 'line',
    title: '月別の売上推移を折れ線で追う',
    goal: '時系列の伸び・落ち込みを折れ線で可視化。季節性やトレンドの把握に向きます。',
    steps: [
      '「＋ グラフ」を追加',
      'グラフ種別「折れ線」を選択',
      '分類項目「受注日」＋単位「月」',
      '集計方法「合計（SUM）」＋対象フィールド「金額」',
    ],
    tags: ['推移', '売上分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'line', category: '受注日', categoryUnit: 'month', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom', customColors: ['#6366F1'] } },
  },
  {
    id: 'area-count-trend',
    group: 'graph',
    widgetType: 'area',
    title: '件数の推移をエリアで見せる',
    goal: '折れ線の下を塗りつぶすエリアグラフ。ボリューム感（件数の積み重なり）を強調できます。',
    steps: [
      '「＋ グラフ」を追加',
      'グラフ種別「エリア（面）」を選択',
      '分類項目「受注日」＋単位「月」',
      '集計方法「件数（COUNT）」を選択',
    ],
    tags: ['推移', '件数管理'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'area', category: '受注日', categoryUnit: 'month', aggregate: { field: '', method: 'COUNT' }, colorMode: 'custom', customColors: ['#06B6D4'] } },
  },
  {
    id: 'pie-category-share',
    group: 'graph',
    widgetType: 'pie',
    title: 'カテゴリ構成比を円グラフで',
    goal: '商品カテゴリごとの売上構成比を円グラフで表示。どのカテゴリが稼ぎ頭かが直感的に分かります。',
    steps: [
      '「＋ グラフ」を追加',
      'グラフ種別「円」を選択',
      '分類項目「商品カテゴリ」',
      '集計方法「合計（SUM）」＋対象フィールド「金額」',
      '「データラベルを表示」をON',
    ],
    tags: ['構成比', '売上分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'pie', category: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, dataLabels: true, colorMode: 'custom' } },
  },
  {
    id: 'donut-category-share',
    group: 'graph',
    widgetType: 'donut',
    title: 'ドーナツで構成比＋合計を同時に',
    goal: '円グラフのバリエーション。中央が空くドーナツは、構成比を見せつつ中心に合計を置けます。',
    steps: [
      '「＋ グラフ」を追加',
      'グラフ種別「ドーナツ」を選択',
      '分類項目「商品カテゴリ」',
      '集計方法「合計（SUM）」＋対象フィールド「金額」',
      '「データラベルを表示」をON',
    ],
    tags: ['構成比', '売上分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'donut', category: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, dataLabels: true, colorMode: 'custom' } },
  },
  {
    id: 'radar-region-category',
    group: 'graph',
    widgetType: 'radar',
    title: '地域×カテゴリのバランスをレーダーで',
    goal: '3〜8項目のバランスを多角形で表現。地域ごとにどのカテゴリが強い/弱いかを比較できます。',
    steps: [
      '「＋ グラフ」を追加',
      'グラフ種別「レーダー（3〜8項目）」を選択',
      '分類項目「商品カテゴリ」（軸になる）',
      '系列「地域」（多角形が地域ごとに重なる）',
      '集計方法「合計（SUM）」＋対象フィールド「金額」',
    ],
    tags: ['構成比', 'クロス分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'radar', category: '商品カテゴリ', series: '地域', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'stacked-bar-office-category',
    group: 'graph',
    widgetType: 'stacked-bar',
    title: '営業所×カテゴリを積み上げ棒で',
    goal: '拠点ごとの合計と、その内訳（カテゴリ構成）を1本の棒で同時に表現できます。',
    steps: [
      '「＋ グラフ」を追加',
      'グラフ種別「積み上げ棒」を選択',
      '分類項目「営業所」＋系列「商品カテゴリ」',
      '集計方法「合計（SUM）」＋対象フィールド「金額」',
    ],
    tags: ['構成比', 'クロス分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'stackedBar', category: '営業所', series: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'stacked-bar-100-office',
    group: 'graph',
    widgetType: 'stacked-bar-100',
    title: '構成比を100%積み上げで比較',
    goal: '各拠点の「内訳の割合」を100%に揃えて比較。金額規模の差を除いて構成比だけを見たいときに。',
    steps: [
      '「＋ グラフ」を追加',
      'グラフ種別「100%積み上げ」を選択',
      '分類項目「営業所」＋系列「商品カテゴリ」',
      '集計方法「合計（SUM）」＋対象フィールド「金額」',
    ],
    tags: ['構成比', 'クロス分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'stackedBar100', category: '営業所', series: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'stacked-hbar-region',
    group: 'graph',
    widgetType: 'stacked-hbar',
    title: '横向きの積み上げ棒で内訳を見る',
    goal: '項目数が多い・ラベルが長いときは横向きの積み上げ棒が読みやすくなります。',
    steps: [
      '「＋ グラフ」を追加',
      'グラフ種別「横 積み上げ棒」を選択',
      '分類項目「地域」＋系列「商品カテゴリ」',
      '集計方法「合計（SUM）」＋対象フィールド「金額」',
    ],
    tags: ['構成比', 'クロス分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'stackedHBar', category: '地域', series: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'stacked-hbar-100-region',
    group: 'graph',
    widgetType: 'stacked-hbar-100',
    title: '横100%積み上げで地域の構成比を揃える',
    goal: '地域ごとの内訳割合を横向き・100%で比較。規模の違う地域を同じ土俵で並べられます。',
    steps: [
      '「＋ グラフ」を追加',
      'グラフ種別「横 100%積み上げ」を選択',
      '分類項目「地域」＋系列「商品カテゴリ」',
      '集計方法「合計（SUM）」＋対象フィールド「金額」',
    ],
    tags: ['構成比', 'クロス分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'stackedHBar100', category: '地域', series: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'stacked-area-category-trend',
    group: 'graph',
    widgetType: 'stacked-area',
    title: 'カテゴリ別の推移を積み上げエリアで',
    goal: '時系列の総量と内訳の推移を同時に表現。全体が伸びている中で何が牽引しているかが分かります。',
    steps: [
      '「＋ グラフ」を追加',
      'グラフ種別「積み上げエリア」を選択',
      '分類項目「受注日」＋単位「月」、系列「商品カテゴリ」',
      '集計方法「合計（SUM）」＋対象フィールド「金額」',
    ],
    tags: ['推移', '構成比'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'stackedArea', category: '受注日', categoryUnit: 'month', series: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'combo-bar-line',
    group: 'graph',
    widgetType: 'combo',
    title: '棒と折れ線を複合で重ねる',
    goal: '系列の最後の1本だけ折れ線になる複合グラフ。金額(棒)と件数や率(線)など、単位の違う指標を重ねられます。',
    steps: [
      '「＋ グラフ」を追加',
      'グラフ種別「複合（棒＋折れ線）」を選択',
      '分類項目「営業所」＋系列「商品カテゴリ」',
      '集計方法「合計（SUM）」＋対象フィールド「金額」',
    ],
    tags: ['クロス分析', '売上分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'combo', category: '営業所', series: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'ratio-graph-winrate-trend',
    group: 'graph',
    widgetType: 'ratio-graph',
    title: '月別 受注率の推移を％グラフで',
    goal: '金額ではなく「割合（分子÷分母）」を時系列でグラフ化。受注率の改善トレンドを追えます。',
    steps: [
      '「＋ グラフ」を追加',
      '集計モード「割合（分子÷分母・%）」を選択',
      '分類項目「受注日」＋単位「月」',
      '分子＝件数・条件「ステータス in (受注)」／分母＝件数・条件なし',
      '「グラフに割合(%)を表示」をON',
    ],
    tags: ['KPI', '推移'],
    config: { source: 'all', widget: { type: 'graph', graphType: 'line', valueMode: 'ratio', category: '受注日', categoryUnit: 'month', dataLabels: true, colorMode: 'custom', customColors: ['#2E8B2E'], numerator: { field: '', method: 'COUNT', filter: [{ field: '案件ステータス', op: 'in', value: ['受注'] }] }, denominator: { field: '', method: 'COUNT', filter: [] } } },
  },

  // ============================ クロス集計表 ============================
  {
    id: 'crosstab-office-category',
    group: 'crosstab',
    widgetType: 'crosstab-value',
    title: '営業所×カテゴリのクロス集計表',
    goal: '行と列の2軸で金額を集計。拠点とカテゴリの組み合わせごとの数字を、合計付きの表で見られます。',
    steps: [
      '「＋ クロス集計表」を追加',
      '行「営業所」／列「商品カテゴリ」',
      '集計方法「合計（SUM）」＋対象フィールド「金額」',
      '「合計を表示」をON、ヒートマップ「濃淡」で大小を色付け',
    ],
    tags: ['クロス分析', '売上分析'],
    config: { source: 'won', widget: { type: 'crosstab', row: '営業所', col: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, valueMode: 'value', heatmap: true, heatMode: 'magnitude', heatColor: '#6366F1', showTotals: true } },
  },
  {
    id: 'crosstab-count',
    group: 'crosstab',
    widgetType: 'crosstab-value',
    title: '件数のクロス集計でボリュームを見る',
    goal: '金額ではなく件数でクロス集計。どの拠点・カテゴリに案件が集中しているかが分かります。',
    steps: [
      '「＋ クロス集計表」を追加',
      '行「営業所」／列「商品カテゴリ」',
      '集計方法「件数（COUNT）」を選択',
      '「合計を表示」をON',
    ],
    tags: ['クロス分析', '件数管理'],
    config: { source: 'won', widget: { type: 'crosstab', row: '営業所', col: '商品カテゴリ', aggregate: { field: '', method: 'COUNT' }, valueMode: 'value', heatmap: true, heatMode: 'magnitude', heatColor: '#10B981', showTotals: true } },
  },
  {
    id: 'heatmap-winrate',
    group: 'crosstab',
    widgetType: 'heatmap',
    title: '受注率をヒートマップで色分け',
    goal: '割合（分子÷分母）のクロス集計をヒートマップ表示。受注率の高い/低いマスが色の濃淡で浮かび上がります。',
    steps: [
      '「＋ クロス集計表」を追加',
      '集計モード「割合（分子÷分母・%）」を選択',
      '行「営業所」／列「商品カテゴリ」',
      '分子＝件数・条件「ステータス in (受注)」／分母＝件数・条件なし',
      'ヒートマップONで率の大小を色付け',
    ],
    tags: ['KPI', 'クロス分析'],
    config: { source: 'all', widget: { type: 'crosstab', row: '営業所', col: '商品カテゴリ', valueMode: 'ratio', heatmap: true, heatMode: 'magnitude', heatColor: '#10B981', showTotals: true, numerator: { field: '', method: 'COUNT', filter: [{ field: '案件ステータス', op: 'in', value: ['受注'] }] }, denominator: { field: '', method: 'COUNT', filter: [] } } },
  },

  // ============================ 数値カード（応用） ============================
  {
    id: 'card-max-amount', group: 'card', widgetType: 'card-single',
    title: '最高受注額（最大値）を表示する',
    goal: '一番大きな受注の金額（最大値）を表示。大型案件の規模感を把握できます。',
    steps: ['「＋ 数値カード」を追加', '表示モード「数値」', '集計方法「最大（MAX）」＋対象フィールド「金額」', '接頭「¥」、見出しに「最高受注額」'],
    tags: ['売上分析'],
    config: { source: 'won', widget: { type: 'card', cardMode: 'single', aggregate: { field: '金額', method: 'MAX' }, prefix: '¥', cardCaption: '最高受注額' } },
  },
  {
    id: 'card-min-amount', group: 'card', widgetType: 'card-single',
    title: '最小受注額（最小値）を表示する',
    goal: '一番小さな受注の金額（最小値）を表示。小口案件の下限を確認できます。',
    steps: ['「＋ 数値カード」を追加', '表示モード「数値」', '集計方法「最小（MIN）」＋対象フィールド「金額」', '接頭「¥」、見出しに「最小受注額」'],
    tags: ['売上分析'],
    config: { source: 'won', widget: { type: 'card', cardMode: 'single', aggregate: { field: '金額', method: 'MIN' }, prefix: '¥', cardCaption: '最小受注額' } },
  },
  {
    id: 'card-all-count', group: 'card', widgetType: 'card-single',
    title: '全案件数（パイプライン規模）を表示する',
    goal: '受注に限らず、全ステータスを含めた案件総数。営業パイプライン全体の規模が分かります。',
    steps: ['「＋ 数値カード」を追加', 'データソースを全案件（絞り込みなし）に設定', '集計方法「件数（COUNT）」', '接尾「件」、見出しに「全案件数」'],
    tags: ['件数管理'],
    config: { source: 'all', widget: { type: 'card', cardMode: 'single', aggregate: { field: '', method: 'COUNT' }, suffix: '件', cardCaption: '全案件数' } },
  },

  // ============================ グラフ（応用） ============================
  {
    id: 'bar-monthly-amount', group: 'graph', widgetType: 'bar',
    title: '月別 受注金額を縦棒で見る',
    goal: '月ごとの受注金額を縦棒で比較。季節性や山谷を棒で直感的に把握できます。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「縦棒」', '分類項目「受注日」＋単位「月」', '集計方法「合計（SUM）」＋対象フィールド「金額」'],
    tags: ['推移', '売上分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'bar', category: '受注日', categoryUnit: 'month', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'bar-category-amount', group: 'graph', widgetType: 'bar',
    title: 'カテゴリ別 受注金額を縦棒で比べる',
    goal: '商品カテゴリごとの受注金額を縦棒で比較。主力カテゴリが一目で分かります。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「縦棒」', '分類項目「商品カテゴリ」', '集計方法「合計（SUM）」＋対象フィールド「金額」', '配色を「カスタム多色」に'],
    tags: ['売上分析', '構成比'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'bar', category: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'bar-status-count', group: 'graph', widgetType: 'bar',
    title: 'ステータス別の案件数を縦棒で見る',
    goal: '受注・商談中・失注などステータスごとの案件数を縦棒で表示。パイプラインの状態が分かります。',
    steps: ['「＋ グラフ」を追加', 'データソースを全案件に設定', 'グラフ種別「縦棒」', '分類項目「案件ステータス」', '集計方法「件数（COUNT）」'],
    tags: ['件数管理'],
    config: { source: 'all', widget: { type: 'graph', graphType: 'bar', category: '案件ステータス', aggregate: { field: '', method: 'COUNT' }, colorMode: 'custom' } },
  },
  {
    id: 'bar-person-count', group: 'graph', widgetType: 'bar',
    title: '担当者別の受注件数を縦棒で見る',
    goal: '担当者ごとの受注件数を縦棒で比較。誰が多く決めているかが分かります。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「縦棒」', '分類項目「担当者」', '集計方法「件数（COUNT）」'],
    tags: ['件数管理', 'ランキング'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'bar', category: '担当者', aggregate: { field: '', method: 'COUNT' }, colorMode: 'custom' } },
  },
  {
    id: 'hbar-region-amount', group: 'graph', widgetType: 'hbar',
    title: '地域別 受注金額を横棒で見る',
    goal: '地域ごとの受注金額を横棒で比較。地域名が長くても読みやすく並びます。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「横棒」', '分類項目「地域」', '集計方法「合計（SUM）」＋対象フィールド「金額」'],
    tags: ['売上分析', 'ランキング'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'hbar', category: '地域', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'hbar-category-amount', group: 'graph', widgetType: 'hbar',
    title: 'カテゴリ別 受注金額を横棒で見る',
    goal: 'カテゴリごとの受注金額を横棒で比較。ランキング形式で見やすく表示します。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「横棒」', '分類項目「商品カテゴリ」', '集計方法「合計（SUM）」＋対象フィールド「金額」'],
    tags: ['売上分析', '構成比'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'hbar', category: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'hbar-office-count', group: 'graph', widgetType: 'hbar',
    title: '営業所別 受注件数を横棒で見る',
    goal: '拠点ごとの受注件数を横棒で比較。件数ベースの活動量が分かります。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「横棒」', '分類項目「営業所」', '集計方法「件数（COUNT）」'],
    tags: ['件数管理', 'ランキング'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'hbar', category: '営業所', aggregate: { field: '', method: 'COUNT' }, colorMode: 'custom' } },
  },
  {
    id: 'line-monthly-count', group: 'graph', widgetType: 'line',
    title: '月別 受注件数の推移を折れ線で追う',
    goal: '金額ではなく件数の推移を折れ線で可視化。受注の勢い・件数トレンドを把握できます。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「折れ線」', '分類項目「受注日」＋単位「月」', '集計方法「件数（COUNT）」'],
    tags: ['推移', '件数管理'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'line', category: '受注日', categoryUnit: 'month', aggregate: { field: '', method: 'COUNT' }, colorMode: 'custom', customColors: ['#06B6D4'] } },
  },
  {
    id: 'line-avg-price-trend', group: 'graph', widgetType: 'line',
    title: '月別 平均単価の推移を折れ線で追う',
    goal: '1件あたりの平均受注単価の推移を折れ線で表示。案件の大型化・小型化を確認できます。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「折れ線」', '分類項目「受注日」＋単位「月」', '集計方法「平均（AVG）」＋対象フィールド「金額」'],
    tags: ['推移', '売上分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'line', category: '受注日', categoryUnit: 'month', aggregate: { field: '金額', method: 'AVG' }, colorMode: 'custom', customColors: ['#8B5CF6'] } },
  },
  {
    id: 'area-monthly-amount', group: 'graph', widgetType: 'area',
    title: '月別 受注金額をエリアで見せる',
    goal: '月別の受注金額をエリアグラフで表示。積み重なりのボリューム感を強調できます。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「エリア（面）」', '分類項目「受注日」＋単位「月」', '集計方法「合計（SUM）」＋対象フィールド「金額」'],
    tags: ['推移', '売上分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'area', category: '受注日', categoryUnit: 'month', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom', customColors: ['#3B82F6'] } },
  },
  {
    id: 'pie-office-share', group: 'graph', widgetType: 'pie',
    title: '営業所別の構成比を円グラフで',
    goal: '拠点ごとの受注金額の構成比を円グラフで表示。どの拠点が全体に占める割合が大きいか分かります。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「円」', '分類項目「営業所」', '集計方法「合計（SUM）」＋対象フィールド「金額」', '「データラベルを表示」をON'],
    tags: ['構成比', '売上分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'pie', category: '営業所', aggregate: { field: '金額', method: 'SUM' }, dataLabels: true, colorMode: 'custom' } },
  },
  {
    id: 'pie-region-share', group: 'graph', widgetType: 'pie',
    title: '地域別の構成比を円グラフで',
    goal: '地域ごとの受注金額の構成比を円グラフで表示。エリア戦略の偏りを把握できます。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「円」', '分類項目「地域」', '集計方法「合計（SUM）」＋対象フィールド「金額」', '「データラベルを表示」をON'],
    tags: ['構成比', '売上分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'pie', category: '地域', aggregate: { field: '金額', method: 'SUM' }, dataLabels: true, colorMode: 'custom' } },
  },
  {
    id: 'pie-status-share', group: 'graph', widgetType: 'pie',
    title: 'ステータス構成比を円グラフで',
    goal: '受注・商談中・失注などの件数構成比を円グラフで表示。パイプラインの内訳が一目で分かります。',
    steps: ['「＋ グラフ」を追加', 'データソースを全案件に設定', 'グラフ種別「円」', '分類項目「案件ステータス」', '集計方法「件数（COUNT）」、データラベルON'],
    tags: ['構成比', '件数管理'],
    config: { source: 'all', widget: { type: 'graph', graphType: 'pie', category: '案件ステータス', aggregate: { field: '', method: 'COUNT' }, dataLabels: true, colorMode: 'custom' } },
  },
  {
    id: 'donut-region-count', group: 'graph', widgetType: 'donut',
    title: '地域別の件数構成比をドーナツで',
    goal: '地域ごとの受注件数の構成比をドーナツで表示。件数ベースの地域分布が分かります。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「ドーナツ」', '分類項目「地域」', '集計方法「件数（COUNT）」、データラベルON'],
    tags: ['構成比', '件数管理'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'donut', category: '地域', aggregate: { field: '', method: 'COUNT' }, dataLabels: true, colorMode: 'custom' } },
  },
  {
    id: 'donut-office-amount', group: 'graph', widgetType: 'donut',
    title: '営業所別の金額構成比をドーナツで',
    goal: '拠点ごとの受注金額の構成比をドーナツで表示。中央が空くので全体に占める割合を見せやすい。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「ドーナツ」', '分類項目「営業所」', '集計方法「合計（SUM）」＋対象フィールド「金額」、データラベルON'],
    tags: ['構成比', '売上分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'donut', category: '営業所', aggregate: { field: '金額', method: 'SUM' }, dataLabels: true, colorMode: 'custom' } },
  },
  {
    id: 'radar-region-count', group: 'graph', widgetType: 'radar',
    title: '地域 × カテゴリの件数バランスをレーダーで',
    goal: 'カテゴリを軸に、地域ごとの受注件数のバランスをレーダーで比較。地域ごとの強み・弱みが分かります。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「レーダー」', '分類項目「商品カテゴリ」（軸）', '系列「地域」', '集計方法「件数（COUNT）」'],
    tags: ['構成比', 'クロス分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'radar', category: '商品カテゴリ', series: '地域', aggregate: { field: '', method: 'COUNT' }, colorMode: 'custom' } },
  },
  {
    id: 'stacked-bar-region-category', group: 'graph', widgetType: 'stacked-bar',
    title: '地域 × カテゴリを積み上げ棒で',
    goal: '地域ごとの合計と、その内訳（カテゴリ構成）を1本の棒で同時に表現できます。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「積み上げ棒」', '分類項目「地域」＋系列「商品カテゴリ」', '集計方法「合計（SUM）」＋対象フィールド「金額」'],
    tags: ['構成比', 'クロス分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'stackedBar', category: '地域', series: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'stacked-bar-month-category', group: 'graph', widgetType: 'stacked-bar',
    title: '月別 × カテゴリの積み上げ推移を見る',
    goal: '月ごとの総額と、その内訳（カテゴリ）の推移を積み上げ棒で同時に表現できます。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「積み上げ棒」', '分類項目「受注日」＋単位「月」、系列「商品カテゴリ」', '集計方法「合計（SUM）」＋対象フィールド「金額」'],
    tags: ['推移', '構成比'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'stackedBar', category: '受注日', categoryUnit: 'month', series: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'stacked-bar-100-region', group: 'graph', widgetType: 'stacked-bar-100',
    title: '地域別のカテゴリ構成比を100%積み上げで',
    goal: '地域ごとの内訳割合を100%に揃えて比較。金額規模の差を除いて構成比だけを比べられます。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「100%積み上げ」', '分類項目「地域」＋系列「商品カテゴリ」', '集計方法「合計（SUM）」＋対象フィールド「金額」'],
    tags: ['構成比', 'クロス分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'stackedBar100', category: '地域', series: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'stacked-bar-100-month', group: 'graph', widgetType: 'stacked-bar-100',
    title: '月別のカテゴリ構成比を100%積み上げで',
    goal: '月ごとのカテゴリ構成比の変化を100%積み上げで追えます。構成のシフトが見えます。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「100%積み上げ」', '分類項目「受注日」＋単位「月」、系列「商品カテゴリ」', '集計方法「合計（SUM）」＋対象フィールド「金額」'],
    tags: ['推移', '構成比'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'stackedBar100', category: '受注日', categoryUnit: 'month', series: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'stacked-hbar-office-category', group: 'graph', widgetType: 'stacked-hbar',
    title: '営業所 × カテゴリを横積み上げ棒で',
    goal: '拠点数が多いときは横向きの積み上げ棒が読みやすい。拠点ごとの内訳を一覧できます。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「横 積み上げ棒」', '分類項目「営業所」＋系列「商品カテゴリ」', '集計方法「合計（SUM）」＋対象フィールド「金額」'],
    tags: ['構成比', 'クロス分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'stackedHBar', category: '営業所', series: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'stacked-area-count-category', group: 'graph', widgetType: 'stacked-area',
    title: 'カテゴリ別の件数推移を積み上げエリアで',
    goal: '件数ベースで、総量とカテゴリ内訳の推移を積み上げエリアで同時に表現できます。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「積み上げエリア」', '分類項目「受注日」＋単位「月」、系列「商品カテゴリ」', '集計方法「件数（COUNT）」'],
    tags: ['推移', '件数管理'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'stackedArea', category: '受注日', categoryUnit: 'month', series: '商品カテゴリ', aggregate: { field: '', method: 'COUNT' }, colorMode: 'custom' } },
  },
  {
    id: 'combo-region-category', group: 'graph', widgetType: 'combo',
    title: '地域 × カテゴリを複合グラフで重ねる',
    goal: '系列の最後の1本を折れ線にする複合グラフ。地域ごとのカテゴリ別金額に折れ線を重ねられます。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「複合（棒＋折れ線）」', '分類項目「地域」＋系列「商品カテゴリ」', '集計方法「合計（SUM）」＋対象フィールド「金額」'],
    tags: ['クロス分析', '売上分析'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'combo', category: '地域', series: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'ratio-graph-office-winrate', group: 'graph', widgetType: 'ratio-graph',
    title: '営業所別の受注率を％グラフで比べる',
    goal: '拠点ごとの受注率（受注÷全案件）を％の棒グラフで比較。歩留まりの良い拠点が分かります。',
    steps: ['「＋ グラフ」を追加', '集計モード「割合（分子÷分母・%）」', '分類項目「営業所」', '分子＝件数・条件「ステータス in (受注)」／分母＝件数・条件なし', 'データラベルON'],
    tags: ['KPI', 'ランキング'],
    config: { source: 'all', widget: { type: 'graph', graphType: 'bar', valueMode: 'ratio', category: '営業所', dataLabels: true, colorMode: 'custom', numerator: { field: '', method: 'COUNT', filter: [{ field: '案件ステータス', op: 'in', value: ['受注'] }] }, denominator: { field: '', method: 'COUNT', filter: [] } } },
  },
  {
    id: 'ratio-graph-category-winrate', group: 'graph', widgetType: 'ratio-graph',
    title: 'カテゴリ別の受注率を％グラフで比べる',
    goal: 'カテゴリごとの受注率を％の棒グラフで比較。決まりやすい商材が分かります。',
    steps: ['「＋ グラフ」を追加', '集計モード「割合（分子÷分母・%）」', '分類項目「商品カテゴリ」', '分子＝件数・条件「ステータス in (受注)」／分母＝件数・条件なし', 'データラベルON'],
    tags: ['KPI'],
    config: { source: 'all', widget: { type: 'graph', graphType: 'bar', valueMode: 'ratio', category: '商品カテゴリ', dataLabels: true, colorMode: 'custom', numerator: { field: '', method: 'COUNT', filter: [{ field: '案件ステータス', op: 'in', value: ['受注'] }] }, denominator: { field: '', method: 'COUNT', filter: [] } } },
  },
  {
    id: 'ratio-graph-region-winrate', group: 'graph', widgetType: 'ratio-graph',
    title: '地域別の受注率を％グラフで比べる',
    goal: '地域ごとの受注率を％の棒グラフで比較。エリアごとの勝ちやすさを把握できます。',
    steps: ['「＋ グラフ」を追加', '集計モード「割合（分子÷分母・%）」', '分類項目「地域」', '分子＝件数・条件「ステータス in (受注)」／分母＝件数・条件なし', 'データラベルON'],
    tags: ['KPI', 'ランキング'],
    config: { source: 'all', widget: { type: 'graph', graphType: 'bar', valueMode: 'ratio', category: '地域', dataLabels: true, colorMode: 'custom', numerator: { field: '', method: 'COUNT', filter: [{ field: '案件ステータス', op: 'in', value: ['受注'] }] }, denominator: { field: '', method: 'COUNT', filter: [] } } },
  },
  {
    id: 'bar-region-amount', group: 'graph', widgetType: 'bar',
    title: '地域別 受注金額を縦棒で比べる',
    goal: '地域ごとの受注金額を縦棒で比較。エリア間の売上規模が一目で分かります。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「縦棒」', '分類項目「地域」', '集計方法「合計（SUM）」＋対象フィールド「金額」', '配色を「カスタム多色」に'],
    tags: ['売上分析', 'ランキング'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'bar', category: '地域', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },
  {
    id: 'hbar-person-amount', group: 'graph', widgetType: 'hbar',
    title: '担当者別 受注金額を横棒で見る',
    goal: '担当者ごとの受注金額を横棒でランキング表示。トップ営業が誰かが分かります。',
    steps: ['「＋ グラフ」を追加', 'グラフ種別「横棒」', '分類項目「担当者」', '集計方法「合計（SUM）」＋対象フィールド「金額」'],
    tags: ['売上分析', 'ランキング'],
    config: { source: 'won', widget: { type: 'graph', graphType: 'hbar', category: '担当者', aggregate: { field: '金額', method: 'SUM' }, colorMode: 'custom' } },
  },

  // ============================ クロス集計表（応用） ============================
  {
    id: 'crosstab-region-category', group: 'crosstab', widgetType: 'crosstab-value',
    title: '地域 × カテゴリのクロス集計（金額）',
    goal: '地域とカテゴリの2軸で受注金額を集計。エリア×商材の組み合わせの強弱が分かります。',
    steps: ['「＋ クロス集計表」を追加', '行「地域」／列「商品カテゴリ」', '集計方法「合計（SUM）」＋対象フィールド「金額」', '合計表示ON・ヒートマップ「濃淡」'],
    tags: ['クロス分析', '売上分析'],
    config: { source: 'won', widget: { type: 'crosstab', row: '地域', col: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, valueMode: 'value', heatmap: true, heatMode: 'magnitude', heatColor: '#6366F1', showTotals: true } },
  },
  {
    id: 'crosstab-person-category', group: 'crosstab', widgetType: 'crosstab-value',
    title: '担当者 × カテゴリのクロス集計（金額）',
    goal: '担当者ごとに、どのカテゴリでどれだけ受注したかを表で把握。得意分野が見えます。',
    steps: ['「＋ クロス集計表」を追加', '行「担当者」／列「商品カテゴリ」', '集計方法「合計（SUM）」＋対象フィールド「金額」', '合計表示ON・ヒートマップ「濃淡」'],
    tags: ['クロス分析', 'ランキング'],
    config: { source: 'won', widget: { type: 'crosstab', row: '担当者', col: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, valueMode: 'value', heatmap: true, heatMode: 'magnitude', heatColor: '#14B8A6', showTotals: true } },
  },
  {
    id: 'crosstab-year-category', group: 'crosstab', widgetType: 'crosstab-value',
    title: '年 × カテゴリのクロス集計（金額）',
    goal: '年ごとのカテゴリ別受注金額を表で比較。年次のカテゴリ構成の変化を追えます。',
    steps: ['「＋ クロス集計表」を追加', '行「受注日」＋単位「年」／列「商品カテゴリ」', '集計方法「合計（SUM）」＋対象フィールド「金額」', '合計表示ON'],
    tags: ['クロス分析', '推移'],
    config: { source: 'won', widget: { type: 'crosstab', row: '受注日', rowUnit: 'year', col: '商品カテゴリ', aggregate: { field: '金額', method: 'SUM' }, valueMode: 'value', heatmap: true, heatMode: 'magnitude', heatColor: '#3B82F6', showTotals: true } },
  },
  {
    id: 'crosstab-office-status', group: 'crosstab', widgetType: 'crosstab-value',
    title: '営業所 × ステータスのクロス集計（件数）',
    goal: '拠点ごとに各ステータスの件数を表で把握。どの拠点に商談・失注が溜まっているか分かります。',
    steps: ['「＋ クロス集計表」を追加', 'データソースを全案件に設定', '行「営業所」／列「案件ステータス」', '集計方法「件数（COUNT）」・合計表示ON'],
    tags: ['クロス分析', '件数管理'],
    config: { source: 'all', widget: { type: 'crosstab', row: '営業所', col: '案件ステータス', aggregate: { field: '', method: 'COUNT' }, valueMode: 'value', heatmap: true, heatMode: 'magnitude', heatColor: '#F59E0B', showTotals: true } },
  },
  {
    id: 'crosstab-office-category-avg', group: 'crosstab', widgetType: 'crosstab-value',
    title: '営業所 × カテゴリの平均単価クロス集計',
    goal: '拠点×カテゴリごとの平均受注単価を表で把握。高単価で売れている組み合わせが分かります。',
    steps: ['「＋ クロス集計表」を追加', '行「営業所」／列「商品カテゴリ」', '集計方法「平均（AVG）」＋対象フィールド「金額」', '合計表示ON・ヒートマップ「濃淡」'],
    tags: ['クロス分析', '売上分析'],
    config: { source: 'won', widget: { type: 'crosstab', row: '営業所', col: '商品カテゴリ', aggregate: { field: '金額', method: 'AVG' }, valueMode: 'value', heatmap: true, heatMode: 'magnitude', heatColor: '#8B5CF6', showTotals: true } },
  },
  {
    id: 'heatmap-region-winrate', group: 'crosstab', widgetType: 'heatmap',
    title: '地域 × カテゴリの受注率をヒートマップで',
    goal: '地域×カテゴリの受注率（受注÷全案件）をヒートマップで色分け。勝ちやすい組み合わせが浮かびます。',
    steps: ['「＋ クロス集計表」を追加', '集計モード「割合（分子÷分母・%）」', '行「地域」／列「商品カテゴリ」', '分子＝件数・条件「ステータス in (受注)」／分母＝件数・条件なし', 'ヒートマップON'],
    tags: ['KPI', 'クロス分析'],
    config: { source: 'all', widget: { type: 'crosstab', row: '地域', col: '商品カテゴリ', valueMode: 'ratio', heatmap: true, heatMode: 'magnitude', heatColor: '#2E8B2E', showTotals: true, numerator: { field: '', method: 'COUNT', filter: [{ field: '案件ステータス', op: 'in', value: ['受注'] }] }, denominator: { field: '', method: 'COUNT', filter: [] } } },
  },

  // ============================ ポータル埋め込み ============================
  {
    id: 'portal-embed',
    group: 'portal',
    widgetType: 'portal-embed',
    title: '別々のボードのグラフをポータルに横並びで表示する',
    goal: '作成したグラフ（ウィジェット）を、スペースや全社ポータルに常時表示して、全員が毎日同じ数字を見られるようにします。v1.1.0 からは「ポータルレイアウト構成」で、別々のボードのグラフ・カードをパネルとして追加し、ドラッグで横並びに配置・サイズ調整できます（構成エリアは実グラフをライブ表示）。生成された JavaScript を登録するだけで表示でき、お知らせ本文の編集は不要です（プラグインがポータルAPIで iframe を自動注入します）。（プレミアム機能）',
    steps: [
      '設定画面の STEP4「ポータルに埋め込む（プレミアム）」を開く',
      '「埋め込み先」を選ぶ（ポータル＝全社トップ／スペースのトップ）',
      '「パネルを追加」でボードと表示するグラフ（またはボード全体）を選び、追加。別々のボードから何枚でも追加できます',
      '構成エリアで各パネルをドラッグして配置・サイズを調整（横並びは同じ行に合計12列以内で並べる。例：6列＋6列）。高さは自動算出（手動指定も可）',
      '「埋め込みコードを生成」をクリックし、生成された kw-dashboard-portal.js を cybozu.com 共通管理「JavaScript / CSSでカスタマイズ（PC用）」に登録して保存（お知らせの編集は不要）',
      '【全社ポータル】→ ポータルのヘッダー直下に／【スペース】→ スペーストップに自動表示されます',
    ],
    tags: ['KPI'],
  },
];
