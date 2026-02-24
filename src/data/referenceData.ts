/**
 * 参考データ（TANAAKK記事・公的統計より）
 *
 * 出典:
 * - 米国: U.S. Federal Reserve, Financial Accounts (Z.1)
 * - 日本: 内閣府SNA、財務省、日銀
 */

import type { NationalWealthInput } from '../types';

/** 米国 Q4 2024 (兆ドル) */
export const US_REFERENCE: NationalWealthInput = {
  currency: 'USD',
  sectors: {
    government: -39.9,
    nonFinancialCorporations: 19.1,
    householdsAndNonprofits: 169.4,
  },
  nationalTotalAssets: 190,
  externalNetAssets: -26.23,
  governmentDebt: 34.0, // 政府負債の主要部分
  population: 340_000_000,
  gdp: 27.72,
  asOfDate: '2024-Q4',
};

/** 日本 2023年度末 (兆円) */
export const JAPAN_REFERENCE: NationalWealthInput = {
  currency: 'JPY',
  sectors: {
    government: -700,
    nonFinancialCorporations: 1200, // 民間企業純資産（対外+政府債権含む推定）
    householdsAndNonprofits: 3658, // 家計+非営利
  },
  nationalTotalAssets: 13287,
  externalNetAssets: 533,
  governmentDebt: 1200,
  population: 124_000_000,
  gdp: 630,
  asOfDate: '2023年度末',
};
