// #/economy — output, income per head, growth and public debt. Only the verified figures; trade is not shown.

import { factTable, pageHead } from '../ui.js';

export const economy = {
  title: 'Economy',
  render() {
    return `${pageHead('Section 2', 'Economy', 'The size of the Japanese economy in dollars, per person and in real terms.')}
${factTable(['gdp', 'gdpPpp', 'gdpPc', 'gdpGrowth', 'debt'], 'Output, income and public debt')}
<section class="panel notes"><h2>Reading these figures</h2>
<ul><li><strong>Nominal vs PPP.</strong> Nominal GDP converts yen to dollars at market exchange rates (IMF, 2024). The PPP figure adjusts for price levels (World Bank, 2024), so the two differ.</li>
<li><strong>Growth.</strong> Real growth of +0.1% in 2024 is the Destatis country-profile figure; other tables round or revise it differently, so only this one is shown.</li>
<li><strong>Debt.</strong> Gross government debt is about 252% of GDP (IMF, 2024), approximate. It is gross debt, before netting out government financial assets.</li>
<li><strong>Not shown.</strong> Exports and imports are left out: no verified figure is held for them, and none is invented here.</li></ul></section>`;
  },
};
