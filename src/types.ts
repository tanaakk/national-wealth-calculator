/**
 * TANAAKK流 国富実態算定 - 型定義
 *
 * 企業の連結BS/PL/CFと同様に、国家を連結決算として捉える。
 * マネーサプライなど国によって定義が異なる指標に惑わされず、
 * 国民の所有する純資産・総資産という実態指標を算定する。
 *
 * @see https://www.tanaakk.com/2025/05/27/us-balance-sheet/
 * @see https://www.tanaakk.com/2025/05/27/seigniorage/
 */

export type Currency = 'USD' | 'JPY';

/** 部門別純資産（連結BSの内訳） */
export interface SectorNetWorth {
  /** 政府部門 */
  government: number;
  /** 非金融法人企業 */
  nonFinancialCorporations: number;
  /** 家計および非営利団体 */
  householdsAndNonprofits: number;
}

/** 部門別総資産・負債 */
export interface SectorBalanceSheet {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
}

/** 国富計算の入力データ */
export interface NationalWealthInput {
  /** 通貨 */
  currency: Currency;
  /** 部門別純資産 */
  sectors: SectorNetWorth;
  /** 国家総資産（国民総資産・未入力時は部門純資産から推定） */
  nationalTotalAssets?: number;
  /** 対外純資産（NIIP） */
  externalNetAssets: number;
  /** 政府負債（国債等） */
  governmentDebt: number;
  /** 人口（人） */
  population: number;
  /** GDP（参考） */
  gdp?: number;
  /** データ基準時点 */
  asOfDate?: string;
}

/** 国富計算の結果 */
export interface NationalWealthResult {
  /** 国家総資産（国民総資産） */
  nationalTotalAssets: number;
  /** 国家純資産（国民純資産・正味資産） */
  nationalNetWorth: number;
  /** 連結純資産（部門合計） */
  consolidatedNetWorth: number;
  /** 対外純資産 */
  externalNetAssets: number;
  /** 政府負債/国民純資産比率（Debt to Equity的視点） */
  governmentDebtToNetWorthRatio: number;
  /** 国民自己資本比率（純資産/総資産） */
  nationalEquityRatio: number;
  /** 国民Debt to Equity（負債/純資産） */
  nationalDebtToEquity: number;
  /** 1人当たり総資産 */
  perCapitaTotalAssets: number;
  /** 1人当たり純資産 */
  perCapitaNetWorth: number;
  /** 対外負債/国民純資産（対外的D/E） */
  externalDebtToNetWorthRatio?: number;
}
