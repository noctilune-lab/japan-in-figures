// #/sources — every publisher with its series and year, and the method note.

import { sources } from '../data.js';
import { esc, pageHead } from '../ui.js';

export const sourcesView = {
  title: 'Sources',
  render() {
    const rows = Object.values(sources).map((s) => `<tr><th scope="row">${esc(s.name)}</th><td>${esc(s.publisher)}</td><td>${esc(s.years)}</td><td>${esc(s.use)}</td></tr>`).join('');
    return `${pageHead('Section 6', 'Sources and method', 'Where every figure on this site comes from.')}
<table class="facts"><caption>Publishers and series</caption><thead><tr><th scope="col">Source</th><th scope="col">Publisher</th><th scope="col">Year(s)</th><th scope="col">Used for</th></tr></thead><tbody>${rows}</tbody></table>
<section class="panel notes"><h2>Method note</h2>
<ul><li>Figures are reproduced as published by the sources above; the year shown beside each is the year the figure refers to.</li>
<li>The site holds no live data: everything is stored in its own files and it works offline, with no network request.</li>
<li>Marked "approximate" or "≈" where the published value is rounded or a range. The population series is rounded to 0.1 million.</li>
<li>Derived values are marked: the 15–64 share (remainder of 100%) and the changes since 2000 on the population page.</li>
<li>Where sources disagree (real GDP growth) one source is shown and the other is left out; nothing is averaged.</li>
<li>Left out because no verified figure is held: exports and imports, labour-force participation, prefecture populations and areas.</li></ul></section>`;
  },
};
