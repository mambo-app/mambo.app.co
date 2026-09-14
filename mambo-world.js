(() => {
  'use strict';
  const $ = (s) => document.querySelector(s),
    A = window.Mambo,
    P = window.MamboPerformance,
    shell = $('#loungeShell'),
    host = $('#loungeCanvas');
  let worldReady = false,
    pendingTour = false,
    pendingExpanded = false,
    activeView = 0,
    playing = false,
    tourElapsed = 0,
    visible = false,
    needsRender = true,
    renderer,
    scene,
    camera,
    THREE;
  let desiredPosition,
    desiredTarget,
    currentTarget,
    drag = null,
    isImmersive = false,
    lastTime = 0,
    textureGeneration = 0,
    screenTexture,
    phoneTexture,
    signTexture;
  let restoreFocus = null,
    immersivePlaceholder = null;
  let initPromise, frame = 0, ambientTimer = 0, dust, orbitArc, recordMark, rendering = false;
  let hemisphere, keyLight, targetPalette, paletteMix = 0, cinema = false;
  let userOrbit = false, autoOrbit = false, soundPlaying = false, sceneTime = 0;
  let hoverPoint = null, ray, pointer, orbitVector, spherical, pinchDistance = 0;
  let viewportWidth = 1, viewportHeight = 1, pixelCap = 1.35, slowFrames = 0;
  let contextRestoreTimer = 0;
  const pointers = new Map(), velocity = { x: 0, y: 0 }, hotspots = [];
  const modePalette = {
    movies: { accent: 0xb85c1a, bright: 0xed954c, wall: 0x292421, seat: 0xc8aa85, light: 0xffc58e },
    series: { accent: 0x6b2fd9, bright: 0xac88fa, wall: 0x22212c, seat: 0xa399bc, light: 0xc4b6ff },
    anime: { accent: 0x9b2fc9, bright: 0xe994f3, wall: 0x2b202c, seat: 0xc29abc, light: 0xf4b9ef },
  };
  const views = [
    {
      position: [12, 10, 15],
      target: [0, 1.45, -0.1],
      chapter: '01 / THE OVERVIEW',
      title: 'The best seat is yours.',
      description: 'A room built around the things you love. Every corner has a story.',
    },
    {
      position: [4.2, 3.6, 5.7],
      target: [0.8, 3.25, -4.38],
      chapter: '02 / THE BIG SCREEN',
      title: 'Tonight, the world can wait.',
      description: 'Your next cinematic obsession, front and center. Tap the screen to explore the title.',
    },
    {
      position: [1.4, 4.2, 6.3],
      target: [-6.8, 2.9, -0.25],
      chapter: '03 / THE REVIEW WALL',
      title: 'Your taste. On the wall.',
      description: 'The films that made you feel something. Tap a poster and make it part of your universe.',
    },
    {
      position: [8.3, 5.8, 9.6],
      target: [1, 0.9, 1.5],
      chapter: '04 / THE HANGOUT',
      title: 'Stay for one more story.',
      description: 'Put a record on. Pick up the phone. The best conversations happen after the credits.',
    },
    { position:[8.5,3.7,7], target:[4.2,1.6,1.2], chapter:'05 / YOUR POCKET UNIVERSE', title:'All your stories. Right here.', description:'A closer look at your personal watch world. Tap the phone to open your library.' },
    { position:[1,19,8], target:[0,0,-.5], chapter:'06 / THE BIG PICTURE', title:'A different point of view.', description:'Pull back, take it all in, and find your own way around the Mamboverse.' },
  ];
  const accentMaterials = [],
    seatMaterials = [],
    wallMaterials = [],
    warmLights = [],
    clickables = [],
    posterMeshes = [];
  function setView(index, fromTour = false) {
    const v = views[index];
    if (!v) return;
    activeView = index;
    userOrbit = false;
    velocity.x = velocity.y = 0;
    setAutoOrbit(false);
    if (!fromTour) stopTour();
    if (!worldReady && !fromTour) ensureInit();
    if (worldReady) {
      desiredPosition.set(...v.position);
      desiredTarget.set(...v.target);
      fitView();
      requestRender();
    }
    if ($('#loungeChapter')) $('#loungeChapter').textContent = v.chapter;
    if ($('#loungeTitle')) $('#loungeTitle').textContent = v.title;
    if ($('#loungeDescription')) $('#loungeDescription').textContent = v.description;
    if (P.lite) renderLite();
    document.querySelectorAll('[data-view]').forEach((b) => {
      b.classList.toggle('active', Number(b.dataset.view) === index);
      b.setAttribute('aria-pressed', Number(b.dataset.view) === index);
    });
  }
  function updatePlayButton() {
    const b = $('#tourPlay');
    if (!b) return;
    b.innerHTML = `<svg><use href="#i-${playing ? 'pause' : 'play'}"/></svg><span>${playing ? 'STOP THE TOUR' : 'PLAY GUIDED TOUR'}</span>`;
    b.setAttribute('aria-pressed', playing);
  }
  function stopTour() {
    const wasPlaying = playing || pendingTour;
    playing = false;
    pendingTour = false;
    if (wasPlaying) {
      updatePlayButton();
      const progress = $('#tourProgress');
      if (progress) progress.style.width = '0%';
    }
  }
  function expand(on = !isImmersive) {
    if (on === isImmersive) return;
    resetGesture();
    ensureInit();
    isImmersive = on;
    if (on) {
      restoreFocus = document.activeElement;
      immersivePlaceholder = document.createElement('div');
      immersivePlaceholder.style.height = shell.offsetHeight + 'px';
      shell.before(immersivePlaceholder);
      shell.classList.add('immersive');
      document.body.classList.add('locked');
      shell.setAttribute('role', 'dialog');
      shell.setAttribute('aria-modal', 'true');
      shell.setAttribute('aria-label', 'Immersive MAMBO lounge');
      A.syncFocusLayers();
      $('#loungeFullscreen').focus();
    } else {
      stopTour();
      shell.classList.remove('immersive');
      immersivePlaceholder?.remove();
      immersivePlaceholder = null;
      shell.removeAttribute('role');
      shell.removeAttribute('aria-modal');
      shell.removeAttribute('aria-label');
      A.syncFocusLayers();
      restoreFocus?.focus({ preventScroll: true });
    }
    $('#loungeFullscreen').innerHTML = `<svg><use href="#i-${on ? 'close' : 'expand'}"/></svg>`;
    $('#loungeFullscreen').setAttribute(
      'aria-label',
      on ? 'Exit immersive lounge' : 'Enter immersive lounge',
    );
    updateHint();
    resize();
  }
  function startTour(fullscreen = false) {
    if (P.lite) { setView((activeView+1)%views.length); if(fullscreen)expand(true); return A.toast('Lite mode uses still views. Switch Experience to Full for the animated 3D tour.'); }
    if (!worldReady) {
      pendingTour = true;
      pendingExpanded = fullscreen;
      ensureInit();
      A.toast('Setting the scene. Your tour will begin shortly.');
      return;
    }
    if (fullscreen && !isImmersive) expand(true);
    if (!fullscreen && !isImmersive)
      shell.scrollIntoView({ behavior: A.reduced ? 'instant' : 'smooth', block: 'center' });
    playing = true;
    tourElapsed = 0;
    setView(0, true);
    updatePlayButton();
    requestRender();
  }
  window.MamboWorld = { startTour, expand, setView, cancelPending: stopTour };
  $('#tourPlay').onclick = () => (playing ? stopTour() : startTour());
  $('#loungeFullscreen').onclick = () => expand();
  document
    .querySelectorAll('[data-view]')
    .forEach((b) => (b.onclick = () => setView(Number(b.dataset.view))));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') pendingTour = false;
    if (!isImmersive || $('#modalBackdrop').classList.contains('open')) return;
    if (e.key === 'Tab') {
      const buttons = [...shell.querySelectorAll('button,select')].filter((b) => !b.disabled && b.getClientRects().length);
      const first = buttons[0],
        last = buttons.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  function zoom(multiplier) {
    if (!worldReady) return;
    stopTour();
    const offset = desiredPosition.clone().sub(desiredTarget);
    userOrbit = true;
    offset.setLength(Math.max(4, Math.min(60, offset.length() * multiplier)));
    desiredPosition.copy(desiredTarget).add(offset);
    requestRender();
  }
  const btnIn = $('#loungeZoomIn') || $('#zoomIn');
  const btnOut = $('#loungeZoomOut') || $('#zoomOut');
  if (btnIn) btnIn.onclick = () => zoom(0.82);
  if (btnOut) btnOut.onclick = () => zoom(1.22);
  $('#loungeScreenAction').onclick = () => A.showTitle(A.catalog[A.state.mode][0].id);
  $('#loungePosterAction').onclick = () => A.showGallery();
  $('#loungePhoneAction').onclick = () => A.showLibrary();
  $('#loungeMode').onclick = () => {
    const modes = ['movies', 'series', 'anime'];
    A.setMode(modes[(modes.indexOf(A.state.mode) + 1) % 3]);
  };
  function setAutoOrbit(on) {
    autoOrbit = on && !A.reduced;
    $('#loungeOrbit').setAttribute('aria-pressed', String(autoOrbit));
    $('#loungeOrbit').title = autoOrbit ? 'Stop slow orbit' : 'Start slow orbit';
    if (autoOrbit) requestRender();
  }
  $('#loungeOrbit').onclick = () => {
    if (A.reduced) return A.toast('Turn motion on to use the slow orbit.');
    stopTour();
    setAutoOrbit(!autoOrbit);
  };
  $('#loungeLighting').onclick = () => {
    cinema = !cinema;
    $('#loungeLighting').setAttribute('aria-pressed', String(cinema));
    $('#loungeLighting').textContent = cinema ? 'LIGHTS: CINEMA' : 'LIGHTS: STUDIO';
    requestRender();
  };
  $('#loungeQuality').onchange = () => {
    pixelCap = { auto: matchMedia('(pointer:coarse)').matches ? 1 : 1.35, low: .8, high: 1.75 }[$('#loungeQuality').value];
    slowFrames = 0;
    resize();
  };
  function updateHint() {
    $('#loungeShell .lounge-hint').textContent = isImmersive
      ? 'DRAG TO LOOK AROUND / PINCH OR SCROLL TO ZOOM'
      : matchMedia('(pointer:coarse)').matches
        ? 'SWIPE SIDEWAYS TO ORBIT / EXPAND FOR PINCH ZOOM'
        : 'DRAG TO ORBIT / TAP THE LITTLE + TO EXPLORE';
  }
  function renderLite() {
    const items=A.catalog[A.state.mode];
    $('#liteRoom').innerHTML=`<p class="caps">LITE LOUNGE / ${views[activeView].chapter}</p><div>${[0,1,2].map(n=>{const t=items[(activeView+n)%items.length];return `<button data-title="${t.id}" aria-label="Explore ${t.title}"><img src="${t.image}" alt="${t.title}" loading="lazy"></button>`;}).join('')}</div><p>Same stories. Lighter on your device.<br>WebGL is off. Use the viewpoints below to explore.</p>`;
  }
  function ensureInit() { if(P.lite){renderLite();return Promise.resolve();} return initPromise ||= init(); }
  function requestRender() {
    needsRender = true;
    clearTimeout(ambientTimer);
    if (P.lite || !worldReady || frame || rendering || document.hidden || (!visible && !isImmersive)) return;
    frame = requestAnimationFrame(animate);
  }
  function fitView() {
    if (!camera || userOrbit) return;
    const v = views[activeView];
    desiredTarget.set(...v.target);
    orbitVector.set(...v.position).sub(desiredTarget);
    const fit = Math.max(1, Math.min(2.4, .98 / camera.aspect));
    desiredPosition.copy(desiredTarget).addScaledVector(orbitVector, fit);
  }
  // Vertex-lit room materials keep camera moves light on mobile and software GPUs.
  function material(color) {
    return new THREE.MeshLambertMaterial({ color });
  }
  function glowMaterial(color, intensity = 1) {
    const m = new THREE.MeshLambertMaterial({ color, emissive: color, emissiveIntensity: intensity });
    accentMaterials.push(m);
    return m;
  }
  function addMesh(geometry, mat, x = 0, y = 0, z = 0, parent = scene) {
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function roundedGeometry(w, h, d, r = 0.12) {
    r = Math.min(r, w / 3, h / 3, d / 3);
    const x = -w / 2 + r,
      y = -h / 2 + r,
      W = w - 2 * r,
      H = h - 2 * r,
      shape = new THREE.Shape();
    shape.moveTo(x, y);
    shape.lineTo(x + W, y);
    shape.lineTo(x + W, y + H);
    shape.lineTo(x, y + H);
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: d - 2 * r,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: r,
      bevelThickness: r,
      curveSegments: 2,
    });
    g.center();
    return g;
  }
  function box(w, h, d, mat, x, y, z, r = 0, parent = scene) {
    return addMesh(r ? roundedGeometry(w, h, d, r) : new THREE.BoxGeometry(w, h, d), mat, x, y, z, parent);
  }
  function cylinder(rt, rb, h, mat, x, y, z, parent = scene, segments = 32) {
    return addMesh(new THREE.CylinderGeometry(rt, rb, h, segments), mat, x, y, z, parent);
  }
  function plane(w, h, mat, x, y, z, parent = scene) {
    const m = addMesh(new THREE.PlaneGeometry(w, h), mat, x, y, z, parent);
    m.castShadow = false;
    return m;
  }
  function makeCanvas(w, h) {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
  }
  function textureFor(canvas) {
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    return t;
  }
  function labelTexture(text, color = '#ed954c', subtitle = '', w = 1024, h = 180) {
    const c = makeCanvas(w, h),
      ctx = c.getContext('2d');
    ctx.clearRect(0, 0, w, h);
    ctx.textAlign = 'center';
    ctx.fillStyle = color;
    ctx.font = `800 ${h * 0.55}px "Barlow Condensed",sans-serif`;
    ctx.fillText(text, w / 2, h * 0.62);
    if (subtitle) {
      ctx.fillStyle = '#a89989';
      ctx.font = `500 ${h * 0.1}px "DM Sans",sans-serif`;
      ctx.letterSpacing = '4px';
      ctx.fillText(subtitle, w / 2, h * 0.9);
    }
    return textureFor(c);
  }
  function plant(x, z, scale = 1) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.scale.setScalar(scale);
    scene.add(group);
    const pot = material(0x61574a, 0.8),
      stem = material(0x5f5036),
      leaf = material(0x46563b, 0.8);
    cylinder(0.34, 0.25, 0.65, pot, 0, 0.32, 0, group);
    cylinder(0.3, 0.3, 0.05, material(0x221b14), 0, 0.66, 0, group);
    cylinder(0.035, 0.06, 1.9, stem, 0, 1.3, 0, group, 8);
    for (let i = 0; i < 12; i++) {
      const angle = i * 2.399,
        height = 1 + i * 0.09,
        length = 0.4 + (i % 3) * 0.15;
      const v = addMesh(
        new THREE.SphereGeometry(1, 8, 6),
        leaf,
        Math.cos(angle) * length,
        height + length * 0.3,
        Math.sin(angle) * length,
        group,
      );
      v.scale.set(0.14, 0.7, 0.22);
      v.rotation.z = -Math.cos(angle) * 0.8;
      v.rotation.x = Math.sin(angle) * 0.8;
    }
    return group;
  }
  async function init() {
    try {
      THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js');
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default',
      });
      pixelCap = { auto: matchMedia('(pointer:coarse)').matches ? 1 : 1.35, low: .8, high: 1.75 }[$('#loungeQuality').value];
      renderer.setPixelRatio(Math.min(devicePixelRatio, pixelCap));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.shadowMap.autoUpdate = false;
      renderer.shadowMap.needsUpdate = true;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      host.appendChild(renderer.domElement);
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0b0b0d, 0.018);
      camera = new THREE.PerspectiveCamera(42, 1, 0.1, 150);
      desiredPosition = new THREE.Vector3(...views[0].position);
      desiredTarget = new THREE.Vector3(...views[0].target);
      currentTarget = desiredTarget.clone();
      camera.position.copy(desiredPosition);
      orbitVector = new THREE.Vector3();
      spherical = new THREE.Spherical();
      pointer = new THREE.Vector2();
      ray = new THREE.Raycaster();
      const p = modePalette[A.state.mode];
      targetPalette = { bright: new THREE.Color(p.bright), seat: new THREE.Color(p.seat), wall: new THREE.Color(p.wall) };
      hemisphere = new THREE.HemisphereLight(0xc4c8dc, 0x262020, 2.0);
      scene.add(hemisphere);
      const key = new THREE.DirectionalLight(0xffe7ca, 3.2);
      keyLight = key;
      key.position.set(2, 11, 7);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.left = -12;
      key.shadow.camera.right = 12;
      key.shadow.camera.top = 12;
      key.shadow.camera.bottom = -12;
      key.shadow.bias = -0.001;
      scene.add(key);
      const screenLight = new THREE.PointLight(p.bright, 35, 15, 2);
      screenLight.position.set(1, 4, -2.5);
      scene.add(screenLight);
      warmLights.push(screenLight);
      const rim = new THREE.DirectionalLight(p.bright, 1.6);
      rim.position.set(-7, 6, -5);
      scene.add(rim);
      warmLights.push(rim);
      const floor = material(0x282522, 0.5, 0.2),
        wall = material(p.wall, 0.8),
        edge = material(0x111011, 0.38, 0.25),
        slat = material(0x302b28, 0.8),
        brass = new THREE.MeshStandardMaterial({ color: 0x96724c, roughness: .34, metalness: .55 }),
        seat = material(p.seat, 0.9),
        neon = glowMaterial(p.bright, 2),
        dark = material(0x171619, 0.65, 0.15);
      wallMaterials.push(wall);
      seatMaterials.push(seat);
      box(14.6, 0.34, 10.8, edge, 0, -0.2, 0, 0.1);
      box(14.2, 0.09, 10.4, floor, 0, 0.015, 0, 0.03);
      box(14.2, 5.8, 0.2, wall, 0, 2.9, -5.13);
      box(0.2, 5.8, 10.4, wall, -7.03, 2.9, 0);
      // Repeated wall details use one draw call, rather than one per slat.
      const slats = new THREE.InstancedMesh(new THREE.BoxGeometry(.075, 5.6, .12), slat, 58);
      const matrix = new THREE.Matrix4();
      for (let i = 0; i < 58; i++) slats.setMatrixAt(i, matrix.makeTranslation(-6.8 + i * .24, 2.85, -4.99));
      slats.castShadow = slats.receiveShadow = true;
      scene.add(slats);
      box(14.2, 0.045, 0.045, neon, 0, 5.78, -4.93);
      box(0.04, 5.65, 0.04, neon, -6.9, 2.86, -4.93);
      box(0.04, 0.045, 10.2, neon, -6.9, 5.78, 0);
      for (let x = -6.5; x <= 6.5; x += 1.1) box(0.012, 0.012, 10.1, material(0x36312b, 0.7), x, 0.068, 0);
      const tv = box(8.1, 3.95, 0.18, edge, 1.08, 3.36, -4.77, 0.1);
      tv.userData.action = 'screen';
      clickables.push(tv);
      screenTexture = textureFor(makeCanvas(1600, 820));
      const screen = plane(
        7.86,
        3.72,
        new THREE.MeshBasicMaterial({ map: screenTexture }),
        1.08,
        3.36,
        -4.663,
      );
      screen.userData.action = 'screen';
      clickables.push(screen);
      box(8.25, 0.036, 0.08, neon, 1.08, 1.3, -4.68);
      box(8.25, 0.036, 0.08, neon, 1.08, 5.42, -4.68);
      const consoleWood = material(0x49392e, 0.7);
      box(8.5, 0.5, 0.65, consoleWood, 1.08, 0.72, -4.37, 0.07);
      for (const x of [-2.45, -0.65, 1.15, 2.95, 4.4]) box(0.025, 0.39, 0.02, brass, x, 0.72, -4.035);
      cylinder(0.08, 0.08, 0.4, brass, -2.55, 0.24, -4.36);
      cylinder(0.08, 0.08, 0.4, brass, 4.7, 0.24, -4.36);
      signTexture = labelTexture('MAMBO', `#${p.bright.toString(16)}`, 'AFTER HOURS. ALWAYS.');
      plane(
        2.15,
        0.51,
        new THREE.MeshBasicMaterial({ map: signTexture, transparent: true }),
        -4.4,
        4.65,
        -4.77,
      );
      for (let i = 0; i < 3; i++) {
        const z = -2.7 + i * 2.62;
        box(0.08, 2.65, 1.86, brass, -6.86, 3.25, z, 0.025);
        const tex = textureFor(makeCanvas(400, 600));
        const poster = plane(1.7, 2.49, new THREE.MeshBasicMaterial({ map: tex }), -6.803, 3.25, z);
        poster.rotation.y = Math.PI / 2;
        poster.userData.action = 'poster';
        poster.userData.index = i + 1;
        posterMeshes.push(poster);
        clickables.push(poster);
        const spot = new THREE.SpotLight(0xffdeae, 16, 6, 0.55, 0.55, 1.6);
        spot.position.set(-5.5, 5.6, z + 0.1);
        spot.target.position.set(-6.8, 3.2, z);
        scene.add(spot, spot.target);
        box(0.5, 0.065, 0.1, brass, -6.69, 4.68, z);
      }
      const wallLabel = plane(
        5.8,
        0.5,
        new THREE.MeshBasicMaterial({
          map: labelTexture('THE STORIES THAT STAY.', '#b9a896', 'YOUR OWN LITTLE HALL OF FAME', 1024, 160),
          transparent: true,
        }),
        -6.78,
        1.53,
        -0.1,
      );
      wallLabel.rotation.y = Math.PI / 2;
      const rugCanvas = makeCanvas(1024, 768),
        rc = rugCanvas.getContext('2d');
      rc.fillStyle = '#70624f';
      rc.fillRect(0, 0, 1024, 768);
      for (let i = 0; i < 7; i++) {
        rc.strokeStyle = i % 2 ? '#8d7a60' : '#554a3b';
        rc.lineWidth = 5;
        rc.strokeRect(25 + i * 17, 25 + i * 17, 974 - i * 34, 718 - i * 34);
      }
      for (let i = 0; i < 3200; i++) {
        rc.fillStyle = i % 2 ? '#ffffff07' : '#0000000b';
        rc.fillRect(Math.random() * 1024, Math.random() * 768, 1, 12);
      }
      const rug = plane(
        7.2,
        5.9,
        new THREE.MeshStandardMaterial({ map: textureFor(rugCanvas), roughness: 1 }),
        0.2,
        0.079,
        0.7,
      );
      rug.rotation.x = -Math.PI / 2;
      box(5.8, 0.48, 2.15, seat, 0.2, 0.53, 2.53, 0.2);
      box(5.7, 1.1, 0.45, seat, 0.2, 1.2, 3.42, 0.16);
      for (let i = 0; i < 3; i++) {
        box(1.7, 0.27, 1.58, seat, -1.57 + i * 1.77, 0.88, 2.35, 0.11);
        box(1.68, 0.79, 0.28, seat, -1.57 + i * 1.77, 1.33, 3.09, 0.1);
      }
      box(0.48, 0.8, 2.1, seat, -2.68, 1, 2.53, 0.17);
      box(0.48, 0.8, 2.1, seat, 3.08, 1, 2.53, 0.17);
      for (const x of [-2.2, 2.55])
        for (const z of [1.75, 3.17]) cylinder(0.07, 0.06, 0.35, brass, x, 0.21, z);
      const pillow = material(0x735b4c, 0.95),
        pillow2 = material(0x33333d, 0.95);
      const p1 = box(0.7, 0.67, 0.22, pillow, -1.85, 1.29, 2.9, 0.13);
      p1.rotation.z = -0.22;
      p1.rotation.x = -0.15;
      const p2 = box(0.68, 0.69, 0.22, pillow2, 2.3, 1.3, 2.92, 0.13);
      p2.rotation.z = 0.2;
      p2.rotation.x = -0.15;
      cylinder(1.43, 1.43, 0.13, material(0x8a6946, 0.42), 0.25, 0.72, -0.35);
      cylinder(1.2, 1.2, 0.075, brass, 0.25, 0.61, -0.35);
      for (let i = 0; i < 3; i++) {
        const angle = (i * Math.PI * 2) / 3;
        cylinder(0.08, 0.12, 0.6, dark, 0.25 + Math.cos(angle) * 0.88, 0.35, -0.35 + Math.sin(angle) * 0.88);
      }
      for (let i = 0; i < 3; i++) {
        const book = box(
          0.64,
          0.065,
          0.85,
          material([0xdbc9a7, 0x523c32, 0x98735f][i]),
          -0.35,
          0.85 + i * 0.068,
          -0.32,
          0.013,
        );
        book.rotation.y = -0.18 + i * 0.12;
      }
      cylinder(0.14, 0.12, 0.21, material(0xd7c8b0), 0.77, 0.89, -0.75);
      cylinder(0.115, 0.115, 0.008, material(0x25150f), 0.77, 1, -0.75);
      const handle = addMesh(
        new THREE.TorusGeometry(0.1, 0.025, 8, 16),
        material(0xd7c8b0),
        0.945,
        0.9,
        -0.75,
      );
      handle.rotation.y = Math.PI / 2;
      cylinder(0.37, 0.37, 0.025, material(0x121111, 0.25), 0.7, 0.81, 0.12);
      for (let i = 0; i < 5; i++) {
        const ring = addMesh(
          new THREE.TorusGeometry(0.16 + i * 0.035, 0.003, 4, 40),
          material(0x34302b),
          0.7,
          0.826,
          0.12,
        );
        ring.rotation.x = Math.PI / 2;
      }
      cylinder(0.07, 0.07, 0.03, neon, 0.7, 0.83, 0.12);
      recordMark = new THREE.Group();
      recordMark.position.set(.7, .831, .12);
      scene.add(recordMark);
      box(.026, .008, .13, brass, 0, 0, .15, 0, recordMark);
      const lampGroup = new THREE.Group();
      scene.add(lampGroup);
      lampGroup.position.set(-4.55, 0, 1.7);
      cylinder(0.48, 0.52, 0.12, dark, 0, 0.11, 0, lampGroup);
      cylinder(0.033, 0.05, 3.45, brass, 0, 1.8, 0, lampGroup);
      cylinder(0.43, 0.68, 0.68, material(0xd8b783, 0.6), 0, 3.38, 0, lampGroup);
      const lampLight = new THREE.PointLight(0xffc57b, 17, 8, 2);
      lampLight.position.set(-4.55, 3.1, 1.7);
      scene.add(lampLight);
      plant(-5.7, -3.9, 1.1);
      plant(6.06, -3.98, 1.35);
      plant(-5.8, 4.1, 0.85);
      const juke = new THREE.Group();
      juke.position.set(5.4, 0, 2.2);
      juke.rotation.y = -0.28;
      scene.add(juke);
      const jukeBody = box(1.35, 1.77, 0.9, material(0x40312a, 0.35, 0.2), 0, 1.02, 0, 0.17, juke);
      jukeBody.userData.action = 'sound';
      clickables.push(jukeBody);
      box(1.05, 1.45, 0.035, material(0x19151a), 0, 1, 0.47, 0.08, juke);
      const arch = addMesh(new THREE.TorusGeometry(0.52, 0.042, 8, 40, Math.PI), neon, 0, 1.5, 0.5, juke);
      box(0.085, 1.17, 0.085, neon, -0.52, 0.9, 0.5, 0.02, juke);
      box(0.085, 1.17, 0.085, neon, 0.52, 0.9, 0.5, 0.02, juke);
      box(1.08, 0.085, 0.085, neon, 0, 0.33, 0.5, 0.02, juke);
      for (let i = 0; i < 9; i++) box(0.68, 0.018, 0.05, brass, 0, 0.54 + i * 0.065, 0.53, 0, juke);
      const disc = addMesh(
        new THREE.CircleGeometry(0.21, 32),
        material(0x92856d, 0.3, 0.5),
        0,
        1.46,
        0.535,
        juke,
      );
      disc.userData.action = 'sound';
      clickables.push(disc);
      const jukeLabel = plane(
        0.94,
        0.2,
        new THREE.MeshBasicMaterial({
          map: labelTexture('SIDE A', '#f5d5a5', '', 512, 100),
          transparent: true,
        }),
        0,
        1.18,
        0.55,
        juke,
      );
      jukeLabel.userData.action = 'sound';
      clickables.push(jukeLabel);
      const jukeLight = new THREE.PointLight(p.bright, 7, 4, 2);
      jukeLight.position.set(5.2, 1.5, 2.6);
      scene.add(jukeLight);
      warmLights.push(jukeLight);
      cylinder(0.5, 0.57, 0.92, material(0x343139, 0.3, 0.4), 4.7, 0.52, -1.25);
      cylinder(0.57, 0.57, 0.05, brass, 4.7, 1, -1.25);
      const phoneGroup = new THREE.Group();
      phoneGroup.position.set(4.7, 1.68, -1.25);
      phoneGroup.rotation.x = -0.12;
      phoneGroup.rotation.y = -0.4;
      scene.add(phoneGroup);
      box(0.68, 1.28, 0.08, edge, 0, 0, 0, 0.06, phoneGroup);
      phoneTexture = textureFor(makeCanvas(400, 720));
      const phone = plane(
        0.6,
        1.16,
        new THREE.MeshBasicMaterial({ map: phoneTexture }),
        0,
        0,
        0.047,
        phoneGroup,
      );
      phone.userData.action = 'phone';
      clickables.push(phone);
      box(0.21, 0.035, 0.01, dark, 0, 0.525, 0.055, 0.005, phoneGroup);
      const platformLabel = plane(
        5.7,
        0.23,
        new THREE.MeshBasicMaterial({
          map: labelTexture('NO SPOILERS. GOOD VIBES.', '#b29b83', '', 1024, 80),
          transparent: true,
        }),
        0,
        -0.19,
        5.412,
      );
      const outerMat = new THREE.MeshBasicMaterial({ color: p.bright, transparent: true, opacity: 0.1 });
      accentMaterials.push(outerMat);
      for (let i = 0; i < 3; i++) {
        const ring = addMesh(new THREE.TorusGeometry(9.5 + i * 1.25, 0.007, 4, 120), outerMat, 0, -0.39, 0);
        ring.rotation.x = -Math.PI / 2;
        ring.scale.y = 0.83;
      }
      const particles = new THREE.BufferGeometry(),
        pts = new Float32Array(180 * 3);
      for (let i = 0; i < 180; i++) {
        pts[i * 3] = (Math.random() - 0.5) * 45;
        pts[i * 3 + 1] = Math.random() * 20;
        pts[i * 3 + 2] = (Math.random() - 0.5) * 35;
      }
      particles.setAttribute('position', new THREE.BufferAttribute(pts, 3));
      dust = new THREE.Points(
        particles,
        new THREE.PointsMaterial({ color: 0xcab7a1, size: 0.035, transparent: true, opacity: 0.45, depthWrite: false }),
      );
      scene.add(dust);
      const arcMaterial = new THREE.MeshBasicMaterial({ color: p.bright, transparent: true, opacity: .5 });
      accentMaterials.push(arcMaterial);
      orbitArc = addMesh(new THREE.TorusGeometry(9.5, .015, 4, 70, Math.PI * .36), arcMaterial, 0, -.37, 0);
      orbitArc.rotation.x = -Math.PI / 2;
      orbitArc.castShadow = false;
      for (const [id, position, action] of [
        ['screenHotspot', [1, 4.4, -4.4], () => A.showTitle(A.catalog[A.state.mode][0].id)],
        ['libraryHotspot', [4.7, 2.6, -1.25], () => A.showLibrary()],
        ['musicHotspot', [5.4, 2.4, 2.2], () => A.toggleSound()],
      ]) {
        const element = $('#' + id);
        element.onclick = action;
        hotspots.push({ element, position: new THREE.Vector3(...position), projected: new THREE.Vector3() });
      }
      worldReady = true;
      resize();
      setView(activeView, true);
      camera.position.copy(desiredPosition);
      refreshTextures(true);
      refreshTextures().then(requestRender);
      $('#loungeLoading').classList.add('hidden');
      shell.dataset.ready = 'true';
      new ResizeObserver(resize).observe(host);
      bindPointer();
      lastTime = performance.now();
      requestRender();
      renderer.domElement.addEventListener('webglcontextlost', (e) => {
        e.preventDefault();
        cancelAnimationFrame(frame); frame = 0; worldReady = false;
        clearTimeout(ambientTimer);
        clearTimeout(contextRestoreTimer);
        resetGesture();
        stopTour();
        shell.dataset.ready = 'false';
        $('#loungeLoading').classList.remove('hidden');
        $('#loungeLoading').innerHTML = '<p class="caps">3D paused by your device. Waiting to reconnect...</p>';
        contextRestoreTimer = setTimeout(() => {
          contextRestoreTimer = 0;
          if (worldReady) return;
          $('#loungeLoading').innerHTML = '<p class="caps">3D is still unavailable.</p><button type="button" class="btn primary" id="contextFallback">Continue without 3D ↗</button>';
          $('#contextFallback').onclick = () => {
            stopTour();
            pendingExpanded = false;
            expand(false);
            $('#discover').scrollIntoView({ behavior: A.reduced ? 'instant' : 'smooth' });
          };
        }, 10000);
      });
      renderer.domElement.addEventListener('webglcontextrestored', () => {
        clearTimeout(contextRestoreTimer);
        contextRestoreTimer = 0;
        worldReady = true;
        shell.dataset.ready = 'true';
        renderer.shadowMap.needsUpdate = true;
        if (isImmersive && $('#loungeLoading').contains(document.activeElement))
          $('#loungeFullscreen').focus({ preventScroll: true });
        $('#loungeLoading').classList.add('hidden');
        window.dispatchEvent(new CustomEvent('mambo:mode'));
        setView(activeView, true);
        if (pendingTour) startTour(pendingExpanded);
        requestRender();
      });
      if (pendingTour) {
        pendingTour = false;
        startTour(pendingExpanded);
      }
    } catch (error) {
      worldReady = false;
      pendingTour = false;
      shell.dataset.ready = 'false';
      console.warn('MAMBO 3D fallback:', error);
      $('#loungeLoading').innerHTML =
        `<div style="max-width:420px;text-align:center;padding:25px"><p class="caps accent">A LIGHTER WAY TO EXPLORE</p><h3 class="display" style="font-size:65px;margin:25px 0">THE STORIES<br>STILL WORK.</h3><p style="font-size:12px;color:#aaa;line-height:1.9">This browser could not start the 3D engine. Your watchlist, chat previews, discovery, and story cards are still ready to explore.</p><button class="btn primary" id="fallbackDiscover" style="margin-top:25px">Explore the titles ↗</button></div>`;
      $('#fallbackDiscover').onclick = () => {
        expand(false);
        $('#discover').scrollIntoView({ behavior: A.reduced ? 'instant' : 'smooth' });
      };
      $('#tourPlay').disabled = true;
      document.querySelectorAll('[data-view],#loungeOrbit,#loungeLighting,#loungeQuality,#zoomIn,#zoomOut').forEach((b) => (b.disabled = true));
      window.MamboWorld.startTour = () => {
        shell.scrollIntoView({ behavior: A.reduced ? 'instant' : 'smooth' });
        A.toast('3D is unavailable here. The rest of the experience is ready.');
      };
    }
  }
  async function refreshTextures(placeholder = false) {
    if (!worldReady) return;
    const gen = ++textureGeneration,
      p = modePalette[A.state.mode],
      titles = A.catalog[A.state.mode],
      hex = '#' + p.bright.toString(16).padStart(6, '0');
    let images = [];
    if (!placeholder) {
      await Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 1500))]);
      images = await Promise.all(titles.slice(0, 4).map((t) => A.loadImage(t.image).catch(() => null)));
    }
    if (gen !== textureGeneration) return;
    const c = screenTexture.image,
      ctx = c.getContext('2d');
    ctx.fillStyle = '#11100f';
    ctx.fillRect(0, 0, c.width, c.height);
    if (images[0]) {
      ctx.globalAlpha = 0.4;
      A.cover(ctx, images[0], 0, 0, c.width, c.height);
      ctx.globalAlpha = 1;
    }
    const grad = ctx.createLinearGradient(0, 0, 1600, 0);
    grad.addColorStop(0, '#0b0908f5');
    grad.addColorStop(0.58, '#0b0908a0');
    grad.addColorStop(1, '#0b090815');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1600, 820);
    ctx.fillStyle = hex;
    ctx.font = '600 22px "DM Sans",sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText(`MAMBO / ${A.state.mode.toUpperCase()}`, 90, 115);
    ctx.letterSpacing = '0px';
    ctx.fillStyle = '#f3eadd';
    ctx.font = '800 155px "Barlow Condensed",sans-serif';
    ctx.fillText({ movies: 'FOR THE', series: 'JUST ONE', anime: 'BEYOND' }[A.state.mode], 85, 335);
    ctx.fillStyle = hex;
    ctx.fillText(
      { movies: 'LOVE OF FILM.', series: 'MORE EPISODE.', anime: 'THIS WORLD.' }[A.state.mode],
      85,
      475,
    );
    ctx.fillStyle = '#b6a99a';
    ctx.font = '400 27px "DM Sans",sans-serif';
    ctx.fillText('Your next obsession is closer than you think.', 90, 558);
    ctx.fillStyle = '#f3eadd';
    ctx.font = '600 22px "DM Sans",sans-serif';
    ctx.fillText('NOW SHOWING', 90, 690);
    ctx.fillStyle = hex;
    ctx.font = '400 25px "DM Sans",sans-serif';
    ctx.fillText(titles[0].title.toUpperCase(), 90, 735);
    if (images[0]) {
      ctx.save();
      ctx.translate(1225, 405);
      ctx.rotate(0.075);
      ctx.shadowColor = '#000';
      ctx.shadowBlur = 45;
      A.cover(ctx, images[0], -220, -320, 440, 660);
      ctx.restore();
    }
    screenTexture.needsUpdate = true;
    posterMeshes.forEach((m, i) => {
      const tex = m.material.map,
        cv = tex.image,
        cc = cv.getContext('2d');
      cc.fillStyle = hex;
      cc.fillRect(0, 0, 400, 600);
      if (images[i + 1]) A.cover(cc, images[i + 1], 0, 0, 400, 600);
      else {
        cc.fillStyle = '#111';
        cc.font = '30px sans-serif';
        cc.fillText(titles[i + 1].title.slice(0, 18), 15, 310);
      }
      tex.needsUpdate = true;
      m.userData.title = titles[i + 1].id;
    });
    const pc = phoneTexture.image,
      px = pc.getContext('2d');
    px.fillStyle = '#0c0c0c';
    px.fillRect(0, 0, 400, 720);
    px.fillStyle = hex;
    px.font = '700 34px "DM Sans",sans-serif';
    px.fillText('MAMBO', 30, 74);
    px.fillStyle = '#eee5da';
    px.font = '700 28px "DM Sans",sans-serif';
    px.fillText('Your universe.', 30, 139);
    if (images[0]) A.cover(px, images[0], 25, 175, 350, 360);
    px.fillStyle = hex;
    px.fillRect(25, 559, 350, 62);
    px.fillStyle = '#100b08';
    px.font = '600 23px "DM Sans",sans-serif';
    px.fillText('YOUR NEXT OBSESSION', 42, 600);
    px.fillStyle = '#a89785';
    px.font = '400 17px "DM Sans",sans-serif';
    px.fillText('HOME        DISCOVER        YOU', 35, 684);
    phoneTexture.needsUpdate = true;
    const sign = signTexture.image,
      sc = sign.getContext('2d');
    sc.clearRect(0, 0, 1024, 180);
    sc.fillStyle = hex;
    sc.textAlign = 'center';
    sc.font = '800 99px "Barlow Condensed",sans-serif';
    sc.fillText('MAMBO', 512, 112);
    sc.fillStyle = '#b1a090';
    sc.font = '500 18px "DM Sans",sans-serif';
    sc.letterSpacing = '4px';
    sc.fillText('AFTER HOURS. ALWAYS.', 512, 162);
    signTexture.needsUpdate = true;
  }
  function resize() {
    if (!renderer || !camera) return;
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    viewportWidth = width;
    viewportHeight = height;
    renderer.setPixelRatio(Math.min(devicePixelRatio, pixelCap));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    fitView();
    requestRender();
  }
  function raycast(x, y) {
    const rect = host.getBoundingClientRect();
    pointer.set(((x - rect.left) / rect.width) * 2 - 1, (-(y - rect.top) / rect.height) * 2 + 1);
    ray.setFromCamera(pointer, camera);
    return ray.intersectObjects(clickables, false)[0]?.object;
  }
  function orbit(dx, dy) {
    orbitVector.copy(desiredPosition).sub(desiredTarget);
    spherical.setFromVector3(orbitVector);
    // Keep the camera on the open side of the architectural cutaway.
    spherical.theta = Math.max(-.3, Math.min(1.5, spherical.theta + dx));
    spherical.phi = Math.max(.35, Math.min(1.4, spherical.phi + dy));
    desiredPosition.copy(desiredTarget).add(orbitVector.setFromSpherical(spherical));
  }
  function resetGesture() {
    const captured = [...pointers.keys()];
    pointers.clear();
    drag = null;
    pinchDistance = 0;
    velocity.x = velocity.y = 0;
    hoverPoint = null;
    host.classList.remove('dragging');
    for (const id of captured) {
      if (host.hasPointerCapture(id)) host.releasePointerCapture(id);
    }
    requestRender();
  }
  function bindPointer() {
    host.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || e.target.closest('button') || !worldReady) return;
      // Inline multitouch belongs to the browser; immersive gestures use at most two fingers.
      if (e.pointerType === 'touch' && !isImmersive && !e.isPrimary) return resetGesture();
      if (pointers.size >= (isImmersive ? 2 : 1)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2 && isImmersive) {
        const [a, b] = [...pointers.values()];
        pinchDistance = Math.hypot(a.x - b.x, a.y - b.y);
        if (drag) drag.moved = true;
        stopTour(); setAutoOrbit(false);
      } else if (pointers.size === 1) {
        drag = { id: e.pointerId, x: e.clientX, y: e.clientY, lastX: e.clientX, lastY: e.clientY, time: e.timeStamp, moved: false };
        velocity.x = velocity.y = 0;
      }
      host.setPointerCapture(e.pointerId);
      host.classList.add('dragging');
    });
    host.addEventListener('pointermove', (e) => {
      if (!worldReady) return;
      if (!drag) {
        if (e.pointerType !== 'touch') { hoverPoint = { x: e.clientX, y: e.clientY }; requestRender(); }
        return;
      }
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 2 && isImmersive) {
        const [a, b] = [...pointers.values()];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (pinchDistance > 0 && distance > 0) zoom(pinchDistance / distance);
        pinchDistance = distance;
        return;
      }
      if (e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.lastX,
        dy = e.clientY - drag.lastY,
        totalX = e.clientX - drag.x,
        totalY = e.clientY - drag.y,
        threshold = e.pointerType === 'touch' ? 10 : 5;
      if (!drag.moved && e.pointerType === 'touch' && !isImmersive) {
        if (Math.hypot(totalX, totalY) <= threshold) return;
        if (Math.abs(totalY) >= Math.abs(totalX)) return resetGesture();
        if (Math.abs(totalX) <= Math.abs(totalY) * 1.25) return;
      }
      if (!drag.moved && Math.hypot(totalX, totalY) > threshold) {
        drag.moved = true;
        stopTour(); setAutoOrbit(false);
        userOrbit = true;
      }
      if (drag.moved) {
        const elapsed = Math.max(.008, (e.timeStamp - drag.time) / 1000);
        const y = e.pointerType === 'touch' && !isImmersive ? 0 : dy * .004;
        orbit(-dx * .005, y);
        velocity.x = Math.max(-1.5, Math.min(1.5, -dx * .005 / elapsed));
        velocity.y = Math.max(-1, Math.min(1, y / elapsed));
        requestRender();
      }
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      drag.time = e.timeStamp;
    });
    const finish = (e) => {
      if (!pointers.has(e.pointerId)) return;
      if (e.type !== 'pointerup') return resetGesture();
      pointers.delete(e.pointerId);
      if (host.hasPointerCapture(e.pointerId)) host.releasePointerCapture(e.pointerId);
      if (!drag) return;
      if (pointers.size) {
        const [id, point] = pointers.entries().next().value;
        drag = { id, x: point.x, y: point.y, lastX: point.x, lastY: point.y, time: e.timeStamp, moved: true };
        velocity.x = velocity.y = 0;
        pinchDistance = 0;
        return;
      }
      const clicked = !drag.moved && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) <= (e.pointerType === 'touch' ? 10 : 5);
      if (e.timeStamp - drag.time > 90) velocity.x = velocity.y = 0;
      drag = null;
      pinchDistance = 0;
      pointers.clear();
      host.classList.remove('dragging');
      if (clicked) {
        const hit = raycast(e.clientX, e.clientY);
        if (hit?.userData.action === 'screen') A.showTitle(A.catalog[A.state.mode][0].id);
        else if (hit?.userData.action === 'poster') A.showTitle(hit.userData.title);
        else if (hit?.userData.action === 'sound') A.toggleSound();
        else if (hit?.userData.action === 'phone') A.showLibrary();
      }
      requestRender();
    };
    host.addEventListener('pointerup', finish);
    host.addEventListener('pointercancel', finish);
    host.addEventListener('lostpointercapture', finish);
    host.addEventListener('pointerleave', () => { hoverPoint = null; });
    host.addEventListener(
      'wheel',
      (e) => {
        if (!isImmersive) return;
        e.preventDefault();
        zoom(Math.exp(Math.max(-.3, Math.min(.3, e.deltaY * .001))));
      },
      { passive: false },
    );
    updateHint();
  }
  function animate(now) {
    frame = 0;
    const delta = lastTime ? Math.min((now - lastTime) / 1000, .06) : 1 / 60;
    lastTime = now;
    if (
      P.lite || !worldReady || document.hidden || (!visible && !isImmersive) ||
      $('#modalBackdrop').classList.contains('open')
    ) { lastTime = 0; return; }
    rendering = true;
    needsRender = false;
    if (playing) {
      tourElapsed += delta;
      const duration=views.length*6.5;
      const view = Math.min(views.length-1, Math.floor(tourElapsed / 6.5));
      if (view !== activeView) setView(view, true);
      const progress = $('#tourProgress');
      if (progress) progress.style.width = Math.min(100, (tourElapsed / duration) * 100) + '%';
      if (tourElapsed >= duration) {
        stopTour();
        A.toast('The tour is yours now. Drag, explore, or change the mood.');
      }
    }
    if (A.reduced) velocity.x = velocity.y = 0;
    if (!drag && (Math.abs(velocity.x) + Math.abs(velocity.y) > .002)) {
      orbit(velocity.x * delta, velocity.y * delta);
      velocity.x *= Math.exp(-delta * 6);
      velocity.y *= Math.exp(-delta * 6);
    }
    if (autoOrbit && !A.reduced) {
      sceneTime += delta;
      orbit(Math.cos(sceneTime * .18) * .055 * delta, 0);
    }
    const mix = A.reduced ? 1 : 1 - Math.exp(-delta * (drag ? 14 : 5));
    camera.position.lerp(desiredPosition, mix);
    currentTarget.lerp(desiredTarget, mix);
    camera.lookAt(currentTarget);
    const colorMix = A.reduced ? 1 : 1 - Math.exp(-delta * 4);
    if (paletteMix > .001) {
      accentMaterials.forEach(m => { m.color.lerp(targetPalette.bright, colorMix); m.emissive?.lerp(targetPalette.bright, colorMix); });
      seatMaterials.forEach(m => m.color.lerp(targetPalette.seat, colorMix));
      wallMaterials.forEach(m => m.color.lerp(targetPalette.wall, colorMix));
      warmLights.forEach(l => l.color.lerp(targetPalette.bright, colorMix));
      paletteMix *= 1 - colorMix;
    }
    const targetExposure = cinema ? .74 : 1.25;
    renderer.toneMappingExposure += (targetExposure - renderer.toneMappingExposure) * colorMix;
    hemisphere.intensity += ((cinema ? .65 : 2) - hemisphere.intensity) * colorMix;
    keyLight.intensity += ((cinema ? 1.3 : 3.2) - keyLight.intensity) * colorMix;
    if (!A.reduced) {
      dust.rotation.y += delta * .016;
      orbitArc.rotation.z -= delta * .1;
      if (soundPlaying) recordMark.rotation.y += delta * 2;
    }
    const before = performance.now();
    renderer.render(scene, camera);
    if (performance.now() - before > 23 && $('#loungeQuality').value === 'auto') {
      if (++slowFrames > 50 && pixelCap > .8) { pixelCap = Math.max(.8, pixelCap - .15); slowFrames = 0; resize(); }
    }
    if (hoverPoint) {
      host.style.cursor = raycast(hoverPoint.x, hoverPoint.y) ? 'pointer' : 'grab';
      hoverPoint = null;
    }
    hotspots.forEach(({ element, position, projected }) => {
      projected.copy(position).project(camera);
      const x = (projected.x * .5 + .5) * viewportWidth;
      const y = (-projected.y * .5 + .5) * viewportHeight;
      element.hidden = projected.z > 1 || x < 25 || x > viewportWidth - 25 || y < 65 || y > viewportHeight - 70 || !!drag || playing;
      element.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
    });
    rendering = false;
    const moving = camera.position.distanceToSquared(desiredPosition) > .00002 || currentTarget.distanceToSquared(desiredTarget) > .00002;
    const changing = paletteMix > .001 || Math.abs(targetExposure - renderer.toneMappingExposure) > .001;
    if (needsRender || moving || changing || playing || autoOrbit || Math.abs(velocity.x) + Math.abs(velocity.y) > .002) frame = requestAnimationFrame(animate);
    else if (soundPlaying && !A.reduced) ambientTimer = setTimeout(() => { frame = requestAnimationFrame(animate); }, 32);
  }
  window.addEventListener('mambo:mode', () => {
    if (P.lite) renderLite();
    if (!worldReady) return;
    const p = modePalette[A.state.mode];
    targetPalette.bright.setHex(p.bright);
    targetPalette.seat.setHex(p.seat);
    targetPalette.wall.setHex(p.wall);
    paletteMix = 1;
    requestRender();
    refreshTextures().then(requestRender);
  });
  const updateModeLabel = () => {
    $('#loungeMode').textContent = A.state.mode.toUpperCase() + ' ↻';
    $('#loungeMode').setAttribute(
      'aria-label',
      `Current universe: ${A.state.mode}. Switch to the next mode.`,
    );
  };
  window.addEventListener('mambo:mode', updateModeLabel);
  window.addEventListener('mambo:motion', () => { if (A.reduced) setAutoOrbit(false); requestRender(); });
  window.addEventListener('mambo:performance', () => {
    stopTour(); setAutoOrbit(false); cancelAnimationFrame(frame); frame=0; clearTimeout(ambientTimer);
    if(P.lite)renderLite();else if(visible||isImmersive){ensureInit();requestRender();}
  });
  window.addEventListener('mambo:sound', e => { soundPlaying = e.detail.playing; requestRender(); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) resetGesture();
    lastTime = 0;
    requestRender();
  });
  new MutationObserver(() => { lastTime = 0; requestRender(); }).observe($('#modalBackdrop'), { attributes: true, attributeFilter: ['class'] });
  const preload = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    ensureInit();
    preload.disconnect();
  }, { rootMargin: '600px' });
  preload.observe(shell);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    document.body.classList.toggle('lounge-in-view', visible);
    lastTime = 0;
    if (visible) { if(!P.lite&&!worldReady)ensureInit();requestRender(); }
  }).observe(shell);
  updateModeLabel();
  updateHint();
  if(P.lite)renderLite();
})();
