// #/ — the headline indicators, the population trend and a link to every section.

import { populationSeries, country } from '../data.js';
import { lineChart } from '../charts.js';
import { tile, figure, pageHead } from '../ui.js';

export const sections = [
  ['#/population', 'Population', 'Size, change, age structure, births and deaths'],
  ['#/economy', 'Economy', 'GDP, income per head, growth and public debt'],
  ['#/work', 'Work', 'Unemployment, overall and for ages 15–24'],
  ['#/health', 'Health', 'Life expectancy, infant mortality, human development'],
  ['#/regions', 'Regions', 'The 47 prefectures with capitals, searchable'],
  ['#/sources', 'Sources', 'Every publisher, year and the method note'],
];

export const overview = {
  title: 'Overview',
  render() {
    const chart = figure('chart-overview', 'Population of Japan, 2000–2024 (million people)',
      lineChart(populationSeries.points, { year: 2024, unit: 'population, million people' }),
      'Unit: million people, approximate. Years: 2000, 2005, 2010, 2015, 2020, 2024. Source: World Bank WDI.');
    const links = sections.map(([h, t, d]) => `<li><a href="${h}"><strong>${t}</strong><span>${d}</span></a></li>`).join('');
    return `${pageHead('Japan in Figures · yearbook edition', 'Japan at a glance', `${country.name}: capital ${country.capital}, ${country.prefectures} prefectures, currency ${country.currency}, language ${country.language}. Latest available figures, each with its publisher and year.`)}
<section aria-label="Headline indicators"><div class="tiles">
${tile('population', '#/population')}${tile('gdp', '#/economy')}${tile('gdpPc', '#/economy')}${tile('lifeExp', '#/health')}
${tile('fertility', '#/population')}${tile('unemployment', '#/work')}${tile('medianAge', '#/population')}${tile('age65', '#/population')}
</div></section>
<section class="split"><div>${chart}<p class="more"><a href="#/population">Explore the population series by year →</a></p></div>
<nav aria-label="Sections" class="toc"><h2>Sections</h2><ul>${links}</ul></nav></section>`;
  },
};
