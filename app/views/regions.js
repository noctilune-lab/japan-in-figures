// #/regions — the 47 prefectures: sortable columns, a search box and a region filter.

import { prefectures, regionNames } from '../prefectures.js';
import { tableHtml, mountTable } from '../sortable-table.js';
import { pageHead } from '../ui.js';

const columns = [
  { key: 'code', label: 'Code', num: true, pad: true },
  { key: 'name', label: 'Prefecture' },
  { key: 'kanji', label: 'Japanese', lang: 'ja' },
  { key: 'capital', label: 'Capital' },
  { key: 'region', label: 'Region' },
];

export const regions = {
  title: 'Regions',
  render() {
    const opts = regionNames.map((r) => `<option>${r}</option>`).join('');
    return `${pageHead('Section 5', 'Regions', 'Japan has 47 prefectures in eight regional groupings. Search by name, capital or region; click a column heading to sort.')}
<div class="controls"><label>Search <input id="pref-search" type="search" placeholder="e.g. Kyoto, Nagoya, Kanto" autocomplete="off"></label>
<label>Region <select id="pref-region"><option value="">All regions</option>${opts}</select></label>
<span id="pref-count" class="count" aria-live="polite"></span></div>
${tableHtml('pref-table', columns, prefectures, 'The 47 prefectures of Japan')}
<p id="pref-empty" class="empty" hidden>No prefecture matches this search.</p>
<p class="small">Prefecture codes follow the national standard numbering, north (01) to south (47). Prefecture-level population and area figures are not shown: none is held that has been verified, so none is invented here. Prefecture names, capitals and regional groupings are standard reference facts.</p>`;
  },
  mount(root) {
    const region = root.querySelector('#pref-region');
    const draw = mountTable(root, 'pref-table', columns, prefectures, {
      filterInput: root.querySelector('#pref-search'),
      countEl: root.querySelector('#pref-count'),
      emptyEl: root.querySelector('#pref-empty'),
      extraFilter: (r) => !region.value || r.region === region.value,
    });
    region.addEventListener('change', draw);
  },
};
