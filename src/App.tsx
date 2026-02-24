import { useState } from 'react';
import { calculateNationalWealth } from './calculator';
import { formatNumber, formatPercent, formatPerCapita } from './format';
import { US_REFERENCE, JAPAN_REFERENCE } from './data/referenceData';
import type { NationalWealthInput, NationalWealthResult } from './types';
import type { Currency } from './types';

const PRESETS: Record<string, NationalWealthInput> = {
  US: US_REFERENCE,
  JP: JAPAN_REFERENCE,
};

function ResultTable({ result, currency }: { result: NationalWealthResult; currency: Currency }) {
  return (
    <div className="result-grid">
      <div className="result-card">
        <span className="label">国家総資産（国民総資産）</span>
        <span className="value">{formatNumber(result.nationalTotalAssets, currency)}</span>
      </div>
      <div className="result-card">
        <span className="label">国家純資産（国民純資産）</span>
        <span className="value highlight">{formatNumber(result.nationalNetWorth, currency)}</span>
      </div>
      <div className="result-card">
        <span className="label">政府負債／国民純資産</span>
        <span className="value">{formatPercent(result.governmentDebtToNetWorthRatio)}</span>
      </div>
      <div className="result-card">
        <span className="label">国民自己資本比率</span>
        <span className="value">{formatPercent(result.nationalEquityRatio)}</span>
      </div>
      <div className="result-card">
        <span className="label">国民 D/E</span>
        <span className="value">{formatPercent(result.nationalDebtToEquity)}</span>
      </div>
      <div className="result-card">
        <span className="label">1人当たり総資産</span>
        <span className="value">{formatPerCapita(result.perCapitaTotalAssets, currency)}</span>
      </div>
      <div className="result-card">
        <span className="label">1人当たり純資産</span>
        <span className="value highlight">{formatPerCapita(result.perCapitaNetWorth, currency)}</span>
      </div>
      <div className="result-card">
        <span className="label">対外純資産</span>
        <span className="value">{formatNumber(result.externalNetAssets, currency)}</span>
      </div>
    </div>
  );
}

function SectorBreakdown({ input }: { input: NationalWealthInput }) {
  const { sectors, currency } = input;
  return (
    <div className="sector-breakdown">
      <h3>連結BS 部門別純資産</h3>
      <table>
        <tbody>
          <tr>
            <td>政府部門</td>
            <td className={sectors.government < 0 ? 'negative' : ''}>
              {formatNumber(sectors.government, currency)}
            </td>
          </tr>
          <tr>
            <td>非金融法人企業</td>
            <td>{formatNumber(sectors.nonFinancialCorporations, currency)}</td>
          </tr>
          <tr>
            <td>家計・非営利団体</td>
            <td>{formatNumber(sectors.householdsAndNonprofits, currency)}</td>
          </tr>
          <tr className="total">
            <td>連結純資産</td>
            <td>
              {formatNumber(
                sectors.government +
                  sectors.nonFinancialCorporations +
                  sectors.householdsAndNonprofits,
                currency
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  const [preset, setPreset] = useState<'US' | 'JP'>('US');
  const [input, setInput] = useState<NationalWealthInput>(() => PRESETS.US);

  const handlePresetChange = (p: 'US' | 'JP') => {
    setPreset(p);
    setInput(PRESETS[p]);
  };

  const result = calculateNationalWealth(input);

  return (
    <div className="app">
      <header>
        <h1>国富実態算定計算機</h1>
        <p className="subtitle">
          TANAAKK流｜連結BS・純資産ベースの実態指標
          <br />
          <small>マネーサプライ等の国別定義に依存しない実態把握</small>
        </p>
      </header>

      <section className="preset-selector">
        <label>国選択</label>
        <div className="preset-buttons">
          <button
            className={preset === 'US' ? 'active' : ''}
            onClick={() => handlePresetChange('US')}
          >
            🇺🇸 アメリカ
          </button>
          <button
            className={preset === 'JP' ? 'active' : ''}
            onClick={() => handlePresetChange('JP')}
          >
            🇯🇵 日本
          </button>
        </div>
        {input.asOfDate && (
          <span className="as-of">データ基準: {input.asOfDate}</span>
        )}
      </section>

      <main>
        <SectorBreakdown input={input} />
        <ResultTable result={result} currency={input.currency} />
      </main>

      <section className="methodology">
        <h3>考え方（TANAAKK）</h3>
        <ul>
          <li>国家を企業の連結決算と同様に捉える（政府・企業・家計の連結BS）</li>
          <li>部門間債権債務は国内で相殺 → 国民純資産が実態</li>
          <li>政府債務をGDP比ではなく国民純資産比で評価</li>
          <li>1人当たり純資産・総資産で国際比較</li>
        </ul>
        <p className="refs">
          <a href="https://www.tanaakk.com/2025/05/27/us-balance-sheet/" target="_blank" rel="noopener noreferrer">
            アメリカ国富の実態
          </a>
          {' · '}
          <a href="https://www.tanaakk.com/2025/05/27/seigniorage/" target="_blank" rel="noopener noreferrer">
            シニョレッジ
          </a>
          {' · '}
          <a href="https://www.tanaakk.com/2026/02/20/money-2/" target="_blank" rel="noopener noreferrer">
            資本レバレッジ重力説
          </a>
        </p>
      </section>
    </div>
  );
}
