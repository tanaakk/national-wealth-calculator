/**
 * TANAAKK流 国富実態算定ロジック
 *
 * 連結BSの考え方：
 * - 政府・企業・家計を一つの連結決算体として捉える
 * - 部門間の債権債務は国内で相殺され、対外ポジションと実物資産が残る
 * - 政府債務超過でも、国民純資産が厚ければ持続可能
 * - マネーサプライ等の国別定義に依存しない実態指標
 */

import type { NationalWealthInput, NationalWealthResult } from './types';

export function calculateNationalWealth(input: NationalWealthInput): NationalWealthResult {
  const { sectors, externalNetAssets, governmentDebt, population, nationalTotalAssets: inputTotal } = input;

  // 連結純資産 = 政府 + 企業 + 家計（部門間債権債務は国内で相殺）
  const consolidatedNetWorth =
    sectors.government + sectors.nonFinancialCorporations + sectors.householdsAndNonprofits;

  const nationalNetWorth = consolidatedNetWorth;

  // 総資産：入力があれば使用、なければ純資産+政府負債超過分から推定
  const nationalTotalAssets =
    inputTotal ?? nationalNetWorth + Math.max(0, -sectors.government);

  // 政府負債/国民純資産比率（TANAAKK: GDP比より実態を反映）
  const governmentDebtToNetWorthRatio =
    nationalNetWorth > 0 ? (governmentDebt / nationalNetWorth) * 100 : 0;

  // 国民自己資本比率 = 純資産 / 総資産（米84% vs 日28% のような比較）
  const nationalEquityRatio =
    nationalTotalAssets > 0 ? (nationalNetWorth / nationalTotalAssets) * 100 : 0;

  // 国民 Debt to Equity = 負債 / 純資産
  const nationalDebt = nationalTotalAssets - nationalNetWorth;
  const nationalDebtToEquity =
    nationalNetWorth > 0 ? (nationalDebt / nationalNetWorth) * 100 : 0;

  // 1人当たり（入力は兆単位なので 1e12 倍して円/ドルに変換後、人口で割る）
  const perCapitaTotalAssets =
    population > 0 ? (nationalTotalAssets * 1e12) / population : 0;
  const perCapitaNetWorth = population > 0 ? (nationalNetWorth * 1e12) / population : 0;

  return {
    nationalTotalAssets,
    nationalNetWorth,
    consolidatedNetWorth,
    externalNetAssets,
    governmentDebtToNetWorthRatio,
    nationalEquityRatio,
    nationalDebtToEquity,
    perCapitaTotalAssets,
    perCapitaNetWorth,
  };
}
