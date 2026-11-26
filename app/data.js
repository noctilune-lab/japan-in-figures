// Every figure the site shows, with its source and year. Nothing is fetched; nothing is computed except where a
// field is marked "derived". Figures are as compiled in the project fact sheet from the publishers named in `sources`.

export const sources = {
  wdi: { name: 'World Bank, World Development Indicators', short: 'World Bank WDI', publisher: 'The World Bank', years: '2000–2025 series; latest 2024', use: 'Population, land area, density, life expectancy, fertility, age shares, birth and death rates, infant mortality, urban population, internet users, PPP GDP, population series' },
  imf: { name: 'IMF World Economic Outlook', short: 'IMF WEO', publisher: 'International Monetary Fund', years: '2024', use: 'Nominal GDP, GDP per capita, government gross debt (approximate)' },
  destatis: { name: 'Destatis country profile: Japan', short: 'Destatis', publisher: 'Statistisches Bundesamt (Germany)', years: '2024', use: 'Real GDP growth' },
  un: { name: 'UN World Population Prospects (projection), as cited in Demographics of Japan', short: 'UN projection', publisher: 'United Nations, Population Division', years: '2024', use: 'Median age' },
  ilo: { name: 'ILO modelled estimates (unemployment)', short: 'ILO estimate', publisher: 'International Labour Organization', years: '2024 (total), 2025 (youth 15–24)', use: 'Unemployment rate, youth unemployment' },
  undp: { name: 'Human Development Report', short: 'UNDP HDR', publisher: 'United Nations Development Programme', years: '2023', use: 'Human Development Index' },
};

export const country = {
  name: 'Japan', capital: 'Tokyo', prefectures: 47, currency: 'Yen (JPY)', language: 'Japanese',
};

// Headline indicators. value is display text; unit follows it; src is a key of `sources`.
export const facts = {
  population: { label: 'Population', value: '123,975,371', unit: 'people', year: 2024, src: 'wdi' },
  popGrowth: { label: 'Population growth', value: '−0.4', unit: '% a year', year: 2024, src: 'wdi' },
  popRank: { label: 'World rank by population', value: '12th', unit: '', year: 2024, src: 'wdi' },
  landArea: { label: 'Land area', value: '364,569', unit: 'km²', year: 2024, src: 'wdi' },
  density: { label: 'Population density', value: '≈ 340', unit: 'people per km²', year: 2024, src: 'wdi' },
  urban: { label: 'Urban population', value: '92.2', unit: '% of total', year: 2024, src: 'wdi' },
  medianAge: { label: 'Median age', value: '49.9', unit: 'years', year: 2024, src: 'un' },
  age0: { label: 'Aged 0–14', value: '11.4', unit: '% of population', year: 2024, src: 'wdi' },
  age65: { label: 'Aged 65 and over', value: '29.8', unit: '% of population', year: 2024, src: 'wdi' },
  age65b: { label: 'Aged 65 and over', value: '30.0', unit: '% of population', year: 2025, src: 'wdi' },
  birthRate: { label: 'Crude birth rate', value: '5.7', unit: 'per 1,000 people', year: 2024, src: 'wdi' },
  deathRate: { label: 'Crude death rate', value: '13.3', unit: 'per 1,000 people', year: 2024, src: 'wdi' },
  fertility: { label: 'Total fertility rate', value: '1.15', unit: 'births per woman', year: 2024, src: 'wdi' },
  gdp: { label: 'GDP, nominal', value: '4,019.4', unit: 'US$ billion', year: 2024, src: 'imf' },
  gdpPc: { label: 'GDP per capita, nominal', value: '32,443', unit: 'US$', year: 2024, src: 'imf' },
  gdpPpp: { label: 'GDP, PPP', value: '5.715', unit: 'US$ trillion', year: 2024, src: 'wdi' },
  gdpGrowth: { label: 'Real GDP growth', value: '+0.1', unit: '% a year', year: 2024, src: 'destatis' },
  debt: { label: 'Government gross debt (approximate)', value: '≈ 252', unit: '% of GDP', year: 2024, src: 'imf' },
  unemployment: { label: 'Unemployment rate', value: '2.5', unit: '% of labour force', year: 2024, src: 'ilo' },
  youthUnemployment: { label: 'Youth unemployment (ages 15–24)', value: '3.9', unit: '% of youth labour force', year: 2025, src: 'ilo' },
  lifeExp: { label: 'Life expectancy at birth, total', value: '84.0', unit: 'years', year: 2024, src: 'wdi' },
  lifeExpF: { label: 'Life expectancy at birth, women', value: '87.1', unit: 'years', year: 2024, src: 'wdi' },
  lifeExpM: { label: 'Life expectancy at birth, men', value: '81.1', unit: 'years', year: 2024, src: 'wdi' },
  infantMort: { label: 'Infant mortality', value: '1.7–1.8', unit: 'per 1,000 live births', year: 2024, src: 'wdi' },
  hdi: { label: 'Human Development Index', value: '0.925', unit: 'index, 0 to 1', year: 2023, src: 'undp' },
  internet: { label: 'Internet users', value: '85.5', unit: '% of population', year: 2024, src: 'wdi' },
};

// Population, millions, approximate, World Bank WDI.
export const populationSeries = {
  title: 'Population of Japan', unit: 'million people', src: 'wdi',
  points: [
    { year: 2000, value: 126.9 }, { year: 2005, value: 127.8 }, { year: 2010, value: 128.1 },
    { year: 2015, value: 127.1 }, { year: 2020, value: 125.8 }, { year: 2024, value: 124.0 },
  ],
};

// Age structure 2024 (WDI). The 15–64 share is derived as the remainder: 100 − 11.4 − 29.8.
export const ageStructure = [
  { label: 'Ages 0–14', value: 11.4, derived: false },
  { label: 'Ages 15–64', value: 58.8, derived: true },
  { label: 'Ages 65 and over', value: 29.8, derived: false },
];

// Births and deaths per 1,000 people, 2024 (WDI).
export const vitalRates = [
  { label: 'Births', value: 5.7 },
  { label: 'Deaths', value: 13.3 },
];

// Life expectancy at birth, years, 2024 (WDI).
export const lifeExpectancy = [
  { label: 'Women', value: 87.1 },
  { label: 'Total', value: 84.0 },
  { label: 'Men', value: 81.1 },
];
