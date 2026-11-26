// #/health — life expectancy (total, women, men), infant mortality, human development.

import { lifeExpectancy } from '../data.js';
import { hBars } from '../charts.js';
import { factTable, figure, pageHead } from '../ui.js';

export const health = {
  title: 'Health',
  render() {
    return `${pageHead('Section 4', 'Health and development', 'How long people in Japan live, and how Japan ranks on human development.')}
<section class="panel">${figure('chart-life', 'Life expectancy at birth, 2024 (years)', hBars(lifeExpectancy, { max: 90, unit: 'years' }), 'Unit: years. Year: 2024. Source: World Bank WDI. Bars start at zero.')}</section>
${factTable(['lifeExp', 'lifeExpF', 'lifeExpM', 'infantMort', 'hdi', 'internet'], 'Health, development and connectivity')}
<section class="panel notes"><h2>Notes</h2><ul><li>Infant mortality is a range, 1.7–1.8 per 1,000 live births, as published for 2024.</li>
<li>The HDI is for 2023 (UNDP), a different year from the WDI figures.</li></ul></section>`;
  },
};
