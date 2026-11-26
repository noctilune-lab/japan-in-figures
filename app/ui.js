// Small HTML helpers shared by every page: escaping, the cited-figure row, the headline tile and the page header.

import { facts, sources } from './data.js';

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export const cite = (f) => `${sources[f.src].short}, ${f.year}`;

// One headline figure as a tile; `href` makes the whole tile a link to its section.
export function tile(key, href) {
  const f = facts[key];
  return `<a class="tile" href="${href}"><span class="tile-label">${esc(f.label)}</span>
<span class="tile-value">${esc(f.value)}</span><span class="tile-unit">${esc(f.unit)}</span>
<span class="tile-src">${esc(cite(f))}</span></a>`;
}

// A table of cited indicators: label, value, unit, year, source.
export function factTable(keys, caption) {
  const rows = keys.map((k) => {
    const f = facts[k];
    return `<tr><th scope="row">${esc(f.label)}</th><td class="num">${esc(f.value)}</td><td>${esc(f.unit)}</td><td class="num">${f.year}</td><td>${esc(sources[f.src].short)}</td></tr>`;
  }).join('');
  return `<table class="facts"><caption>${esc(caption)}</caption>
<thead><tr><th scope="col">Indicator</th><th scope="col" class="num">Value</th><th scope="col">Unit</th><th scope="col" class="num">Year</th><th scope="col">Source</th></tr></thead>
<tbody>${rows}</tbody></table>`;
}

export function pageHead(kicker, title, lede) {
  return `<header class="page-head"><p class="kicker">${esc(kicker)}</p><h1>${esc(title)}</h1><p class="lede">${esc(lede)}</p></header>`;
}

// A chart frame: title, the chart itself, and the unit/year/source line every chart carries.
export function figure(id, title, body, note) {
  return `<figure class="chart" id="${id}"><figcaption>${esc(title)}</figcaption>${body}<p class="chart-note">${esc(note)}</p></figure>`;
}
