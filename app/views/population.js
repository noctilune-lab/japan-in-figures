// #/population — size and change, a year switcher on the population series, age structure, births and deaths.

import { populationSeries, ageStructure, vitalRates } from '../data.js';
import { lineChart, stackedBar, hBars } from '../charts.js';
import { factTable, figure, pageHead } from '../ui.js';

const pts = populationSeries.points;

function readout(year, mode) {
  const i = pts.findIndex((p) => p.year === year), p = pts[i], first = pts[0];
  const d = (p.value - first.value).toFixed(1);
  const prev = i ? `${(p.value - pts[i - 1].value >= 0 ? '+' : '')}${(p.value - pts[i - 1].value).toFixed(1)} million since ${pts[i - 1].year}` : 'first year of the series';
  return `<strong>${p.year}: ${p.value.toFixed(1)} million</strong> · ${i ? `${d >= 0 ? '+' : ''}${d} million since ${first.year}` : 'baseline'} · ${prev} (differences derived from the series; mode: ${mode === 'change' ? 'change since 2000' : 'level'})`;
}

export const population = {
  title: 'Population',
  render() {
    const years = pts.map((p) => `<option value="${p.year}"${p.year === 2024 ? ' selected' : ''}>${p.year}</option>`).join('');
    return `${pageHead('Section 1', 'Population', 'How many people live in Japan, how old they are, and how fast the numbers are changing.')}
${factTable(['population', 'popGrowth', 'popRank', 'landArea', 'density', 'urban', 'medianAge'], 'Population and settlement')}
<section class="panel"><h2>Population series, 2000–2024</h2>
<div class="controls">
  <label>Year <select id="pop-year">${years}</select></label>
  <label>View <select id="pop-mode"><option value="level">Level (million people)</option><option value="change">Change since 2000 (million, derived)</option></select></label>
</div>
<p id="pop-readout" class="readout" aria-live="polite"></p>
<div id="pop-chart-host"></div>
</section>
<section class="panel"><h2>Age structure, 2024</h2>
${figure('chart-age', 'Share of population by age group (%)', stackedBar(ageStructure), 'Unit: % of population. Year: 2024. Source: World Bank WDI. † Derived as the remainder: 100 − 11.4 − 29.8. In 2025 the 65+ share is 30.0% (WDI).')}
${factTable(['age0', 'age65', 'age65b', 'medianAge'], 'Age indicators')}</section>
<section class="panel"><h2>Births, deaths and fertility</h2>
${figure('chart-vital', 'Births and deaths per 1,000 people, 2024', hBars(vitalRates, { max: 15, unit: 'per 1,000 people' }), 'Unit: per 1,000 people. Year: 2024. Source: World Bank WDI. Deaths outnumber births, which is why the population is falling.')}
${factTable(['birthRate', 'deathRate', 'fertility'], 'Vital statistics')}</section>`;
  },
  mount(root) {
    const host = root.querySelector('#pop-chart-host'), ySel = root.querySelector('#pop-year'), mSel = root.querySelector('#pop-mode'), out = root.querySelector('#pop-readout');
    const draw = () => {
      const year = Number(ySel.value), mode = mSel.value;
      host.innerHTML = figure('chart-pop', mode === 'change' ? 'Change in population since 2000 (million people)' : 'Population of Japan (million people)',
        lineChart(pts, { mode, year, unit: 'million people' }),
        `Unit: million people, approximate${mode === 'change' ? '; change since 2000 is derived' : ''}. Years: 2000, 2005, 2010, 2015, 2020, 2024. Source: World Bank WDI.`);
      out.innerHTML = readout(year, mode);
    };
    ySel.addEventListener('change', draw);
    mSel.addEventListener('change', draw);
    draw();
  },
};
