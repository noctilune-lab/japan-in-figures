// A table whose column headers sort it, with an optional text filter. columns: [{key, label, num, pad, lang}]; rows: objects.

import { esc } from './ui.js';

export function tableHtml(id, columns, rows, caption) {
  const head = columns.map((c) => `<th scope="col" class="${c.num ? 'num ' : ''}sortable" aria-sort="none"><button type="button" data-key="${c.key}">${esc(c.label)}<span class="arrow" aria-hidden="true"></span></button></th>`).join('');
  return `<table class="data" id="${id}"><caption>${esc(caption)}</caption><thead><tr>${head}</tr></thead><tbody></tbody></table>`;
}

// Wires sorting and filtering for a table made by tableHtml. `filterInput` and `countEl` are optional elements.
export function mountTable(root, id, columns, rows, { filterInput, countEl, extraFilter, emptyEl } = {}) {
  const table = root.querySelector(`#${id}`);
  const body = table.querySelector('tbody');
  let sortKey = columns[0].key, dir = 1;
  const draw = () => {
    const q = filterInput ? filterInput.value.trim().toLowerCase() : '';
    let list = rows.filter((r) => (!q || columns.some((c) => String(r[c.key]).toLowerCase().includes(q))) && (!extraFilter || extraFilter(r)));
    const col = columns.find((c) => c.key === sortKey);
    list = [...list].sort((a, b) => (col.num ? a[sortKey] - b[sortKey] : String(a[sortKey]).localeCompare(String(b[sortKey]))) * dir);
    body.innerHTML = list.map((r) => `<tr>${columns.map((c) => `<${c.num ? 'td class="num"' : 'td'}${c.lang ? ` lang="${c.lang}"` : ''}>${esc(c.pad ? String(r[c.key]).padStart(2, '0') : r[c.key])}</td>`).join('')}</tr>`).join('');
    if (countEl) countEl.textContent = `${list.length} of ${rows.length} prefectures`;
    if (emptyEl) emptyEl.hidden = list.length > 0;
    table.querySelectorAll('th.sortable').forEach((th) => {
      const on = th.querySelector('button').dataset.key === sortKey;
      th.setAttribute('aria-sort', on ? (dir === 1 ? 'ascending' : 'descending') : 'none');
      th.querySelector('.arrow').textContent = on ? (dir === 1 ? ' ▲' : ' ▼') : '';
    });
  };
  table.querySelectorAll('th button').forEach((b) => b.addEventListener('click', () => {
    dir = sortKey === b.dataset.key ? -dir : 1;
    sortKey = b.dataset.key;
    draw();
  }));
  if (filterInput) filterInput.addEventListener('input', draw);
  draw();
  return draw;
}
