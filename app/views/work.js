// #/work — unemployment. Labour-force participation is not shown: no verified figure is held for it.

import { factTable, pageHead } from '../ui.js';

export const work = {
  title: 'Work',
  render() {
    return `${pageHead('Section 3', 'Work', 'Unemployment in Japan, for the whole labour force and for people aged 15–24.')}
${factTable(['unemployment', 'youthUnemployment'], 'Unemployment')}
<section class="panel notes"><h2>Reading these figures</h2>
<ul><li>The overall rate is for 2024 and the youth rate for 2025, so they are not the same year; compare them with care.</li>
<li>Both are modelled estimates in the ILO tradition, which count people without work who are available and looking for it.</li>
<li>Labour-force participation is not shown: no verified figure is held for it.</li></ul></section>`;
  },
};
