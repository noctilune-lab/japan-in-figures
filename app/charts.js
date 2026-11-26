// Inline SVG charts drawn from plain arrays: a line chart with a selectable year, horizontal bars and a stacked bar.
// Colours come from CSS classes, so the stylesheet owns the palette.

const W = 640;

// Line chart of {year, value} points. mode "level" plots the values; "change" plots the difference from the first
// point (derived). `year` marks one point.
export function lineChart(points, { mode = 'level', year = null, unit = '' } = {}) {
  const name = `${mode === 'change' ? 'Change since ' + points[0].year + ', ' : ''}Line chart of ${unit || 'values'}, ${points.map((p) => p.year).join(', ')}`;
  const first = points[0].value;
  const vals = points.map((p) => (mode === 'change' ? +(p.value - first).toFixed(1) : p.value));
  const lo = mode === 'change' ? Math.min(...vals, 0) : Math.floor(Math.min(...vals) - 1);
  const hi = mode === 'change' ? Math.max(...vals, 0) + 0.5 : Math.ceil(Math.max(...vals) + 1);
  const L = 52, R = 18, T = 16, B = 34, H = 260;
  const x = (i) => L + (i * (W - L - R)) / (points.length - 1);
  const y = (v) => T + ((hi - v) * (H - T - B)) / (hi - lo);
  const ticks = [];
  const step = mode === 'change' ? 1 : 1;
  for (let t = Math.ceil(lo); t <= hi; t += step) ticks.push(t);
  const grid = ticks.map((t) => `<line class="grid" x1="${L}" x2="${W - R}" y1="${y(t)}" y2="${y(t)}"/><text class="tick" x="${L - 8}" y="${y(t) + 4}" text-anchor="end">${t}</text>`).join('');
  const zero = mode === 'change' ? `<line class="zero" x1="${L}" x2="${W - R}" y1="${y(0)}" y2="${y(0)}"/>` : '';
  const path = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(vals[i]).toFixed(1)}`).join(' ');
  const dots = points.map((p, i) => {
    const on = p.year === year;
    return `<circle class="dot${on ? ' on' : ''}" cx="${x(i).toFixed(1)}" cy="${y(vals[i]).toFixed(1)}" r="${on ? 6 : 3.5}"/>` +
      `<text class="xtick${on ? ' on' : ''}" x="${x(i).toFixed(1)}" y="${H - 12}" text-anchor="middle">${p.year}</text>` +
      `<text class="vlabel${on ? ' on' : ''}" x="${x(i).toFixed(1)}" y="${(y(vals[i]) - 11).toFixed(1)}" text-anchor="middle">${mode === 'change' && vals[i] > 0 ? '+' : ''}${vals[i]}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${name}"><title>${name}</title>${grid}${zero}<path class="line" d="${path}"/>${dots}</svg>`;
}

// Horizontal bars for {label, value}; `max` is the value at full width.
export function hBars(items, { max, unit = '', decimals = 1, name = '' } = {}) {
  const label = `${name ? name + ', ' : 'Bar chart, '}${unit}: ${items.map((it) => `${it.label} ${it.value.toFixed(decimals)}`).join('; ')}`;
  const rowH = 38, L = 150, R = 70, H = items.length * rowH + 8;
  const inner = W - L - R;
  const rows = items.map((it, i) => {
    const w = (it.value / max) * inner, y0 = 4 + i * rowH;
    return `<text class="barlabel" x="${L - 10}" y="${y0 + 20}" text-anchor="end">${it.label}${it.derived ? ' †' : ''}</text>` +
      `<rect class="bar${it.derived ? ' derived' : ''}" x="${L}" y="${y0 + 5}" width="${w.toFixed(1)}" height="22"/>` +
      `<text class="barvalue" x="${L + w + 8}" y="${y0 + 21}">${it.value.toFixed(decimals)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}"><title>${label}</title>${rows}</svg>`;
}

// One stacked bar summing to 100 %, with a legend row underneath each segment.
export function stackedBar(items, { name = 'Stacked bar' } = {}) {
  const label = `${name}: ${items.map((it) => `${it.label.replace('Ages ', '')} ${it.value.toFixed(1)}%`).join('; ')}`;
  const L = 8, bw = W - 16, H = 110;
  let acc = 0;
  const segs = items.map((it, i) => {
    const w = (it.value / 100) * bw, x0 = L + (acc / 100) * bw;
    acc += it.value;
    return `<rect class="seg s${i}" x="${x0.toFixed(1)}" y="14" width="${w.toFixed(1)}" height="46"/>` +
      `<text class="segvalue" x="${(x0 + w / 2).toFixed(1)}" y="43" text-anchor="middle">${it.value.toFixed(1)}%</text>` +
      `<text class="seglabel" x="${(x0 + w / 2).toFixed(1)}" y="82" text-anchor="middle">${it.label.replace('Ages ', '')}${it.derived ? ' †' : ''}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}"><title>${label}</title>${segs}</svg>`;
}
