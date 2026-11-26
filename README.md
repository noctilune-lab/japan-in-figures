# japan-in-figures

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/noctilune-lab/japan-in-figures/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/noctilune-lab/japan-in-figures/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Japan in Figures — a statistical yearbook-style site about Japan: population, economy, work, health and all 47 prefectures, with every figure carrying its source and year. Static files under `app/`, no network requests, works offline on desktop and phone.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080 — the overview, population, economy, work, health, regions and sources pages are hash routes (`#/population`, …). The regions table sorts, searches and filters; the population page has a year and level/change switcher.

Node 22 or later, standard library only. `main.ts` copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the kit's vendor library.

---

<sub>Entered on [make.fun](https://make.fun/?ref=ec83f8e6&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
