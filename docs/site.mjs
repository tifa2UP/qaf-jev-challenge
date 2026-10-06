// The content remains readable without JavaScript; enhancement adds one-panel tabs.
const tabsContainer = document.querySelector('.journey-tabs');
const tabs = [...document.querySelectorAll('.journey-tab')];
const panels = tabs.map(tab => document.querySelector(tab.getAttribute('href')));
if (tabsContainer && tabs.length && panels.every(Boolean)) {
  tabsContainer.setAttribute('role', 'tablist');
  const mobileTabs = matchMedia('(max-width: 700px)');
  const setOrientation = () => tabsContainer.setAttribute('aria-orientation', mobileTabs.matches ? 'horizontal' : 'vertical');
  setOrientation();
  mobileTabs.addEventListener('change', setOrientation);
  document.documentElement.classList.add('js-tabs');
  const selectTab = (index, focus = false) => {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus({preventScroll: true});
  };
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[index].id);
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].tabIndex = 0;
    tab.addEventListener('click', event => { event.preventDefault(); selectTab(index); });
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else if (event.key === ' ' || event.key === 'Enter') next = index;
      else if (event.key === (mobileTabs.matches ? 'ArrowLeft' : 'ArrowDown')) next = (index + 1) % tabs.length;
      else if (event.key === (mobileTabs.matches ? 'ArrowRight' : 'ArrowUp')) next = (index - 1 + tabs.length) % tabs.length;
      if (next !== undefined) { event.preventDefault(); selectTab(next, true); }
    });
  });
  const hashIndex = panels.findIndex(panel => '#' + panel.id === location.hash);
  selectTab(hashIndex >= 0 ? hashIndex : 0);
  addEventListener('hashchange', () => {
    const index = panels.findIndex(panel => '#' + panel.id === location.hash);
    if (index >= 0) selectTab(index);
  });
}

const film = document.querySelector('#project-film');
const filmPlay = document.querySelector('.film-play');
if (film && filmPlay) {
  filmPlay.hidden = false;
  filmPlay.addEventListener('click', async () => {
    filmPlay.hidden = true;
    try { await film.play(); } catch { filmPlay.hidden = false; film.focus(); }
  });
  film.addEventListener('play', () => { filmPlay.hidden = true; });
  film.addEventListener('ended', () => { filmPlay.hidden = false; filmPlay.setAttribute('aria-label', 'إعادة تشغيل فيلم المشروع'); });
  film.addEventListener('loadedmetadata', () => {
    if (!Number.isFinite(film.duration)) return;
    const totalSeconds = Math.round(film.duration);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const number = new Intl.NumberFormat('ar', {minimumIntegerDigits: 2});
    const duration = document.querySelector('#film-duration');
    const time = document.createElement('bdi');
    time.dir = 'ltr';
    time.textContent = `${number.format(minutes)}:${number.format(seconds)}`;
    duration.replaceChildren(time, document.createTextNode(' دقيقة'));
  });
}

// Highlight the visible chapter without changing focus or interrupting scrolling.
const navLinks = [...document.querySelectorAll('.main-nav a')];
if ('IntersectionObserver' in window) {
  const currentSections = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => currentSections.set(entry.target.id, entry));
    const visible = [...currentSections.values()].filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    navLinks.forEach(link => {
      const active = visible[0] && link.hash === '#' + visible[0].target.id;
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, {rootMargin: '-18% 0px -50% 0px', threshold: 0});
  navLinks.forEach(link => { const section = document.querySelector(link.hash); if (section) observer.observe(section); });
}
