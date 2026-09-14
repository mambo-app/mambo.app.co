(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const tmdb = (path) => `https://image.tmdb.org/t/p/${window.MamboPerformance?.lite ? 'w342' : 'w500'}/${path}.jpg`;
  const mal = (path) => `https://cdn.myanimelist.net/images/anime/${path}l.jpg`;
  const catalog = {
    movies: [
      {
        id: 'm157336',
        title: 'Interstellar',
        year: 2014,
        meta: '2h 49m · Sci-fi',
        score: '4.5',
        tag: 'Mind-benders',
        image: tmdb('gEU2QniE6E77NI6lCU6MxlNBvIx'),
        ref: 'https://www.themoviedb.org/movie/157336',
        description:
          'A journey beyond the stars. A story about the things that bring us home. Christopher Nolan turns humanity’s last chance into something deeply, unmistakably human.',
      },
      {
        id: 'm693134',
        title: 'Dune: Part Two',
        year: 2024,
        meta: '2h 47m · Sci-fi',
        score: '4.4',
        tag: 'Epic worlds',
        image: tmdb('1pdfLvkbY9ohJlCjQH2CZjjYVvJ'),
        ref: 'https://www.themoviedb.org/movie/693134',
        description:
          'Desert dreams, impossible choices, and a universe on the edge of change. Denis Villeneuve’s sweeping return to Arrakis is made for getting completely lost in.',
      },
      {
        id: 'm244786',
        title: 'Whiplash',
        year: 2014,
        meta: '1h 47m · Drama',
        score: '4.4',
        tag: 'Must-watch',
        image: tmdb('7fn624j5lj3xTme2SgiLCeuedmO'),
        ref: 'https://www.themoviedb.org/movie/244786',
        description:
          'An ambitious drummer. A merciless mentor. A pulse you can’t quite shake. Damien Chazelle asks what greatness costs, one relentless beat at a time.',
      },
      {
        id: 'm27205',
        title: 'Inception',
        year: 2010,
        meta: '2h 28m · Sci-fi',
        score: '4.3',
        tag: 'Mind-benders',
        image: tmdb('oYuLEt3zVCKq57qu2F8dT7NIa6f'),
        ref: 'https://www.themoviedb.org/movie/27205',
        description:
          'A heist inside a dream inside a question you’ll still be asking after the credits. Come for the spectacle. Stay for the spinning top.',
      },
      {
        id: 'm335984',
        title: 'Blade Runner 2049',
        year: 2017,
        meta: '2h 44m · Sci-fi',
        score: '4.2',
        tag: 'Epic worlds',
        image: tmdb('gajva2L0rPYkEWjzgFlBXCAVBE5'),
        ref: 'https://www.themoviedb.org/movie/335984',
        description:
          'Neon rain. Quiet loneliness. The search for something real. A breathtaking future that asks the oldest question: what makes us human?',
      },
      {
        id: 'm120467',
        title: 'The Grand Budapest Hotel',
        year: 2014,
        meta: '1h 40m · Comedy',
        score: '4.2',
        tag: 'Comfort picks',
        image: tmdb('eWdyYQreja6JGCzqHWXpWHDrrPo'),
        ref: 'https://www.themoviedb.org/movie/120467',
        description:
          'Perfectly framed chaos, pink pastries, and an unlikely friendship. Wes Anderson’s meticulously made world is a wonderful place to spend an afternoon.',
      },
      {
        id: 'm550',
        title: 'Fight Club',
        year: 1999,
        meta: '2h 19m · Drama',
        score: '4.3',
        tag: 'Mind-benders',
        image: tmdb('pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK'),
        ref: 'https://www.themoviedb.org/movie/550',
        description:
          'An insomniac, a soap salesman, and an unraveling sense of self. David Fincher’s cult classic is the kind of film that rewards a second look.',
      },
      {
        id: 'm414906',
        title: 'The Batman',
        year: 2022,
        meta: '2h 57m · Thriller',
        score: '4.0',
        tag: 'Epic worlds',
        image: tmdb('74xTEgt7R36Fpooo50r9T25onhq'),
        ref: 'https://www.themoviedb.org/movie/414906',
        description:
          'Gotham after dark. A detective story in the rain. Matt Reeves brings the world’s most familiar shadow back to its noir roots.',
      },
    ],
    series: [
      {
        id: 's95396',
        title: 'Severance',
        year: 2022,
        meta: 'Mystery · Apple TV+',
        score: '4.5',
        tag: 'Mind-benders',
        image: tmdb('pPHpeI2X1qEd1CS1SeyrdhZ4qnT'),
        ref: 'https://www.themoviedb.org/tv/95396',
        description:
          'Your work self. Your real self. A wall between them that probably shouldn’t be there. Welcome to Lumon, where the benefits are excellent and the questions keep getting stranger.',
      },
      {
        id: 's1396',
        title: 'Breaking Bad',
        year: 2008,
        meta: 'Crime · 5 seasons',
        score: '4.7',
        tag: 'Must-watch',
        image: tmdb('3xnWaLQjelJDDF7LT1WBo6f4BRe'),
        ref: 'https://www.themoviedb.org/tv/1396',
        description:
          'A chemistry teacher takes a turn down the wrong road. What follows is a meticulously built, morally complicated five-season descent you won’t forget.',
      },
      {
        id: 's70523',
        title: 'Dark',
        year: 2017,
        meta: 'Mystery · 3 seasons',
        score: '4.4',
        tag: 'Mind-benders',
        image: tmdb('apbrbWs8M9lyOpJYU5WXrpFbk1Z'),
        ref: 'https://www.themoviedb.org/tv/70523',
        description:
          'A missing child. Four families. A small town with a very complicated relationship with time. Keep a notebook. Trust no timeline.',
      },
      {
        id: 's136315',
        title: 'The Bear',
        year: 2022,
        meta: 'Drama · FX',
        score: '4.3',
        tag: 'Must-watch',
        image: tmdb('sHFlbKS3WLqMnp9t2ghADIJFnuQ'),
        ref: 'https://www.themoviedb.org/tv/136315',
        description:
          'Yes, chef. A gifted young cook returns to Chicago and a kitchen full of history. Family, food, and all the things that happen when the pressure gets too high.',
      },
      {
        id: 's66732',
        title: 'Stranger Things',
        year: 2016,
        meta: 'Sci-fi · Netflix',
        score: '4.2',
        tag: 'Epic worlds',
        image: tmdb('49WJfeN0moxb9IPfGn8AIqMGskD'),
        ref: 'https://www.themoviedb.org/tv/66732',
        description:
          'Bikes, basement games, and something very wrong beneath a small Indiana town. An ode to the stories we grew up with and the friends we never really leave behind.',
      },
      {
        id: 's1399',
        title: 'Game of Thrones',
        year: 2011,
        meta: 'Fantasy · 8 seasons',
        score: '4.3',
        tag: 'Epic worlds',
        image: tmdb('1XS1oqL89opfnbLl8WnZY1O1uJx'),
        ref: 'https://www.themoviedb.org/tv/1399',
        description:
          'Great houses, dangerous loyalties, and a throne nobody should want this badly. A sprawling world of political intrigue and spectacular fantasy.',
      },
    ],
    anime: [
      {
        id: 'a16498',
        title: 'Attack on Titan',
        year: 2013,
        meta: 'Action · Dark fantasy',
        score: '4.6',
        tag: 'Epic worlds',
        image: mal('10/47347'),
        ref: 'https://myanimelist.net/anime/16498',
        description:
          'Beyond the walls, everything changes. A story of freedom, survival, and the cost of knowing the truth, told on a scale that keeps getting bigger.',
      },
      {
        id: 'a1535',
        title: 'Death Note',
        year: 2006,
        meta: 'Thriller · 37 episodes',
        score: '4.4',
        tag: 'Mind-benders',
        image: mal('1079/138100'),
        ref: 'https://myanimelist.net/anime/1535',
        description:
          'One notebook. A terrible power. Two brilliant minds playing a game where every move matters. The ultimate “just one more episode” trap.',
      },
      {
        id: 'a40748',
        title: 'Jujutsu Kaisen',
        year: 2020,
        meta: 'Action · Supernatural',
        score: '4.3',
        tag: 'Epic worlds',
        image: mal('1171/109222'),
        ref: 'https://myanimelist.net/anime/40748',
        description:
          'Curses, impossible fights, and a cast you’ll get attached to far too quickly. A stylish descent into a world hiding just beneath our own.',
      },
      {
        id: 'a32281',
        title: 'Your Name.',
        year: 2016,
        meta: '1h 46m · Romance',
        score: '4.5',
        tag: 'Comfort picks',
        image: mal('5/87048'),
        ref: 'https://myanimelist.net/anime/32281',
        description:
          'Two lives separated by distance, connected by something neither can explain. Makoto Shinkai’s luminous story of timing, memory, and finding each other.',
      },
      {
        id: 'a5114',
        title: 'Fullmetal Alchemist: Brotherhood',
        year: 2009,
        meta: 'Adventure · 64 episodes',
        score: '4.6',
        tag: 'Must-watch',
        image: mal('1208/94745'),
        ref: 'https://myanimelist.net/anime/5114',
        description:
          'Two brothers searching for what they lost. A world built on equivalent exchange. An adventure with enormous heart and even bigger questions.',
      },
      {
        id: 'a38000',
        title: 'Demon Slayer',
        year: 2019,
        meta: 'Action · Fantasy',
        score: '4.3',
        tag: 'Epic worlds',
        image: mal('1286/99889'),
        ref: 'https://myanimelist.net/anime/38000',
        description:
          'A brother’s promise. A world of demons. A blade that carries hope through the darkness. Breathtaking animation meets a story rooted in family.',
      },
      {
        id: 'a11061',
        title: 'Hunter x Hunter',
        year: 2011,
        meta: 'Adventure · 148 episodes',
        score: '4.6',
        tag: 'Epic worlds',
        image: mal('1337/99013'),
        ref: 'https://myanimelist.net/anime/11061',
        description:
          'A search for a father becomes a journey through a world without easy answers. Friendship, strategy, and some of anime’s most unforgettable arcs.',
      },
      {
        id: 'a30276',
        title: 'One-Punch Man',
        year: 2015,
        meta: 'Action · Comedy',
        score: '4.3',
        tag: 'Comfort picks',
        image: mal('12/76049'),
        ref: 'https://myanimelist.net/anime/30276',
        description:
          'The strongest hero alive has one problem: he’s bored. Spectacular action meets wonderfully deadpan comedy in a world that takes superheroes a little too seriously.',
      },
    ],
  };
  const extraMovies = [
    ['m496243','Parasite',2019,'2h 13m · Thriller','4.6','Mind-benders','7IiTTgloJzvGI1TAYymCfbfl3vT','Two families. One house. A class-conscious thriller that keeps changing the rules.'],
    ['m680','Pulp Fiction',1994,'2h 34m · Crime','4.4','Must-watch','d5iIlFn5s0ImszYzBPb8JPIfbXD','Intertwined lives, unforgettable conversations, and a very unconventional timeline.'],
    ['m278','The Shawshank Redemption',1994,'2h 22m · Drama','4.7','Must-watch','q6y0Go1tsGEsmtFryDOJo3dEmqu','A friendship built on hope, one small act of defiance at a time.'],
    ['m545611','Everything Everywhere All at Once',2022,'2h 19m · Sci-fi','4.3','Mind-benders','w3LxiVYdWWRvEVdn5RYq6jIqkb1','Infinite possibilities. One complicated family. A wonderfully strange reminder to be kind.'],
    ['m313369','La La Land',2016,'2h 8m · Musical','4.2','Comfort picks','uDO8zWDhfWwoFdKS4fzkUJt0Rf0','A pianist and an actress chase their dreams through a beautifully bittersweet Los Angeles.'],
    ['m129','Spirited Away',2001,'2h 5m · Animation','4.6','Epic worlds','39wmItIWsg5sZMyRUHLkWBcuVCM','A mysterious bathhouse, a brave young girl, and a world that rewards a little courage.'],
  ];
  catalog.movies.push(...extraMovies.map(([id,title,year,meta,score,tag,image,description])=>({id,title,year,meta,score,tag,image:tmdb(image),description,ref:'https://www.themoviedb.org/movie/'+id.slice(1)})));
  Object.entries(catalog).forEach(([mode, titles]) => titles.forEach((t) => (t.mode = mode)));
  const allTitles = Object.values(catalog).flat();
  const byId = (id) => allTitles.find((t) => t.id === id);
  const esc = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
    );
  const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let stored = {};
  try {
    stored = JSON.parse(localStorage.getItem('mambo-experience-v1') || '{}') || {};
  } catch {}
  const record = (value) => (value && typeof value === 'object' && !Array.isArray(value) ? value : {});
  const validRatings = Object.fromEntries(
    Object.entries(record(stored.ratings))
      .filter(([id, n]) => byId(id) && Number.isFinite(n) && n >= 0 && n <= 5)
      .map(([id, n]) => [id, Math.round(n * 2) / 2]),
  );
  const validSaves = Object.fromEntries(
    Object.entries(record(stored.saves)).filter(
      ([id, s]) => byId(id) && s && typeof s.folder === 'string' && typeof s.status === 'string',
    ),
  );
  const state = {
    mode: Object.hasOwn(catalog, stored.mode) ? stored.mode : 'movies',
    motionPaused: stored.motionPaused === true,
    saves: validSaves,
    ratings: validRatings,
    episodes: record(stored.episodes),
    favorites: record(stored.favorites),
    picks: record(stored.picks),
    profile: { name: 'Your Mambo', handle: 'you', bio: 'A life in stories.', ...record(stored.profile) },
    reviews: record(stored.reviews),
    social: record(stored.social),
    messages: Array.isArray(stored.messages) ? stored.messages.filter(m => m && typeof m.text === 'string').slice(-100) : [],
    chatDraft: typeof stored.chatDraft === 'string' ? stored.chatDraft.slice(0,280) : '',
    folders: Array.isArray(stored.folders)
      ? [...new Set(stored.folders.filter((f) => typeof f === 'string' && f.trim()))].slice(0, 30)
      : ['Watchlist', 'Weekend binge', 'Mind-benders', 'Watch with someone'],
  };
  if (!state.folders.length) state.folders = ['Watchlist'];
  let reduced = motionQuery.matches || state.motionPaused || window.MamboPerformance?.lite;
  let activeFeature = 'track',
    activeFilter = 'All stories',
    discoveryQuery = '',
    attachedTitle = null,
    currentModal = '',
    lastFocus = null,
    toastTimer,
    swipeIndex = 0,
    modalTitleId,
    modalGeneration = 0,
    shareTimer,
    sharePreviewURL;
  function persist() {
    try {
      localStorage.setItem('mambo-experience-v1', JSON.stringify(state));
      renderProfile();
    } catch {
      toast('Storage is unavailable. Changes will last for this visit.');
    }
  }
  function toast(text) {
    $('#toast').textContent = text;
    $('#toast').classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 3100);
  }
  function syncMotion() {
    const previous = document.documentElement.dataset.motion;
    reduced = motionQuery.matches || state.motionPaused || window.MamboPerformance?.lite;
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'full';
    const button = $('#motionToggle');
    if (button) {
      button.setAttribute('aria-pressed', String(reduced));
      button.setAttribute(
        'aria-label',
        motionQuery.matches
          ? 'Motion reduced by system setting'
          : reduced
            ? 'Resume motion'
            : 'Pause motion',
      );
      button.title = motionQuery.matches
        ? 'System reduced motion is on. Your device setting takes priority.'
        : reduced
          ? 'Resume motion'
          : 'Pause motion';
    }
    if (reduced) {
      resetPointerEffects();
      endIntro();
      observer.disconnect();
      $$('.reveal').forEach((el) => el.classList.add('visible'));
      const swipeCard = $('#swipeCard');
      if (swipeCard) swipeCard.style.transform = '';
    }
    if (previous !== document.documentElement.dataset.motion)
      window.dispatchEvent(
        new CustomEvent('mambo:motion', { detail: { reduced, paused: state.motionPaused } }),
      );
  }
  function prepareImages(root = document) {
    const firstHero = $('#heroPosters img');
    $$('img', root).forEach((img) => {
      img.decoding = 'async';
      img.fetchPriority = img === firstHero ? 'high' : 'auto';
    });
  }
  function refreshSaved() {
    const count = Object.keys(state.saves).filter(byId).length;
    $('#savedCount').textContent = count;
    $$('[data-save]').forEach((b) => {
      const saved = !!state.saves[b.dataset.save];
      b.classList.toggle('saved', saved);
      b.textContent = saved ? '✓' : '+';
      b.setAttribute(
        'aria-label',
        `${saved ? 'Remove' : 'Save'} ${byId(b.dataset.save)?.title || 'title'} ${saved ? 'from' : 'to'} watchlist`,
      );
    });
  }
  function saveTitle(id, folder = 'Watchlist', force = false) {
    const title = byId(id);
    if (!title) return;
    if (state.saves[id] && !force) {
      delete state.saves[id];
      toast(`${title.title} removed from your watchlist.`);
    } else {
      state.saves[id] = { ...state.saves[id], folder, status: state.saves[id]?.status || 'Plan to watch' };
      toast(`${title.title} saved to ${folder}.`);
    }
    persist();
    refreshSaved();
  }
  function setMode(mode, announce = true) {
    if (!catalog[mode]) return;
    if (state.mode !== mode) { swipeHistory = []; swipeIndex = 0; }
    resetPointerEffects();
    state.mode = mode;
    document.documentElement.dataset.mode = mode;
    document.querySelector('meta[name=theme-color]').content = {
      movies: '#000000',
      series: '#000000',
      anime: '#000000',
    }[mode];
    $$('button[data-mode]').forEach((b) => {
      b.classList.toggle('active', b.dataset.mode === mode);
      b.setAttribute('aria-pressed', b.dataset.mode === mode);
    });
    $('#heroEdition').textContent = {
      movies: 'VOL. 01 / THE CINEMA EDITION',
      series: 'VOL. 02 / THE ONE-MORE-EPISODE EDITION',
      anime: 'VOL. 03 / THE ANIME AFTER-HOURS EDITION',
    }[mode];
    $('#discoveryCopy').textContent = {
      movies:
        'The mind-benders. The comfort rewatches. The “how have you not seen this?” films. Find your next favorite.',
      series:
        'The late-night cliffhangers. The Sunday-night rituals. The shows that live rent-free in your head. This is your next binge.',
      anime:
        'Beautiful worlds. Impossible feelings. Stories that stay with you long after the final arc. Find your next anime obsession.',
    }[mode];
    activeFilter = 'All stories';
    discoveryQuery = '';
    if ($('#discoverySearch')) $('#discoverySearch').value = '';
    renderHero();
    renderFilters();
    renderDiscovery();
    renderPhone();
    renderChat();
    persist();
    window.dispatchEvent(new CustomEvent('mambo:mode', { detail: mode }));
    if (announce)
      toast(
        `${{ movies: 'Cinema in sunset amber', series: 'Series in electric violet', anime: 'Anime in neon orchid' }[mode]}. Same you. New universe.`,
      );
  }
  function renderHero() {
    const items = catalog[state.mode],
      order = [0, 2, 3, 6, 1, 4, 5, 7];
    $('#heroPosters').innerHTML = order
      .map((i, index) => {
        const t = items[i % items.length];
        return `<button class="floating-poster" data-title="${t.id}" aria-label="Explore ${esc(t.title)}"><img src="${t.image}" alt="${esc(t.title)} poster" fetchpriority="${index === 0 ? 'high' : 'auto'}" decoding="async"></button>`;
      })
      .join('');
  }
  function renderFilters() {
    const focused = document.activeElement?.dataset.filter;
    const tags = ['All stories', ...new Set(catalog[state.mode].map((t) => t.tag))];
    $('#discoveryFilters').innerHTML = tags
      .map(
        (t) =>
          `<button class="filter-chip ${t === activeFilter ? 'active' : ''}" data-filter="${t}" aria-pressed="${t === activeFilter}">${t}</button>`,
      )
      .join('');
    if (focused)
      $$('[data-filter]')
        .find((b) => b.dataset.filter === focused)
        ?.focus({ preventScroll: true });
  }
  function renderDiscovery() {
    const query = discoveryQuery.trim().toLowerCase();
    const terms = query.split(/\s+/).filter(Boolean);
    const matches = catalog[state.mode].filter((t) => {
      const text = `${t.title} ${t.tag} ${t.meta}`.toLowerCase();
      return (
        (activeFilter === 'All stories' || t.tag === activeFilter) &&
        terms.every((term) => text.includes(term))
      );
    });
    const filtered = !!query || activeFilter !== 'All stories';
    const titles = matches;
    if (tiltElement && $('#discoveryGrid').contains(tiltElement)) resetPointerEffects();
    $('#discoveryGrid').innerHTML = titles.length
      ? titles
          .map(
            (t, i) =>
              `<article class="title-card"><button class="title-art" data-title="${t.id}" aria-label="Explore ${esc(t.title)}"><img src="${t.image}" alt="${esc(t.title)} poster" loading="lazy" decoding="async" fetchpriority="auto">${i === 0 || i === 3 ? '<span class="friend-pill"><span class="mini-avatar">m</span> EDITOR’S PICK</span>' : ''}</button><button class="save-title" data-save="${t.id}" aria-label="Save ${esc(t.title)}">+</button><h3>${esc(t.title)}</h3><div class="title-meta"><span>${t.year}</span><span class="score">★ ${t.score}</span></div></article>`,
          )
          .join('')
      : '<div class="discovery-empty"><h3>No stories found.</h3><p>Try another search or reset your filters.</p><button type="button" class="btn outline" data-action="discovery-reset">Reset search and filters</button></div>';
    const count = $('#discoveryResultCount');
    if (count)
      count.textContent = `${titles.length < matches.length ? `Showing ${titles.length} of ${matches.length}` : matches.length} ${matches.length === 1 ? 'story' : 'stories'}${filtered ? ' found' : ''} in ${state.mode}.`;
    if ($('#discoveryClear')) $('#discoveryClear').hidden = !discoveryQuery;
    refreshSaved();
  }
  function resetDiscovery(resetFilter = false) {
    discoveryQuery = '';
    const input = $('#discoverySearch');
    if (input) input.value = '';
    if (resetFilter) {
      activeFilter = 'All stories';
      renderFilters();
    }
    renderDiscovery();
    (input || $('[data-filter]', $('#discoveryFilters')))?.focus({ preventScroll: true });
  }
  const seasonTitles = {
    series: [
      'Good News About Hell',
      'Half Loop',
      'In Perpetuity',
      'The You You Are',
      'The Grim Barbarity of Optics and Design',
      'Hide and Seek',
      'Defiant Jazz',
      'What’s for Dinner?',
      'The We We Are',
    ],
    anime: [
      'To You, in 2000 Years',
      'That Day',
      'A Dim Light Amid Despair',
      'The Night of the Closing Ceremony',
      'First Battle',
      'The World the Girl Saw',
      'Small Blade',
      'I Can Hear His Heartbeat',
      'Whereabouts of His Left Arm',
      'Response',
      'Idol',
      'Wound',
      'Primal Desire',
      'Can’t Look into His Eyes Yet',
      'Special Operations Squad',
      'What Needs to Be Done Now',
      'Female Titan',
      'Forest of Giant Trees',
      'Bite',
      'Erwin Smith',
      'Crushing Blow',
      'The Defeated',
      'Smile',
      'Mercy',
      'Wall',
    ],
  };
  const progressFor = (mode) => {
    const title = catalog[mode][0];
    const total = seasonTitles[mode]?.length || 1;
    const completed = Array.isArray(state.episodes[title.id])
      ? state.episodes[title.id].filter((n) => Number.isInteger(n) && n >= 0 && n < total)
      : [];
    return { title, total, completed, count: completed.length };
  };
  function renderPhone() {
    if (tiltElement?.classList.contains('phone')) resetPointerEffects();
    const titles = catalog[state.mode],
      first = titles[0];
    let content = `<div class="phone-heading"><strong>MAMBO</strong><span class="phone-pill">${state.mode.toUpperCase()}</span></div>`;
    if (activeFeature === 'track') {
      const p = progressFor(state.mode);
      const isMovie = state.mode === 'movies';
      content += `<p class="phone-greet">A good day for a good story.</p><h3>Your kind of universe.</h3><div class="phone-subhead">${isMovie ? 'Tonight’s main character' : 'Your next episode'}<span>FOR YOU ↗</span></div><div class="phone-hero"><img src="${first.image}" alt="${esc(first.title)}"><div class="phone-hero-info"><strong>${esc(first.title)}</strong><p>${isMovie ? 'A little space. A lot of feeling.' : `SEASON 1 · ${p.count} / ${p.total} EPISODES`}</p>${!isMovie ? `<div class="progress"><div style="width:${(p.count / p.total) * 100}%"></div></div>` : ''}</div><button class="episode-plus" data-action="${isMovie ? 'log' : 'episode-plus'}" aria-label="${isMovie ? 'Log Interstellar' : 'Complete next episode'}">${isMovie ? '+ LOG' : p.count === p.total ? '✓' : '+1'}</button></div><div class="phone-subhead">${isMovie ? 'Made for your watchlist' : 'Next in your orbit'}<span>${isMovie ? 'EXPLORE' : 'VIEW ALL'} →</span></div><div class="mini-posters">${titles
        .slice(1, 4)
        .map(
          (t) =>
            `<button class="mini-poster" data-title="${t.id}" aria-label="Explore ${esc(t.title)}"><img src="${t.image}" alt="${esc(t.title)}" loading="lazy"><small>★ ${t.score}</small></button>`,
        )
        .join(
          '',
        )}</div>${!isMovie ? '<button class="text-button" data-action="episodes" style="font-size:8px;margin-top:14px;width:100%;justify-content:space-between">Open season tracker <span>↗</span></button>' : ''}`;
    } else if (activeFeature === 'chat') {
      content += `<p class="phone-greet">THE POST-CREDITS CLUB</p><h3>Same wavelength.</h3><div class="phone-chat"><div class="tiny-message">Okay. This one lives rent-free in my head.</div><div class="tiny-message sent">You need to experience this.<div class="tiny-attachment"><img src="${first.image}" alt="${esc(first.title)}"><div><strong>${esc(first.title)}</strong><p>${first.year} · ${state.mode}</p><button data-title="${first.id}">Explore title ↗</button></div></div></div><div class="tiny-message">Already on my watchlist. When are we watching?</div><button class="btn primary" data-action="chat-scroll" style="font-size:9px;margin-top:15px;min-height:38px;padding:10px">Try a real attachment ${icon('arrow')}</button><p style="font-size:8px;color:#777;text-align:center">SIMULATED CONVERSATION</p></div>`;
    } else {
      const prompts = [
        ['GO-TO RECOMMEND', 'The one I make everyone watch.'],
        ['RECENT OBSESSION', 'Still thinking about this.'],
        ['COMFORT WATCH', 'Feels like coming home.'],
        ['GUILTY PLEASURE', 'No explanations. No apologies.'],
      ];
      content += `<p class="phone-greet">A LITTLE MORE YOU</p><h3>My cinematic DNA.</h3>${prompts.map((p, i) => { const t = byId(state.picks[i]) || titles[i]; return `<button class="persona-preview" data-edit-pick="${i}" style="width:100%;text-align:left"><img src="${t.image}" alt="${esc(t.title)}"><div><div class="caps">${p[0]} ↗</div><strong>${esc(t.title)}</strong><p>${p[1]}</p></div></button>`; }).join('')}`;
    }
    const focused = $('#phoneUI').contains(document.activeElement)
      ? document.activeElement?.dataset.action
      : null;
    $('#phoneUI').innerHTML = content;
    prepareImages($('#phoneUI'));
    $$('[data-feature]').forEach((b) => {
      b.classList.toggle('active', b.dataset.feature === activeFeature);
      b.setAttribute('aria-pressed', b.dataset.feature === activeFeature);
    });
    if (focused)
      $$('[data-action]', $('#phoneUI'))
        .find((b) => b.dataset.action === focused)
        ?.focus({ preventScroll: true });
  }
  function chatAttachment(t, episode = '') {
    return `<div class="chat-media"><img src="${t.image}" alt="${esc(t.title)}" decoding="async" fetchpriority="auto"><div><strong>${esc(t.title)}</strong><p>${esc(episode || (t.mode === 'movies' ? 'MOVIE' : t.mode.toUpperCase()))}</p><button data-title="${t.id}">View title & save ↗</button></div></div>`;
  }
  function renderChat() {
    const t = catalog[state.mode][0];
    $('#chatMessages').innerHTML =
      `<div class="chat-date">THE POST-CREDITS CLUB · LOCAL DEMO</div><div class="bubble">Tell me you’ve seen this. I need someone to talk about that ending with.</div><div class="bubble mine">Already planning the rewatch.${chatAttachment(t)}<div class="message-time">9:41 PM · Demo</div></div><div class="bubble">This is why we’re friends.</div>` + state.messages.map(m => `<div class="bubble ${m.mine ? 'mine' : ''}">${esc(m.text)}${byId(m.title) ? chatAttachment(byId(m.title), m.episode) : ''}<div class="message-time">LOCAL DEMO</div></div>`).join('');
    $('#chatMessages').scrollTop = $('#chatMessages').scrollHeight;
  }
  function setMobileMenu(open, restoreFocus = false) {
    const menu = $('#mobileMenu'),
      toggle = $('#mobileMenuToggle');
    if (!menu || !toggle) return;
    const hadFocus = menu.contains(document.activeElement);
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (open) $('a[href]', menu)?.focus({ preventScroll: true });
    else if (restoreFocus && hadFocus) toggle.focus({ preventScroll: true });
  }
  function scrollChatIntoView() {
    const input = $('#chatInput');
    if (document.activeElement !== input || input.closest('[inert]')) return;
    const viewport = window.visualViewport,
      top = (viewport?.offsetTop || 0) + 12,
      bottom = (viewport?.offsetTop || 0) + (viewport?.height || window.innerHeight) - 12,
      rect = $('#chatForm').getBoundingClientRect();
    const delta = rect.bottom > bottom ? rect.bottom - bottom : rect.top < top ? rect.top - top : 0;
    if (Math.abs(delta) > 1) window.scrollBy({ top: delta, behavior: 'instant' });
  }
  function focusChat() {
    // Keep focus in the initiating gesture so iOS can open the keyboard.
    $('#chatInput').focus({ preventScroll: true });
    scrollChatIntoView();
  }
  function syncModalViewport() {
    const backdrop = $('#modalBackdrop');
    if (!backdrop.classList.contains('open')) {
      backdrop.style.removeProperty('--visual-height');
      backdrop.style.removeProperty('--visual-top');
      return;
    }
    const viewport = window.visualViewport,
      height = viewport?.height || window.innerHeight,
      top = viewport?.offsetTop || 0;
    backdrop.style.setProperty('--visual-height', `${height}px`);
    backdrop.style.setProperty('--visual-top', `${top}px`);
    const input = document.activeElement;
    if (!backdrop.contains(input) || !input.matches('input,select,textarea,[contenteditable="true"]')) return;
    const modal = $('#modal'),
      bounds = modal.getBoundingClientRect(),
      rect = input.getBoundingClientRect(),
      upper = Math.max(top, bounds.top) + 12,
      lower = Math.min(top + height, bounds.bottom) - 12;
    if (lower <= upper) return;
    const delta = rect.top < upper ? rect.top - upper : rect.bottom > lower ? rect.bottom - lower : 0;
    if (Math.abs(delta) > 1) modal.scrollTop += delta;
  }
  let viewportFrame = 0, chatViewportPending = false;
  function queueViewportUpdate(includeChat = false) {
    if (includeChat && document.activeElement === $('#chatInput')) chatViewportPending = true;
    if (viewportFrame) return;
    viewportFrame = requestAnimationFrame(() => {
      viewportFrame = 0;
      syncModalViewport();
      if (chatViewportPending) scrollChatIntoView();
      chatViewportPending = false;
    });
  }
  window.visualViewport?.addEventListener('resize', () => queueViewportUpdate(true), { passive: true });
  window.visualViewport?.addEventListener('scroll', () => queueViewportUpdate(), { passive: true });
  const ownedInert = new Set();
  function syncFocusLayers() {
    const backdrop = $('#modalBackdrop'),
      lounge = $('#loungeShell');
    const active = backdrop?.classList.contains('open')
      ? backdrop
      : lounge?.classList.contains('immersive')
        ? lounge
        : null;
    document.body.classList.toggle('locked', !!active);
    const blocked = new Set();
    if (active) {
      setMobileMenu(false, true);
      resetPointerEffects();
      // Walk outwards so a lounge inside main never makes its own ancestor inert.
      for (let branch = active; branch && branch !== document.body; branch = branch.parentElement) {
        for (const sibling of branch.parentElement?.children || []) {
          if (sibling !== branch && !sibling.matches('script,style,link')) blocked.add(sibling);
        }
      }
    }
    for (const element of ownedInert) {
      if (!blocked.has(element)) {
        element.inert = false;
        ownedInert.delete(element);
      }
    }
    for (const element of blocked) {
      if (!element.inert) {
        element.inert = true;
        ownedInert.add(element);
      }
    }
    syncModalViewport();
  }
  function clearSharePreview() {
    clearTimeout(shareTimer);
    if (sharePreviewURL) URL.revokeObjectURL(sharePreviewURL);
    sharePreviewURL = null;
  }
  function openModal(content, type = 'generic', preserveScroll = false) {
    const modal = $('#modal'),
      keepPosition = preserveScroll && currentModal === type && $('#modalBackdrop').classList.contains('open'),
      scrollTop = keepPosition ? modal.scrollTop : 0,
      focused = keepPosition ? document.activeElement : null,
      focusId = focused?.id;
    setMobileMenu(false, true);
    if (!$('#modalBackdrop').classList.contains('open')) lastFocus = document.activeElement;
    window.MamboWorld?.cancelPending();
    modalGeneration++;
    clearSharePreview();
    currentModal = type;
    $('#modalContent').innerHTML = content;
    prepareImages($('#modalContent'));
    $('#modalBackdrop').classList.add('open');
    syncFocusLayers();
    const nextFocus = focused?.isConnected ? focused : focusId ? document.getElementById(focusId) : null;
    (nextFocus && modal.contains(nextFocus) ? nextFocus : $('#modalClose')).focus({ preventScroll: true });
    modal.scrollTop = scrollTop;
  }
  function closeModal() {
    const wasOpen = $('#modalBackdrop').classList.contains('open');
    modalGeneration++;
    clearSharePreview();
    $('#modalBackdrop').classList.remove('open');
    currentModal = '';
    syncFocusLayers();
    if (
      wasOpen &&
      lastFocus?.isConnected &&
      !lastFocus.closest('[inert]') &&
      lastFocus.getClientRects().length
    )
      lastFocus.focus({ preventScroll: true });
    else if (wasOpen && $('#loungeShell').classList.contains('immersive'))
      $('button:not([disabled]),a[href],[tabindex="0"]', $('#loungeShell'))?.focus({ preventScroll: true });
  }
  function showTitle(id) {
    const t = byId(id);
    if (!t) return;
    modalTitleId = id;
    const rating = Number(state.ratings[id]) || 0;
    openModal(
      `<div class="modal-title-layout"><img class="modal-poster" src="${t.image}" alt="${esc(t.title)} poster"><div class="modal-detail"><p class="caps">YOUR ${t.mode === 'movies' ? 'CINEMA' : t.mode.toUpperCase()} UNIVERSE</p><h2 id="modalHeading">${esc(t.title)}</h2><p class="metadata">${t.year} &nbsp;·&nbsp; ${esc(t.meta)} &nbsp;·&nbsp; ★ ${t.score}<br><span style="display:block;margin-top:7px;opacity:.6">CURATED DEMO RATING · NOT A LIVE AGGREGATE</span></p><p class="synopsis">${esc(t.description)}</p><select class="folder-select" id="titleFolder" aria-label="Choose watchlist folder">${state.folders.map((f) => `<option ${state.saves[id]?.folder === f ? 'selected' : ''}>${esc(f)}</option>`).join('')}</select><button class="btn primary" id="titleSave">${state.saves[id] ? 'Update saved title' : 'Add to your watchlist'} ${icon('bookmark')}</button><div class="rating-label"><span>YOUR RATING <b id="ratingValue">${rating ? rating.toFixed(1) + ' / 5' : 'NOT RATED'}</b></span><button id="clearRating">Clear</button></div><div class="rating-stars" id="ratingStars" style="margin:10px 0 4px">${stars(rating)}</div><input type="range" id="ratingRange" aria-label="Your rating in half-star increments" min="0" max="5" step="0.5" value="${rating}" style="width:100%;accent-color:var(--accent);height:18px"><div style="display:flex;gap:8px;margin-top:18px"><select class="folder-select" id="titleStatus" aria-label="Watch status" style="margin:0;flex:1">${['Plan to watch', 'Watching', 'Completed', 'On hold', 'Dropped', 'Untrack'].map((s) => `<option ${state.saves[id]?.status === s ? 'selected' : ''}>${s}</option>`).join('')}</select><button class="round" data-action="share-current" aria-label="Create a story card for this title">${icon('arrow')}</button></div><a href="${t.ref}" target="_blank" rel="noopener noreferrer" class="modal-reference">Explore title reference on ${t.mode === 'anime' ? 'MyAnimeList' : 'TMDB'} ↗</a></div></div>`,
      'title',
    );
    const status = $('#titleStatus');
    const hub = document.createElement('div');
    hub.className = 'status-hub';
    hub.innerHTML = ['Watching', 'Completed', 'Plan to watch', 'On hold', 'Dropped', 'Untrack'].map(s => `<button data-status-choice="${s}" aria-pressed="${(state.saves[id]?.status || 'Untrack') === s}">${s}</button>`).join('');
    status.parentElement.before(hub);
    status.hidden = true;
    hub.onclick = e => { const b = e.target.closest('[data-status-choice]'); if (b) { status.value = b.dataset.statusChoice; status.dispatchEvent(new Event('change')); if (status.isConnected) hub.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)); } };
    $('.modal-detail').insertAdjacentHTML('beforeend', `<div class="title-extras">${episodeCounts[id] ? `<button class="btn outline" data-track-title="${id}">Track episodes +1</button>` : ''}<button class="btn outline" id="favoriteTitle" aria-pressed="${!!state.favorites[id]}">${state.favorites[id] ? '♥ Favorited' : '♡ Favorite'}</button></div>`);
    $('#favoriteTitle').onclick = e => { state.favorites[id] = !state.favorites[id]; e.currentTarget.textContent = state.favorites[id] ? '♥ Favorited' : '♡ Favorite'; e.currentTarget.setAttribute('aria-pressed', !!state.favorites[id]); persist(); };
    $('#titleSave').onclick = () => {
      saveTitle(id, $('#titleFolder').value, true);
      state.saves[id].status =
        $('#titleStatus').value === 'Untrack' ? 'Plan to watch' : $('#titleStatus').value;
      persist();
      $('#titleSave').innerHTML = `Saved to your universe ${icon('bookmark')}`;
    };
    $('#ratingRange').oninput = (e) => {
      const n = Number(e.target.value);
      state.ratings[id] = n;
      $('#ratingValue').textContent = n ? n.toFixed(1) + ' / 5' : 'NOT RATED';
      $('#ratingStars').innerHTML = stars(n);
      persist();
    };
    $('#clearRating').onclick = () => {
      $('#ratingRange').value = 0;
      $('#ratingRange').dispatchEvent(new Event('input'));
    };
    $('#titleStatus').onchange = (e) => {
      if (e.target.value === 'Untrack') {
        delete state.saves[id];
        delete state.ratings[id];
        delete state.episodes[id];
        persist();
        refreshSaved();
        renderPhone();
        showTitle(id);
        toast('Title untracked. Watch status, progress, and rating reset.');
      } else {
        state.saves[id] = { folder: $('#titleFolder').value, status: e.target.value };
        if (e.target.value === 'Completed' && episodeCounts[id]) state.episodes[id] = Array.from({length:tracked(id).total},(_,i)=>i);
        persist();
        renderPhone();
        refreshSaved();
        toast(`Marked ${e.target.value.toLowerCase()}.`);
      }
    };
  }
  function stars(rating) {
    return Array.from(
      { length: 5 },
      (_, i) =>
        `<span style="color:${rating >= i + 1 ? 'var(--bright)' : '#625850'};${rating === i + 0.5 ? 'background:linear-gradient(90deg,var(--bright) 50%,#625850 50%);background-clip:text;-webkit-text-fill-color:transparent' : ''}">★</span>`,
    ).join('');
  }
  let libraryFolder = 'All collections', libraryType = 'all', libraryRating = 0, libraryDecade = 'all', libraryGroup = 'all';
  function showLibrary(preserveScroll = false) {
    const valid = allTitles.filter(t => state.saves[t.id] || state.favorites[t.id]);
    const systems = ['All collections', 'Watched', 'Watchlist', 'Dropped', 'Favorites'];
    const filtered = valid.filter(t => {
      const s = state.saves[t.id], rating = Number(state.ratings[t.id] || t.score);
      const collection = libraryFolder === 'All collections' || (libraryFolder === 'Watched' && s?.status === 'Completed') || (libraryFolder === 'Watchlist' && s && !['Completed', 'Dropped'].includes(s.status)) || (libraryFolder === 'Dropped' && s?.status === 'Dropped') || (libraryFolder === 'Favorites' && state.favorites[t.id]) || (!systems.includes(libraryFolder) && s?.folder === libraryFolder);
      return collection && (libraryGroup === 'all' || s?.folder === libraryGroup) && (libraryType === 'all' || t.mode === libraryType) && rating >= libraryRating && (libraryDecade === 'all' || (libraryDecade === 'older' ? t.year < 1990 : Math.floor(t.year / 10) * 10 === Number(libraryDecade)));
    });
    openModal(
      `<div class="modal-standard"><p class="caps accent">YOUR LIBRARY · ON THIS DEVICE</p><h2 class="display" id="modalHeading">${esc(libraryFolder === 'All collections' ? 'CURATE YOUR CHAOS.' : libraryFolder.toUpperCase())}</h2><p class="intro-copy">Every watch. Every mood. All in one place.</p><div class="library-header"><div class="filter-row">${systems.map(f => `<button class="filter-chip ${libraryFolder === f ? 'active' : ''}" data-library-folder="${f}" aria-pressed="${libraryFolder === f}">${f}</button>`).join('')}</div></div><div class="library-filters"><label>MEDIA TYPE<select class="folder-select" id="libraryType"><option value="all">All types</option>${Object.keys(catalog).map(x => `<option value="${x}" ${libraryType === x ? 'selected' : ''}>${x}</option>`).join('')}</select></label><label>MINIMUM RATING<select class="folder-select" id="libraryRating">${[0,3,4].map(n => `<option value="${n}" ${libraryRating === n ? 'selected' : ''}>${n ? n+'★+' : 'Any rating'}</option>`).join('')}</select></label><label>DECADE<select class="folder-select" id="libraryDecade">${[['all','All years'],['2020','2020s'],['2010','2010s'],['2000','2000s'],['1990','1990s'],['older','Pre-1990s']].map(([v,l]) => `<option value="${v}" ${libraryDecade === v ? 'selected' : ''}>${l}</option>`).join('')}</select></label><label>SUB-GROUP<select class="folder-select" id="libraryGroup"><option value="all">All groups</option>${state.folders.map(f => `<option ${libraryGroup === f ? 'selected' : ''}>${esc(f)}</option>`).join('')}</select></label></div><form id="folderForm" style="display:flex;gap:10px;margin-bottom:25px"><input class="folder-select" id="newFolder" placeholder="New watchlist sub-group" aria-label="New collection name" maxlength="35" required style="margin:0"><button class="btn outline">Create</button></form><div class="collection-grid">${filtered.map(t => `<article class="collection-item"><button data-title="${t.id}" aria-label="Open ${esc(t.title)}"><img src="${t.image}" alt="${esc(t.title)}"><strong>${esc(t.title)}</strong></button><p>${esc(state.saves[t.id]?.status || 'Favorite')} · ${t.year}</p><span class="accent">★ ${state.ratings[t.id] || t.score}</span><button class="remove" data-remove="${t.id}" aria-label="Remove ${esc(t.title)} from library">×</button></article>`).join('')}</div>${!filtered.length ? '<div class="empty-state"><h3>Room for your next obsession.</h3><p>No titles match this collection and its filters.</p><button class="btn primary" data-action="swipe">Find a great watch ↗</button></div>' : ''}<p class="local-note">${filtered.length} titles · Filters use your rating, or the curated demo rating when unrated.</p></div>`,
      'library',
      preserveScroll,
    );
    for (const name of ['Type', 'Rating', 'Decade', 'Group']) $('#library' + name).onchange = e => {
      if (name === 'Type') libraryType = e.target.value;
      if (name === 'Rating') libraryRating = Number(e.target.value);
      if (name === 'Decade') libraryDecade = e.target.value;
      if (name === 'Group') libraryGroup = e.target.value;
      showLibrary(true);
    };
    $('#folderForm').onsubmit = (e) => {
      e.preventDefault();
      const name = $('#newFolder').value.trim();
      if (!name) return;
      if ([...systems, ...state.folders].some((f) => f.toLowerCase() === name.toLowerCase()))
        return toast('That collection already exists.');
      if (state.folders.length >= 30) return toast('This preview supports up to 30 collections.');
      state.folders.push(name);
      persist();
      libraryFolder = 'Watchlist'; libraryGroup = name;
      showLibrary(true);
      toast(`Collection created: ${name}`);
    };
  }
  // Bundled season snapshots, not a live episode database. Flat offsets preserve old S1 progress.
  const episodeCounts = { s95396:[9,10], s1396:[7,13,13,13,16], s70523:[10,8,8], s136315:[8,10,10,10], s66732:[8,9,8,9,8], s1399:[10,10,10,10,10,10,7,6], a16498:[25,12,22,30], a1535:[37], a40748:[24,23], a5114:[64], a38000:[26,7,11,11,8] };
  const severanceS2 = ['Hello, Ms. Cobel', 'Goodbye, Mrs. Selvig', 'Who Is Alive?', "Woe's Hollow", 'Trojan’s Horse', 'Attila', 'Chikhai Bardo', 'Sweet Vitriol', 'The After Hours', 'Cold Harbor'];
  let trackerId = 's95396', trackerSeason = 1, attachmentEpisode = '', swipeFolder = 'Watchlist', swipeHistory = [];
  function tracked(id) {
    const total = (episodeCounts[id] || []).reduce((a,b) => a+b,0);
    const done = [...new Set((Array.isArray(state.episodes[id]) ? state.episodes[id] : []).filter(n => Number.isInteger(n) && n >= 0 && n < total))];
    return { total, done };
  }
  function updateEpisode(id, n, checked) {
    const p = tracked(id);
    state.episodes[id] = checked ? [...new Set([...p.done,n])] : p.done.filter(x => x !== n);
    state.saves[id] = { folder:state.saves[id]?.folder || 'Watchlist', status:state.episodes[id].length === p.total ? 'Completed' : 'Watching' };
    persist(); refreshSaved(); renderPhone();
  }
  function nextEpisode(id = catalog[state.mode][0].id) {
    if (!episodeCounts[id]) return showTitle(id);
    const p = tracked(id), next = Array.from({length:p.total},(_,i)=>i).find(i=>!p.done.includes(i));
    if (next === undefined) return toast('All included episodes completed. Time for a rewatch?');
    updateEpisode(id,next,true);
    toast(next === p.total - 1 && p.done.length + 1 === p.total ? 'All included seasons complete!' : 'One more episode in your diary.');
    if (currentModal === 'episodes') showEpisodes(id, trackerSeason, true);
  }
  function showEpisodes(id = catalog[state.mode === 'movies' ? 'series' : state.mode][0].id, season = 1, preserve = false) {
    if (!episodeCounts[id]) return showTitle(id);
    trackerId = id; trackerSeason = season;
    const t = byId(id), counts = episodeCounts[id], p = tracked(id), offset = counts.slice(0,season-1).reduce((a,b)=>a+b,0);
    const count = season === 0 ? 0 : counts[season-1];
    const names = id === 's95396' ? (season === 1 ? seasonTitles.series : severanceS2) : id === 'a16498' && season === 1 ? seasonTitles.anime : [];
    openModal(`<div class="modal-standard"><p class="caps accent">IMMERSIVE TRACKER · ${t.mode.toUpperCase()}</p><h2 class="display" id="modalHeading">${esc(t.title)}</h2><p class="intro-copy">Your next chapter, right where you left it.</p><div class="tracker-summary"><span><b id="episodeCount">${p.done.length}</b> / ${p.total} episodes <span class="accent">${Math.round(p.done.length/p.total*100)}%</span></span><button class="btn primary" id="trackerPlus" ${p.done.length === p.total ? 'disabled' : ''}>+1 Episode</button></div><div class="progress" style="height:5px;margin-top:15px"><div id="episodeProgress" style="width:${p.done.length/p.total*100}%"></div></div><div class="season-tabs" role="group" aria-label="Select season">${[...counts.map((_,i)=>i+1),0].map(n=>`<button class="filter-chip ${season===n?'active':''}" data-season="${n}" aria-pressed="${season===n}">${n ? 'Season '+n : 'Specials S0'}</button>`).join('')}</div><div class="episode-list">${Array.from({length:count},(_,i)=>{
      let meta = 'Air date unavailable · Runtime unavailable';
      if (id === 's95396') {
        const date = new Date(season===1 ? '2022-02-18T12:00:00Z' : '2025-01-17T12:00:00Z');
        date.setUTCDate(date.getUTCDate() + (season===1 ? Math.max(0,i-1) : i)*7);
        const runtimes = season===1 ? [57,53,56,46,43,40,49,46,40] : [48,46,53,51,44,41,50,37,44,76];
        meta = date.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'})+' · '+runtimes[i]+' min';
      }
      return `<label class="episode-row"><input type="checkbox" data-track-episode="${offset+i}" ${p.done.includes(offset+i)?'checked':''}><div><strong>S${season} E${i+1} · ${esc(names[i] || 'Episode '+(i+1))}</strong><small>${meta}</small></div></label>`;
    }).join('')}${!count?'<p class="local-note">No specials are included in this catalog snapshot.</p>':''}</div><p class="local-note">Progress covers the seasons bundled in this preview. Upcoming releases and episode metadata are not synced live.</p><button class="btn outline" id="trackerShare">Share your progress ↗</button></div>`, 'episodes', preserve);
    $('#trackerPlus').onclick = () => nextEpisode(id);
    $('#trackerShare').onclick = () => showShare(id);
  }
  function showAttachments() {
    openModal(
      `<div class="modal-standard"><p class="caps accent">ADD TO THE CONVERSATION</p><h2 class="display" id="modalHeading">SEND THE WHOLE STORY.</h2><p class="intro-copy">Pick a movie, series, or anime. Add an optional episode tag before choosing.</p><input class="folder-select" id="attachmentEpisode" placeholder="Optional: S1 E5 · Episode title" aria-label="Episode tag" maxlength="90"><input class="folder-select" id="attachmentSearch" placeholder="Search titles..." aria-label="Search attachments"><div class="attachment-list">${allTitles.map((t) => `<button class="attachment-choice" data-attach-title="${t.id}"><img src="${t.image}" alt="${esc(t.title)} poster"><span>${esc(t.title)}</span></button>`).join('')}</div></div>`,
      'attachment',
    );
    $('#attachmentSearch').oninput = e => $$('.attachment-choice').forEach(b => b.hidden = !b.textContent.toLowerCase().includes(e.target.value.toLowerCase()));
  }
  function setAttachment(id) {
    attachedTitle = byId(id);
    if (!attachedTitle) return;
    attachmentEpisode = attachedTitle.mode === 'movies' ? '' : ($('#attachmentEpisode')?.value.trim() || '');
    $('#attachedPreview').innerHTML =
      `<span>${icon('film')} ${esc(attachedTitle.title)} ${esc(attachmentEpisode)}</span><button id="removeAttachment" aria-label="Remove attachment">×</button>`;
    $('#attachedPreview').classList.remove('hidden');
    $('#removeAttachment').onclick = () => {
      attachedTitle = null;
      $('#attachedPreview').classList.add('hidden');
    };
    closeModal();
    focusChat();
  }
  function showSwipe(preserveScroll = false) {
    const t = catalog[state.mode][swipeIndex % catalog[state.mode].length];
    const deck = catalog[state.mode];
    openModal(
      `<div class="modal-standard swipe-layout"><p class="caps accent">SLIDE TO DISCOVER ${state.mode.toUpperCase()}</p><h2 class="display" id="modalHeading">SUIPE</h2><div class="swipe-destination">SAVING TO <select class="folder-select" id="swipeFolder" aria-label="Swipe save destination">${state.folders.map(f=>`<option ${f===swipeFolder?'selected':''}>${esc(f)}</option>`).join('')}</select></div><div class="swipe-stack">${[2,1].map(n=>`<img class="stack-back" src="${deck[(swipeIndex+n)%deck.length].image}" alt="" aria-hidden="true">`).join('')}<div class="swipe-card" id="swipeCard" aria-label="Swipe ${esc(t.title)} left to skip or right to save"><img src="${t.image}" alt="${esc(t.title)}"><span class="friend-pill"><span class="mini-avatar">m</span><span class="mini-avatar">j</span> Friends saved · Demo</span></div></div><div class="swipe-details"><h3>${esc(t.title)}</h3><p><span class="accent">★ ${t.score}</span> · ${esc(t.meta)} · ${t.year}</p><button class="text-button" data-title="${t.id}">View full details ↗</button></div><div class="swipe-controls"><button class="round" id="swipeUndo" aria-label="Undo last swipe" ${!swipeHistory.length?'disabled':''}>↶</button><button class="round" id="swipeNo" aria-label="Pass on ${esc(t.title)}">×</button><button class="round yes" id="swipeYes" aria-label="Save ${esc(t.title)}">♥</button></div><p class="local-note">Swipe left to skip · Right to save<br>Curated demo deck · Left/right keyboard arrows work too.</p></div>`,
      'swipe',
      preserveScroll,
    );
    const generation = modalGeneration;
    let busy = false;
    const advance = (save) => {
      if (busy) return;
      busy = true;
      swipeHistory.push({ index:swipeIndex, id:t.id, previous:state.saves[t.id] ? {...state.saves[t.id]} : null, saved:save });
      if (save) saveTitle(t.id, swipeFolder, true);
      const card = $('#swipeCard');
      if (!reduced) {
        const travel = (card.offsetWidth + $('#modal').clientWidth) / 2 + 32;
        card.style.transform = `translateX(${save ? travel : -travel}px) rotate(${save ? 20 : -20}deg)`;
        card.style.opacity = 0;
      }
      setTimeout(() => {
        if (generation === modalGeneration && currentModal === 'swipe') {
          swipeIndex++;
          showSwipe(true);
        }
      }, reduced ? 0 : 250);
    };
    $('#swipeNo').onclick = () => advance(false);
    $('#swipeYes').onclick = () => advance(true);
    $('#swipeFolder').onchange = e => swipeFolder = e.target.value;
    $('#swipeUndo').onclick = () => {
      if (busy) return;
      const last = swipeHistory.pop(); if (!last) return;
      if (last.saved) { if (last.previous) state.saves[last.id] = last.previous; else delete state.saves[last.id]; persist(); refreshSaved(); }
      swipeIndex = last.index; showSwipe(true);
    };
    const card = $('#swipeCard');
    let startX = 0, startY = 0, swipePointer = null, horizontal = false;
    const resetSwipe = () => {
      const id = swipePointer;
      swipePointer = null;
      horizontal = false;
      startX = startY = 0;
      if (!busy) card.style.transform = '';
      if (id !== null && card.hasPointerCapture(id)) card.releasePointerCapture(id);
    };
    card.onpointerdown = (e) => {
      if (e.button !== 0 || busy) return;
      if (e.pointerType === 'touch' && !e.isPrimary) return resetSwipe();
      if (swipePointer !== null) return;
      swipePointer = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      card.setPointerCapture(e.pointerId);
    };
    card.onpointermove = (e) => {
      if (e.pointerId !== swipePointer || busy) return;
      const dx = e.clientX - startX, dy = e.clientY - startY;
      if (!horizontal && Math.hypot(dx, dy) > 10) {
        if (Math.abs(dy) >= Math.abs(dx)) return resetSwipe();
        horizontal = Math.abs(dx) > Math.abs(dy) * 1.25;
      }
      if (horizontal && !reduced)
        card.style.transform = `translateX(${dx * 0.7}px) rotate(${dx * 0.04}deg)`;
    };
    card.onpointerup = (e) => {
      if (e.pointerId !== swipePointer) return;
      const dx = e.clientX - startX,
        threshold = Math.max(40, Math.min(80, card.offsetWidth * .25)),
        commit = horizontal && Math.abs(dx) > threshold;
      resetSwipe();
      if (commit) advance(dx > 0);
    };
    card.onpointercancel = card.onlostpointercapture = (e) => {
      if (e.pointerId === swipePointer) resetSwipe();
    };
  }
  async function showShare(id) {
    const title = byId(id) || catalog[state.mode][0];
    const savedReview = record(state.reviews[title.id]);
    openModal(
      `<div class="modal-standard share-layout"><img class="share-preview" id="sharePreview" alt="Your generated MAMBO story card"><div class="share-options"><p class="caps accent">REVIEW SHARE CARD</p><h2 id="modalHeading">YOUR TAKE.<br>STORY-SIZED.</h2><p>Made for the camera roll. 9:16, in full HD.</p><label for="shareQuote">YOUR REVIEW · <span id="reviewLength">0</span>/5,000</label><textarea id="shareQuote" maxlength="5000" placeholder="What stayed with you? **Bold**, *italic*, and line breaks supported.">${esc(savedReview.text || 'Some stories stay with you.')}</textarea><label for="shareRating">YOUR RATING <span id="shareRatingValue">${state.ratings[title.id] || 0}</span> / 5</label><input id="shareRating" type="range" min="0" max="5" step="0.5" value="${state.ratings[title.id] || 0}" aria-label="Review rating in half stars"><label for="shareEpisode">EPISODE TAG (OPTIONAL)</label><input id="shareEpisode" maxlength="60" placeholder="S2 E9" value="${esc(savedReview.episode || '')}"><label class="spoiler-option"><input id="shareSpoiler" type="checkbox" ${savedReview.spoiler ? 'checked' : ''}>Contains spoilers · Shield my review</label><div id="reviewPreview" class="review-preview" aria-label="Formatted review preview"></div><button class="btn primary" id="downloadStory" disabled>Preparing your card…</button><small>Full review saved locally. Long reviews export as an excerpt.<br>1080 × 1920 PNG · Artwork belongs to its creator.</small></div></div>`,
      'share',
    );
    const generation = modalGeneration;
    const [image] = await Promise.all([
      loadImage(title.image).catch(() => null),
      new Promise((resolve) => {
        const finish = () => {
          clearTimeout(timer);
          resolve();
        };
        const timer = setTimeout(finish, 2500);
        document.fonts.ready.then(finish, finish);
      }),
    ]);
    if (generation !== modalGeneration || currentModal !== 'share') return;
    const quote = $('#shareQuote'),
      preview = $('#sharePreview'),
      download = $('#downloadStory');
    let revision = 0,
      readyBlob = null;
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const draw = () => {
      if (generation !== modalGeneration || currentModal !== 'share') return;
      const rendering = ++revision;
      const c = canvas.getContext('2d'),
        accent = getComputedStyle(document.documentElement).getPropertyValue('--bright').trim();
      c.fillStyle = '#08080a';
      c.fillRect(0, 0, 1080, 1920);
      if (image) {
        c.save();
        c.globalAlpha = 0.15;
        c.filter = 'blur(35px)';
        cover(c, image, 0, 0, 1080, 1920);
        c.restore();
      }
      const grad = c.createLinearGradient(0, 0, 1080, 1920);
      grad.addColorStop(0, '#08080a00');
      grad.addColorStop(1, '#08080a');
      c.fillStyle = grad;
      c.fillRect(0, 0, 1080, 1920);
      c.strokeStyle = '#ffffff35';
      c.strokeRect(45, 45, 990, 1830);
      c.fillStyle = accent;
      c.font = '600 26px "League Spartan",sans-serif';
      c.letterSpacing = '5px';
      c.fillText('A MAMBO MOMENT', 90, 135);
      c.letterSpacing = '0px';
      if (image) { c.save(); c.beginPath(); c.roundRect(285, 200, 510, 740, 28); c.clip(); cover(c, image, 285, 200, 510, 740); c.restore(); }
      else {
        c.fillStyle = accent;
        c.fillRect(285, 200, 510, 740);
        c.fillStyle = '#160b08';
        c.font = '700 68px "Outfit",sans-serif';
        wrapText(c, title.title, 320, 530, 440, 76, 3);
      }
      c.fillStyle = '#f3eee4';
      c.font = '700 66px "Outfit",sans-serif';
      const end = wrapText(c, title.title, 90, 1050, 900, 72, 2);
      c.font = '400 30px "DM Sans",sans-serif';
      c.fillStyle = '#999999';
      c.fillText(`${title.year}  /  ${title.mode.toUpperCase()}`, 90, end + 45);
      const rating = Math.max(0, Math.min(5, Number(state.ratings[title.id]) || 0));
      c.font = '48px sans-serif';
      for (let i=0;i<5;i++) {
        const x=90+i*58; c.fillStyle='#424244'; c.fillText('★',x,end+120);
        c.save(); c.beginPath(); c.rect(x,end+65,52*Math.max(0,Math.min(1,rating-i)),65); c.clip(); c.fillStyle=accent; c.fillText('★',x,end+120); c.restore();
      }
      c.font='500 25px "DM Sans",sans-serif'; c.fillStyle='#aaa'; c.fillText(rating ? rating.toFixed(1)+' / 5' : 'Not rated',410,end+113);
      const episode = $('#shareEpisode').value.trim();
      if (episode) { c.fillStyle='#252525'; c.beginPath(); c.roundRect(90,end+151,Math.min(900, c.measureText(episode).width+50),54,27); c.fill(); c.fillStyle='#fff'; c.fillText(episode,115,end+187,850); }
      c.fillStyle = '#e7e7e7';
      c.font = '400 34px "DM Sans",sans-serif';
      c.save();
      if ($('#shareSpoiler').checked) c.filter='blur(18px)';
      wrapText(c, quote.value.replace(/\*\*(.*?)\*\*/g,'$1').replace(/\*([^*]+)\*/g,'$1'), 90, 1440, 890, 47, 6);
      c.restore();
      if ($('#shareSpoiler').checked) { c.fillStyle='#191919'; c.beginPath(); c.roundRect(330,1510,420,80,40); c.fill(); c.fillStyle='#fff'; c.font='600 28px "League Spartan",sans-serif'; c.fillText('SPOILER SHIELD ON',375,1560); }
      c.font = '700 35px "DM Sans",sans-serif';
      c.fillStyle = '#f5eee3';
      c.fillText('MAMBO', 90, 1810);
      c.font = '400 19px "DM Sans",sans-serif';
      c.fillStyle = '#958879';
      c.textAlign = 'right';
      c.fillText('@'+state.profile.handle, 985, 1810);
      c.textAlign = 'left';
      canvas.toBlob((blob) => {
        if (generation !== modalGeneration || rendering !== revision) return;
        if (!blob) {
          download.textContent = 'Card unavailable';
          toast('Could not generate the card. Please try again.');
          return;
        }
        if (sharePreviewURL) URL.revokeObjectURL(sharePreviewURL);
        sharePreviewURL = URL.createObjectURL(blob);
        preview.src = sharePreviewURL;
        readyBlob = blob;
        download.disabled = false;
        download.innerHTML = `Download story card ${icon('arrow')}`;
      }, 'image/png');
    };
    const changed = () => {
      state.reviews[title.id] = { text:quote.value, episode:$('#shareEpisode').value.trim(), spoiler:$('#shareSpoiler').checked };
      state.ratings[title.id] = Number($('#shareRating').value);
      $('#shareRatingValue').textContent = $('#shareRating').value;
      $('#reviewLength').textContent = quote.value.length;
      const formatted = $('#reviewPreview');
      formatted.innerHTML = esc(quote.value).replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>');
      formatted.classList.toggle('spoiler', $('#shareSpoiler').checked);
      formatted.setAttribute('aria-hidden', String($('#shareSpoiler').checked));
      persist();
      revision++;
      readyBlob = null;
      download.disabled = true;
      download.textContent = 'Updating your card...';
      clearTimeout(shareTimer);
      shareTimer = setTimeout(draw, 200);
    };
    for (const control of [quote,$('#shareRating'),$('#shareEpisode'),$('#shareSpoiler')]) control.oninput = changed;
    changed();
    download.onclick = () => {
      if (!readyBlob) return;
      const url = URL.createObjectURL(readyBlob),
        a = document.createElement('a');
      a.href = url;
      a.download = `mambo-${title.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-story.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      toast('Your 1080 × 1920 story card is downloading.');
    };
  }
  const imageCache = new Map();
  function loadImage(url) {
    if (imageCache.has(url)) return imageCache.get(url);
    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      let settled = false;
      const finish = (error) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        img.onload = null;
        img.onerror = null;
        if (error) reject(error);
        else resolve(img);
      };
      const timer = setTimeout(() => finish(new Error('Artwork timed out')), 10000);
      img.decoding = 'async';
      img.onload = () => finish();
      img.onerror = () => finish(new Error('Artwork unavailable'));
      img.src = url;
    });
    imageCache.set(url, promise);
    promise.catch(() => {
      if (imageCache.get(url) === promise) imageCache.delete(url);
    });
    return promise;
  }
  function cover(c, img, x, y, w, h) {
    const scale = Math.max(w / img.width, h / img.height),
      sw = w / scale,
      sh = h / scale;
    c.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, x, y, w, h);
  }
  function wrapText(c, text, x, y, maxWidth, lineHeight, maxLines = Infinity) {
    const tokens = [];
    for (const word of text.split(/\s+/)) {
      let part = '';
      for (const char of word) {
        if (c.measureText(part + char).width > maxWidth) {
          tokens.push(part);
          part = char;
        } else part += char;
      }
      if (part) tokens.push(part);
    }
    const lines = [];
    let line = '';
    for (const word of tokens) {
      const test = line ? line + ' ' + word : word;
      if (c.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else line = test;
    }
    if (line) lines.push(line);
    const visible = lines.slice(0, maxLines);
    if (lines.length > maxLines) {
      let last = visible.at(-1);
      while (c.measureText(last + '…').width > maxWidth) last = last.slice(0, -1);
      visible[visible.length - 1] = last + '…';
    }
    visible.forEach((text, i) => c.fillText(text, x, y + i * lineHeight));
    return y + Math.max(0, visible.length - 1) * lineHeight;
  }
  let audioContext,
    masterGain,
    soundOn = false,
    audioTimer;
  const oscillators = [];
  async function toggleSound() {
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        masterGain = audioContext.createGain();
        masterGain.gain.value = 0;
        masterGain.connect(audioContext.destination);
        [130.81, 164.81, 196, 261.63].forEach((frequency, i) => {
          const osc = audioContext.createOscillator(),
            gain = audioContext.createGain();
          osc.type = 'sine';
          osc.frequency.value = frequency;
          osc.detune.value = i % 2 ? 3 : -3;
          gain.gain.value = 0.035 / (i + 1);
          osc.connect(gain).connect(masterGain);
          osc.start();
          oscillators.push(osc);
        });
      }
      await audioContext.resume();
      soundOn = !soundOn;
      masterGain.gain.cancelScheduledValues(audioContext.currentTime);
      masterGain.gain.setTargetAtTime(soundOn ? 0.45 : 0, audioContext.currentTime, 0.8);
      $('#soundToggle').classList.toggle('playing', soundOn);
      $('#soundToggle').setAttribute('aria-pressed', String(soundOn));
      $('#soundToggle').setAttribute('aria-label', `Turn ambient sound ${soundOn ? 'off' : 'on'}`);
      $('#soundToggle').title = `Ambient sound ${soundOn ? 'on' : 'off'}`;
      $('#loungeSound').setAttribute('aria-pressed', soundOn);
      window.dispatchEvent(new CustomEvent('mambo:sound', { detail: { playing: soundOn } }));
      if (audioTimer) clearInterval(audioTimer);
      if (soundOn) {
        let chord = 0;
        audioTimer = setInterval(() => {
          const chords = [
            [130.81, 164.81, 196, 261.63],
            [110, 130.81, 164.81, 220],
            [87.31, 130.81, 174.61, 220],
            [98, 123.47, 146.83, 196],
          ];
          chord = (chord + 1) % 4;
          oscillators.forEach((osc, i) =>
            osc.frequency.setTargetAtTime(chords[chord][i], audioContext.currentTime, 2),
          );
        }, 7000);
      }
      toast(`Ambient soundtrack ${soundOn ? 'on. Settle in.' : 'off.'}`);
    } catch {
      toast('Audio is not available in this browser.');
    }
  }
  const introTimers = [];
  function endIntro() {
    introTimers.splice(0).forEach(clearTimeout);
    $('#intro').classList.add('leaving');
    if (reduced) $('#intro').classList.add('hidden');
    else introTimers.push(setTimeout(() => $('#intro').classList.add('hidden'), 1150));
  }
  function playIntro() {
    if (reduced) return endIntro();
    introTimers.splice(0).forEach(clearTimeout);
    const intro = $('#intro');
    intro.classList.remove('hidden', 'leaving');
    $('#introWord').textContent = '3';
    $('#introWord').style.fontSize = '';
    introTimers.push(
      setTimeout(() => ($('#introWord').textContent = '2'), 650),
      setTimeout(() => ($('#introWord').textContent = '1'), 1300),
      setTimeout(() => {
        $('#introWord').textContent = 'MAMBO';
        $('#introWord').style.fontSize = 'clamp(70px,11vw,135px)';
      }, 1900),
      setTimeout(endIntro, 2700),
    );
  }
  const personaPrompts = [
    ['GO-TO RECOMMEND', "What's the #1 movie or show you force all your friends to watch?"],
    ['RECENT OBSESSION', "What's the last thing you watched that completely blew your mind?"],
    ['COMFORT WATCH', "What's your cozy pick when you need a comfortable rewatch?"],
    ['GUILTY PLEASURE', "What's a pick that critics hate, but you secretly love?"],
  ];
  let profileRenderKey = '';
  function renderProfile() {
    const grid = $('#personaGrid'); if (!grid) return;
    const key = JSON.stringify([state.mode,state.profile,state.picks]);
    if (key === profileRenderKey) return;
    profileRenderKey = key;
    $('#profileName').textContent = state.profile.name;
    $('#profileHandle').textContent = '@'+state.profile.handle;
    $('#profileBio').textContent = state.profile.bio;
    grid.innerHTML = personaPrompts.map(([label,question],i) => {
      const t = byId(state.picks[i]) || catalog[state.mode][i];
      return `<article class="persona-card"><h3 class="caps">${label}</h3><button class="edit-pick" data-edit-pick="${i}" aria-label="Edit ${label.toLowerCase()}"><svg viewBox="0 0 24 24"><path d="m15 5 4 4M4 20l4-1L20 7l-4-4L4 15v5Z"/></svg></button><p>${esc(question)}</p><button class="persona-poster" data-title="${t.id}"><img src="${t.image}" alt="${esc(t.title)}" loading="lazy"><strong>${esc(t.title)}</strong></button></article>`;
    }).join('');
  }
  function editPick(index) {
    openModal(`<div class="modal-standard"><p class="caps accent">YOUR CINEMATIC DNA</p><h2 class="display" id="modalHeading">${personaPrompts[index][0]}</h2><p class="intro-copy">${esc(personaPrompts[index][1])}</p><input class="folder-select" id="pickSearch" placeholder="Find your pick..." aria-label="Search persona picks"><div class="attachment-list" id="pickResults">${allTitles.map(t=>`<button class="attachment-choice" data-pick="${t.id}"><img src="${t.image}" alt="${esc(t.title)}"><span>${esc(t.title)}</span></button>`).join('')}</div><p class="local-note" id="pickEmpty" hidden>No titles match. Try another search.</p></div>`, 'persona');
    $('#pickSearch').oninput = e => { const choices=$$('[data-pick]'); choices.forEach(b=>b.hidden=!b.textContent.toLowerCase().includes(e.target.value.toLowerCase())); $('#pickEmpty').hidden=choices.some(b=>!b.hidden); };
    $('#pickResults').onclick = e => { const b=e.target.closest('[data-pick]'); if (!b) return; state.picks[index]=b.dataset.pick; persist(); renderPhone(); closeModal(); toast('Your personality, updated.'); };
  }
  function editProfile() {
    openModal(`<div class="modal-standard"><p class="caps accent">MAKE IT YOURS · LOCAL PROFILE</p><h2 class="display" id="modalHeading">EDIT PROFILE</h2><form id="profileForm" class="profile-form"><label>DISPLAY NAME<input name="name" required maxlength="40" value="${esc(state.profile.name)}"></label><label>HANDLE<input name="handle" required pattern="[A-Za-z0-9_]{1,24}" maxlength="24" title="Letters, numbers, and underscores only" value="${esc(state.profile.handle)}"></label><label>BIO<input name="bio" maxlength="140" value="${esc(state.profile.bio)}"></label><button class="btn primary">Save profile</button></form></div>`, 'profile');
    $('#profileForm').onsubmit = e => { e.preventDefault(); const f=new FormData(e.target); const name=f.get('name').trim(); if(!name) return toast('Please enter a display name.'); state.profile={name,handle:f.get('handle').trim(),bio:f.get('bio').trim()}; persist(); closeModal(); toast('Profile saved on this device.'); };
  }
  const actions = {
    library: () => showLibrary(),
    swipe: () => showSwipe(),
    tour: () => window.MamboWorld?.startTour(true),
    episodes: () => showEpisodes(),
    'episode-plus': () => nextEpisode(),
    'edit-profile': editProfile,
    log: () => showTitle(catalog[state.mode][0].id),
    attach: showAttachments,
    share: () => showShare(),
    'share-current': () => showShare(modalTitleId),
    'discovery-reset': () => resetDiscovery(true),
    'chat-scroll': focusChat,
  };
  $('#motionToggle')?.addEventListener('click', () => {
    state.motionPaused = !reduced;
    persist();
    syncMotion();
    if (motionQuery.matches) toast('Motion stays reduced while your system preference is enabled.');
  });
  motionQuery.addEventListener('change', syncMotion);
  window.addEventListener('mambo:performance', syncMotion);
  const searchDiscovery = (e) => {
    if (discoveryQuery === e.target.value) return;
    discoveryQuery = e.target.value;
    renderDiscovery();
  };
  $('#discoverySearch')?.addEventListener('input', searchDiscovery);
  $('#discoverySearch')?.addEventListener('search', searchDiscovery);
  $('#discoveryClear')?.addEventListener('click', () => resetDiscovery());
  $('#mobileMenuToggle')?.addEventListener('click', () => setMobileMenu($('#mobileMenu')?.hidden !== false));
  document.addEventListener('click', (e) => {
    const menu = $('#mobileMenu'),
      toggle = $('#mobileMenuToggle');
    if (!menu || menu.hidden || toggle?.contains(e.target)) return;
    const link = e.target.closest('a[href]');
    if (link && menu.contains(link)) {
      setMobileMenu(false, true);
      const url = new URL(link.href, location.href);
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search
      )
        return;
      let destination;
      try {
        destination = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      } catch {}
      if (destination) {
        if (!destination.hasAttribute('tabindex')) {
          destination.setAttribute('tabindex', '-1');
          destination.addEventListener(
            'blur',
            () => {
              if (destination.getAttribute('tabindex') === '-1') destination.removeAttribute('tabindex');
            },
            { once: true },
          );
        }
        destination.focus({ preventScroll: true });
      }
    } else if (!menu.contains(e.target)) setMobileMenu(false, true);
  });
  document.addEventListener('focusin', (e) => {
    const menu = $('#mobileMenu');
    if (menu && !menu.hidden && !menu.contains(e.target) && !$('#mobileMenuToggle')?.contains(e.target))
      setMobileMenu(false);
    if ($('#modalBackdrop').contains(e.target)) queueViewportUpdate();
  });
  document.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.mode) setMode(b.dataset.mode);
    else if (b.dataset.editPick !== undefined) editPick(Number(b.dataset.editPick));
    else if (b.dataset.trackTitle) showEpisodes(b.dataset.trackTitle);
    else if (b.dataset.season !== undefined) showEpisodes(trackerId, Number(b.dataset.season), true);
    else if (b.dataset.title) showTitle(b.dataset.title);
    else if (b.dataset.save) saveTitle(b.dataset.save);
    else if (b.dataset.feature) {
      activeFeature = b.dataset.feature;
      renderPhone();
    } else if (b.dataset.filter) {
      activeFilter = b.dataset.filter;
      renderFilters();
      renderDiscovery();
    } else if (b.dataset.action) actions[b.dataset.action]?.();
    else if (b.dataset.libraryFolder) {
      libraryFolder = b.dataset.libraryFolder;
      libraryGroup = 'all';
      showLibrary(true);
    } else if (b.dataset.remove) {
      delete state.saves[b.dataset.remove];
      delete state.favorites[b.dataset.remove];
      persist();
      refreshSaved();
      showLibrary(true);
    } else if (b.dataset.attachTitle) setAttachment(b.dataset.attachTitle);
  });
  document.addEventListener('change', (e) => {
    if (!e.target.matches('[data-track-episode]')) return;
    const n = Number(e.target.dataset.trackEpisode);
    updateEpisode(trackerId, n, e.target.checked);
    const p = tracked(trackerId);
    $('#episodeCount').textContent=p.done.length;
    $('#episodeProgress').style.width=p.done.length/p.total*100+'%';
    $('#trackerPlus').disabled=p.done.length===p.total;
    $('.tracker-summary .accent').textContent=Math.round(p.done.length/p.total*100)+'%';
  });
  $('#chatForm').onsubmit = (e) => {
    e.preventDefault();
    const input = $('#chatInput'),
      text = input.value.trim();
    if (!text && !attachedTitle) {
      toast('Write a message or attach a title first.');
      return;
    }
    const title = attachedTitle;
    state.messages.push({mine:true,text:text || 'You need to see this.',title:title?.id,episode:attachmentEpisode});
    state.messages.push({mine:false,text:title ? `${title.title}? Adding that to the list. (Demo reply)` : 'The post-credits conversation is the best part. (Demo reply)'});
    state.messages = state.messages.slice(-100);
    state.chatDraft = '';
    persist(); renderChat();
    input.value = '';
    attachedTitle = null;
    attachmentEpisode = '';
    $('#attachedPreview').classList.add('hidden');
    $('#chatMessages').scrollTop = $('#chatMessages').scrollHeight;
  };
  $('#chatInput').value = state.chatDraft;
  $('#chatInput').addEventListener('input', e => { state.chatDraft = e.target.value; persist(); });
  $('#focusChat').onclick = focusChat;
  $('#modalClose').onclick = closeModal;
  $('#modalBackdrop').onclick = (e) => {
    if (e.target === $('#modalBackdrop')) closeModal();
  };
  $('#soundToggle').onclick = toggleSound;
  $('#loungeSound').onclick = toggleSound;
  $('#skipIntro').onclick = endIntro;
  $('#replayIntro').onclick = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    playIntro();
  };
  document.addEventListener('keydown', (e) => {
    if (currentModal === 'swipe' && !e.target.matches('input,select,textarea') && ['ArrowLeft','ArrowRight'].includes(e.key)) {
      e.preventDefault(); $(e.key === 'ArrowLeft' ? '#swipeNo' : '#swipeYes')?.click();
    }
    if (e.key === 'Escape') {
      if (currentModal) {
        e.preventDefault();
        closeModal();
      } else if ($('#loungeShell').classList.contains('immersive')) {
        e.preventDefault();
        window.MamboWorld?.expand(false);
      } else if ($('#mobileMenu') && !$('#mobileMenu').hidden) {
        e.preventDefault();
        setMobileMenu(false, true);
      } else endIntro();
    }
    if (e.key === 'Tab' && currentModal) {
      const focusable = $$('button,a[href],input,select,textarea,[tabindex]', $('#modal')).filter(
        (el) =>
          el.tabIndex >= 0 && !el.matches(':disabled') && !el.closest('[inert]') && el.getClientRects().length,
      );
      const first = focusable[0],
        last = focusable[focusable.length - 1];
      if (!first) {
        e.preventDefault();
        $('#modalClose').focus({ preventScroll: true });
      } else if (
        e.shiftKey && (document.activeElement === first || !focusable.includes(document.activeElement))
      ) {
        e.preventDefault();
        last.focus({ preventScroll: true });
      } else if (
        !e.shiftKey && (document.activeElement === last || !focusable.includes(document.activeElement))
      ) {
        e.preventDefault();
        first.focus({ preventScroll: true });
      }
    }
  });
  const home = $('#home'),
    posterStage = $('#heroPosters'),
    cursorLabel = $('#cursorLabel');
  let heroVisible = true,
    pointerFrame = 0,
    pointerDirty = false,
    pointerTarget = null,
    pointerX = 0,
    pointerY = 0,
    tiltElement = null,
    tiltBounds = null,
    heroX = 0,
    heroY = 0,
    heroTargetX = 0,
    heroTargetY = 0,
    lastPointerTime = 0;
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  function neutralTilt(element) {
    if (!element) return;
    element.style.setProperty('--tilt-x', '0deg');
    element.style.setProperty('--tilt-y', '0deg');
    element.style.setProperty('--shine-x', '50%');
    element.style.setProperty('--shine-y', '50%');
  }
  function resetPointerEffects() {
    cancelAnimationFrame(pointerFrame);
    pointerFrame = 0;
    pointerDirty = false;
    pointerTarget = null;
    lastPointerTime = 0;
    neutralTilt(tiltElement);
    tiltElement = null;
    tiltBounds = null;
    heroX = heroY = heroTargetX = heroTargetY = 0;
    posterStage.style.transform = '';
    cursorLabel.style.opacity = '0';
  }
  function queuePointerFrame() {
    if (!pointerFrame && !reduced && finePointer.matches && !document.hidden)
      pointerFrame = requestAnimationFrame(drawPointerFrame);
  }
  function drawPointerFrame(time) {
    pointerFrame = 0;
    if (reduced || !finePointer.matches || document.hidden) return resetPointerEffects();
    if (pointerDirty) {
      const target =
        pointerTarget?.isConnected && !pointerTarget.closest('[inert]') ? pointerTarget : null;
      const nextTilt = target?.closest('.title-card, .phone');
      const tiltRect = nextTilt === tiltElement ? tiltBounds : nextTilt?.getBoundingClientRect();
      const heroRect =
        heroVisible && target && home.contains(target) ? home.getBoundingClientRect() : null;
      heroTargetX = heroRect?.width
        ? clamp(((pointerX - heroRect.left) / heroRect.width) * 2 - 1, -1, 1)
        : 0;
      heroTargetY = heroRect?.height
        ? clamp(((pointerY - heroRect.top) / heroRect.height) * 2 - 1, -1, 1)
        : 0;
      if (tiltElement !== nextTilt) neutralTilt(tiltElement);
      tiltElement = nextTilt || null;
      tiltBounds = tiltRect || null;
      if (tiltRect?.width && tiltRect.height) {
        const x = clamp((pointerX - tiltRect.left) / tiltRect.width, 0, 1),
          y = clamp((pointerY - tiltRect.top) / tiltRect.height, 0, 1);
        tiltElement.style.setProperty('--tilt-x', `${((0.5 - y) * 12).toFixed(2)}deg`);
        tiltElement.style.setProperty('--tilt-y', `${((x - 0.5) * 12).toFixed(2)}deg`);
        tiltElement.style.setProperty('--shine-x', `${(x * 100).toFixed(2)}%`);
        tiltElement.style.setProperty('--shine-y', `${(y * 100).toFixed(2)}%`);
      }
      const showCursor = heroVisible && !!target?.closest('.floating-poster');
      cursorLabel.style.opacity = showCursor ? '1' : '0';
      if (showCursor) {
        cursorLabel.style.left = `${pointerX}px`;
        cursorLabel.style.top = `${pointerY}px`;
      }
      pointerDirty = false;
    }
    const blend = 1 - Math.exp(-Math.min(lastPointerTime ? time - lastPointerTime : 16, 50) / 75);
    lastPointerTime = time;
    const oldX = heroX,
      oldY = heroY;
    heroX += (heroTargetX - heroX) * blend;
    heroY += (heroTargetY - heroY) * blend;
    if (Math.abs(heroTargetX - heroX) < 0.001) heroX = heroTargetX;
    if (Math.abs(heroTargetY - heroY) < 0.001) heroY = heroTargetY;
    if (oldX !== heroX || oldY !== heroY)
      posterStage.style.transform =
        heroX || heroY
          ? `translate3d(${(heroX * 12).toFixed(3)}px,${(heroY * 8).toFixed(3)}px,0) rotateY(${(heroX * 2).toFixed(3)}deg)`
          : '';
    // Continue only while settling toward a new pointer position.
    if (heroX !== heroTargetX || heroY !== heroTargetY) queuePointerFrame();
    else lastPointerTime = 0;
  }
  document.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType === 'touch' || reduced || !finePointer.matches) return;
      pointerTarget = e.target instanceof Element ? e.target : null;
      pointerX = e.clientX;
      pointerY = e.clientY;
      pointerDirty = true;
      queuePointerFrame();
    },
    { passive: true },
  );
  document.addEventListener(
    'pointerout',
    (e) => {
      if (e.pointerType === 'touch' || !pointerTarget) return;
      pointerTarget = e.relatedTarget instanceof Element ? e.relatedTarget : null;
      pointerDirty = true;
      queuePointerFrame();
    },
    { passive: true },
  );
  finePointer.addEventListener('change', resetPointerEffects);
  window.addEventListener('blur', resetPointerEffects);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  $$('.reveal').forEach((el) => observer.observe(el));
  const heroObserver = new IntersectionObserver(
    ([e]) => {
      heroVisible = e.isIntersecting;
      $('#floatingMode').classList.toggle('show', !heroVisible);
      if (!heroVisible) resetPointerEffects();
    },
    { threshold: 0.08 },
  );
  heroObserver.observe(home);
  const chatObserver = new IntersectionObserver(
    ([entry]) => document.body.classList.toggle('chat-in-view', entry.isIntersecting),
    { rootMargin: '0px 0px 80px 0px' },
  );
  chatObserver.observe($('.chat-card'));
  const scrollProgress = $('#scrollProgress');
  let scrollFrame = 0;
  function queueScrollProgress() {
    if (!scrollProgress || scrollFrame || document.hidden) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      scrollProgress.style.transform = `scaleX(${height > 0 ? clamp(window.scrollY / height, 0, 1) : 0})`;
      const active = ['home','app','people','profile'].filter(id => document.getElementById(id).getBoundingClientRect().top < window.innerHeight * .45).pop() || 'home';
      $$('.app-bottom-nav a').forEach(a => { const selected = a.hash === '#'+active; a.classList.toggle('active',selected); if (selected) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); });
    });
  }
  window.addEventListener(
    'scroll',
    () => {
      if (pointerTarget || pointerFrame || tiltElement) resetPointerEffects();
      queueScrollProgress();
    },
    { passive: true },
  );
  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) setMobileMenu(false);
    queueViewportUpdate(true);
    resetPointerEffects();
    queueScrollProgress();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      resetPointerEffects();
      cancelAnimationFrame(scrollFrame);
      scrollFrame = 0;
    } else queueScrollProgress();
  });
  if (scrollProgress) {
    scrollProgress.setAttribute('aria-hidden', 'true');
    new ResizeObserver(queueScrollProgress).observe(document.body);
    queueScrollProgress();
  }
  document.addEventListener(
    'error',
    (e) => {
      if (e.target instanceof HTMLImageElement && !e.target.dataset.fallback) {
        e.target.dataset.fallback = '1';
        const name = e.target.alt.replace(' poster', '');
        e.target.src =
          'data:image/svg+xml,' +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#5a3323"/><stop offset="1" stop-color="#151018"/></linearGradient></defs><path fill="url(#g)" d="M0 0h400v600H0z"/><circle cx="200" cy="200" r="110" fill="none" stroke="#ffffff22"/><text x="200" y="320" fill="#f2e6d4" text-anchor="middle" font-family="sans-serif" font-size="22">${esc(name.slice(0, 28))}</text><text x="200" y="545" fill="#bca18d" text-anchor="middle" font-family="sans-serif" font-size="14" letter-spacing="5">MAMBO</text></svg>`,
          );
      }
    },
    true,
  );
  function showGallery() {
    openModal(
      `<div class="modal-standard"><p class="caps accent">YOUR OWN LITTLE HALL OF FAME</p><h2 class="display" id="modalHeading">THE REVIEW WALL.</h2><p class="intro-copy">The stories that stay. Choose a poster to rate, save, or make a story card.</p><div class="attachment-list" style="grid-template-columns:repeat(3,1fr)">${catalog[
        state.mode
      ]
        .slice(1, 4)
        .map(
          (t) =>
            `<button class="attachment-choice" data-title="${t.id}"><img src="${t.image}" alt="${esc(t.title)}"><span>${esc(t.title)}</span></button>`,
        )
        .join('')}</div></div>`,
      'gallery',
    );
  }
  window.Mambo = {
    persist,
    saveTitle,
    openModal,
    showSwipe,
    state,
    catalog,
    byId,
    toast,
    showTitle,
    showShare,
    showLibrary,
    showEpisodes,
    showGallery,
    toggleSound,
    get reduced() {
      return reduced;
    },
    loadImage,
    cover,
    closeModal,
    setMode,
    syncFocusLayers,
  };
  $('#chatMessages').setAttribute('role', 'log');
  $('#chatMessages').setAttribute('aria-live', 'polite');
  $('#chatMessages').setAttribute('aria-relevant', 'additions text');
  $('#chatMessages').setAttribute('aria-atomic', 'false');
  setMobileMenu(false);
  prepareImages();
  syncMotion();
  setMode(state.mode, false);
  syncFocusLayers();
  if (!reduced) playIntro();
})();
