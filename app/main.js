// Router and page shell: renders the page for the current hash route, marks the active nav link and wires its controls.
//   #/  #/population  #/economy  #/work  #/health  #/regions  #/sources
// window.__shotReady is false while a page renders and true once it is on screen, for the screenshot script.

import { overview } from './views/overview.js';
import { population } from './views/population.js';
import { economy } from './views/economy.js';
import { work } from './views/work.js';
import { health } from './views/health.js';
import { regions } from './views/regions.js';
import { sourcesView } from './views/sources.js';

const routes = { '': overview, population, economy, work, health, regions, sources: sourcesView };
const app = document.getElementById('app');

function render() {
  window.__shotReady = false;
  const key = location.hash.replace(/^#\/?/, '').split('?')[0];
  const view = routes[key];
  document.title = `${view ? view.title : 'Not found'} · Japan in Figures`;
  app.innerHTML = view ? view.render() : '<h1>Page not found</h1><p><a href="#/">Back to the overview</a></p>';
  if (view && view.mount) view.mount(app);
  document.querySelectorAll('#nav a').forEach((a) => {
    const on = a.getAttribute('href') === `#/${key}`;
    a.classList.toggle('on', on);
    if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
