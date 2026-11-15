/**
 * GREEN SPOT — Luxury Editorial & Interactive Script
 * Sincronización del Simulador Cítrico, Hotspots de Anatomía,
 * Nichos con iluminación focalizada y Navegación Responsive (Android & iOS).
 */

document.addEventListener('DOMContentLoaded', () => {
  initAnatomyHotspots();
  initCitrusSimulator();
  initMuseumNiches();
  initNavbarScroll();
  initMobileDrawer();
});

/* ===================================================================
   1. ANATOMÍA DE LA BOTELLA: HOTSPOTS INTERACTIVOS
   =================================================================== */
function initAnatomyHotspots() {
  const hotspots = document.querySelectorAll('.hotspot-point');
  const cards = document.querySelectorAll('.anatomy-card');

  function activate(index) {
    hotspots.forEach((h, i) => {
      if (i === index) h.classList.add('active');
      else h.classList.remove('active');
    });
    cards.forEach((c, i) => {
      if (i === index) c.classList.add('active');
      else c.classList.remove('active');
    });
  }

  hotspots.forEach((h, idx) => {
    h.addEventListener('mouseenter', () => activate(idx));
    h.addEventListener('click', (e) => {
      e.stopPropagation();
      activate(idx);
    });
    h.addEventListener('touchstart', (e) => {
      activate(idx);
    }, { passive: true });
  });

  cards.forEach((c, idx) => {
    c.addEventListener('mouseenter', () => activate(idx));
    c.addEventListener('click', () => activate(idx));
    c.addEventListener('touchstart', () => activate(idx), { passive: true });
  });
}

/* ===================================================================
   2. EL SIMULADOR DEL MAESTRO CÍTRICO (Inspired by Flor de Arauca)
   =================================================================== */
function initCitrusSimulator() {
  const slider = document.getElementById('temp-slider');
  const tempDisplay = document.getElementById('temp-display');
  const barAcidity = document.getElementById('bar-acidity');
  const valAcidity = document.getElementById('val-acidity');
  const barSweetness = document.getElementById('bar-sweetness');
  const valSweetness = document.getElementById('val-sweetness');
  const barBody = document.getElementById('bar-body');
  const valBody = document.getElementById('val-body');
  const barAroma = document.getElementById('bar-aroma');
  const valAroma = document.getElementById('val-aroma');
  const diagnosticText = document.getElementById('diagnostic-text');
  const bottleImg = document.getElementById('sim-bottle-img');
  const chips = document.querySelectorAll('.tasting-chip');

  if (!slider) return;

  const profiles = [
    {
      maxTemp: 1.5,
      acidity: { percent: 88, text: 'Vibrante Glacial (88%)' },
      sweetness: { percent: 62, text: 'Atenuado por frío (62%)' },
      body: { percent: 75, text: 'Crujiente (75%)' },
      aroma: { percent: 65, text: 'Retenido en frío (65%)' },
      diagnostic: 'Temperatura escarchada: La baja temperatura realza la frescura cristalina y la acidez cítrica pura, reduciendo la percepción de azúcares.',
      bottleScale: 0.98,
      bottleFilter: 'brightness(1.1) drop-shadow(0 20px 25px rgba(0, 200, 255, 0.35))'
    },
    {
      maxTemp: 4.5,
      acidity: { percent: 68, text: 'Equilibrada Valencia (68%)' },
      sweetness: { percent: 84, text: 'Néctar Natural (84%)' },
      body: { percent: 92, text: 'Sedoso con Pulpa (92%)' },
      aroma: { percent: 98, text: 'Azahar Supremo (98%)' },
      diagnostic: '¡Punto Óptimo Gourmet (3°C a 4°C)! Liberación perfecta de aceites esenciales de la corteza y carotenoides. El dulzor del sol y la textura de la pulpa alcanzan su clímax.',
      bottleScale: 1.05,
      bottleFilter: 'brightness(1.05) drop-shadow(0 25px 35px rgba(234, 88, 12, 0.45))'
    },
    {
      maxTemp: 10,
      acidity: { percent: 45, text: 'Suave & Cálida (45%)' },
      sweetness: { percent: 94, text: 'Miel Concentrada (94%)' },
      body: { percent: 80, text: 'Denso Aterciopelado (80%)' },
      aroma: { percent: 82, text: 'Notas Florales Maduras (82%)' },
      diagnostic: 'Temperatura templada: El perfil pasa a dominar por azúcares y tonos de caramelo cítrico, ideal para maridajes con postres o mixología.',
      bottleScale: 1.0,
      bottleFilter: 'brightness(1.0) drop-shadow(0 20px 25px rgba(234, 88, 12, 0.25))'
    }
  ];

  function updateSimulator(temp) {
    if (tempDisplay) tempDisplay.textContent = `${temp.toFixed(1)}°C`;

    let profile = profiles[1];
    if (temp <= profiles[0].maxTemp) profile = profiles[0];
    else if (temp > profiles[1].maxTemp) profile = profiles[2];

    if (barAcidity) barAcidity.style.width = `${profile.acidity.percent}%`;
    if (valAcidity) valAcidity.textContent = profile.acidity.text;

    if (barSweetness) barSweetness.style.width = `${profile.sweetness.percent}%`;
    if (valSweetness) valSweetness.textContent = profile.sweetness.text;

    if (barBody) barBody.style.width = `${profile.body.percent}%`;
    if (valBody) valBody.textContent = profile.body.text;

    if (barAroma) barAroma.style.width = `${profile.aroma.percent}%`;
    if (valAroma) valAroma.textContent = profile.aroma.text;

    if (diagnosticText) diagnosticText.textContent = profile.diagnostic;

    if (bottleImg) {
      bottleImg.style.transform = `scale(${profile.bottleScale})`;
      bottleImg.style.filter = profile.bottleFilter;
    }
  }

  const onSliderChange = (e) => {
    updateSimulator(parseFloat(e.target.value));
  };

  slider.addEventListener('input', onSliderChange);
  slider.addEventListener('change', onSliderChange);

  // Tasting chips interactive toggling (touch & click)
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
    });
  });

  // Initial state at 3°C
  updateSimulator(3.0);
}

/* ===================================================================
   3. GALERÍA DE NICHOS DE MUSEO (Touch & Hover Spotlight)
   =================================================================== */
function initMuseumNiches() {
  const niches = document.querySelectorAll('.niche-item');
  if (!niches.length) return;

  function activateNiche(activeNiche) {
    niches.forEach((n) => n.classList.remove('active'));
    activeNiche.classList.add('active');
  }

  niches.forEach((niche) => {
    niche.addEventListener('mouseenter', () => activateNiche(niche));
    niche.addEventListener('click', () => activateNiche(niche));
    niche.addEventListener('touchstart', () => activateNiche(niche), { passive: true });
  });

  // On touch swipe inside wall grid, auto-activate nearest niche
  const wallGrid = document.querySelector('.niches-wall-grid');
  if (wallGrid) {
    let scrollTimeout;
    wallGrid.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const gridRect = wallGrid.getBoundingClientRect();
        const centerX = gridRect.left + gridRect.width / 2;

        let closest = null;
        let minDiff = Infinity;

        niches.forEach((niche) => {
          const rect = niche.getBoundingClientRect();
          const nicheCenterX = rect.left + rect.width / 2;
          const diff = Math.abs(centerX - nicheCenterX);
          if (diff < minDiff) {
            minDiff = diff;
            closest = niche;
          }
        });

        if (closest) {
          activateNiche(closest);
        }
      }, 100);
    }, { passive: true });
  }

  // Default active niche
  niches[0].classList.add('active');
}

/* ===================================================================
   4. NAVBAR SCROLL EFFECT
   =================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ===================================================================
   5. MOBILE DRAWER NAVIGATION (iOS Safari & Android Optimized)
   =================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const closeBtn = document.getElementById('drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const links = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta');

  if (!drawer || !toggleBtn) return;

  function openDrawer() {
    drawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  links.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}
