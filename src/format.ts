import type { Currency } from './types';

/** 数値を通貨別にフォーマット（入力は兆単位: USD=兆ドル, JPY=兆円） */
export function formatNumber(
  value: number,
  currency: Currency,
  opts?: { compact?: boolean; decimals?: number }
): string {
  const { compact = true, decimals = 1 } = opts ?? {};
  const abs = Math.abs(value);
  const sign = value < 0 ? '−' : '';

  if (currency === 'USD') {
    return `${sign}$${value.toFixed(decimals)}T`;
  }

  // JPY: 兆円 → 京円表記
  if (compact && abs >= 1e4) {
    return `${sign}${(value / 1e4).toFixed(decimals)}京円`;
  }
  return `${sign}${value.toFixed(decimals)}兆円`;
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/** 1人当たり（value = 円/人 or ドル/人） */
export function formatPerCapita(value: number, currency: Currency): string {
  if (currency === 'USD') {
    return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  }
  // JPY: 円/人 → 万円/人
  return `${(value / 1e4).toLocaleString(undefined, { maximumFractionDigits: 0 })}万円`;
}
