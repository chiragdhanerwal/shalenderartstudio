// Shalender Art Studio - Basic Interactions

function shuffleArray(items) {
  const array = items.slice();
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function buildHeroCollage() {
  // Collage removed; replaced by hero slideshow
  return;
}

function startSlideshow() {
  const frame = document.getElementById('slideshow');
  if (!frame) return;

  const slides = [
    'assets/works/misc/ (1).webp',
    'assets/works/misc/ (2).webp',
    'assets/works/misc/ (3).webp',
    'assets/works/misc/ (4).webp',
    'assets/works/misc/ (5).webp',
    'assets/works/misc/ (6).webp',
    'assets/works/misc/ (7).webp',
    'assets/works/misc/ (8).webp',
    'assets/works/misc/ (9).webp',
    'assets/works/misc/ (10).webp',
    'assets/works/misc/ (11).webp',
    'assets/works/misc/ (12).webp',
    'assets/works/misc/ (13).webp',
    'assets/works/misc/ (14).webp',
    'assets/works/misc/ (15).webp',
    'assets/works/misc/ (16).webp',
    'assets/works/misc/ (17).webp',
    'assets/works/misc/ (18).webp',
    'assets/works/misc/ (19).webp',
    'assets/works/misc/ (20).webp',
    'assets/works/misc/ (21).webp',
    'assets/works/misc/ (22).webp',
    'assets/works/misc/ (23).webp',
    'assets/works/misc/ (24).webp',
    'assets/works/misc/ (25).webp',
    'assets/works/misc/ (26).webp',
    'assets/works/misc/ (27).webp',
    'assets/works/misc/ (28).webp',
    'assets/works/misc/ (29).webp',
    'assets/works/misc/ (30).webp'
  ];

  let index = 0;
  const img = document.createElement('img');
  img.alt = 'Showcase artwork';
  img.src = slides[index];
  frame.appendChild(img);

  setInterval(() => {
    index = (index + 1) % slides.length;
    img.src = slides[index];
  }, 2500);
}

document.addEventListener('DOMContentLoaded', () => {
  buildHeroCollage();
  startSlideshow();
  initHeaderScroll();
  markActiveNavLink();
  startHeroSlideshow();
  initServicesPage();
  initGalleryPage();
  initImageModal();
  initSectionGalleries();
  initMobileMenu();
  initMobileFooter();
});


function initHeaderScroll() {
  const header = document.querySelector('header.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function markActiveNavLink() {
  const links = document.querySelectorAll('.site-header .nav-links a');
  if (!links || links.length === 0) return;
  // Normalize current path (no query/hash)
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach((a) => {
    const href = a.getAttribute('href');
    // consider index.html and '' as same
    const normalized = href === '' ? 'index.html' : href;
    if (normalized === current) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    } else {
      a.classList.remove('is-active');
      a.removeAttribute('aria-current');
    }
  });
}

function startHeroSlideshow() {
  const container = document.getElementById('hero-slideshow');
  if (!container) return;

  const images = [
    'assets/home page images/1.webp',
    'assets/home page images/2.webp',
    'assets/home page images/3.webp',
    'assets/home page images/4.webp',
    'assets/home page images/5.webp',
    'assets/home page images/6.webp'
  ];

  let currentIndex = 0;
  let timerId = null;
  const slides = [];

  // Create two img layers to crossfade smoothly
  for (let i = 0; i < 2; i += 1) {
    const el = document.createElement('img');
    el.alt = 'Featured studio highlight';
    el.decoding = 'async';
    el.loading = 'eager';
    container.appendChild(el);
    slides.push(el);
  }

  function setSlide(imgEl, src, isActive) {
    imgEl.src = src;
    if (isActive) {
      imgEl.classList.add('is-active');
    } else {
      imgEl.classList.remove('is-active');
    }
  }

  function show(index) {
    const nextSrc = images[index];
    const [top, bottom] = slides;
    // swap roles: the non-active image gets the next src, then fade it in
    const nextEl = top.classList.contains('is-active') ? bottom : top;
    const prevEl = nextEl === top ? bottom : top;
    setSlide(nextEl, nextSrc, true);
    setSlide(prevEl, prevEl.src, false);
    currentIndex = index;
  }

  function next() {
    const idx = (currentIndex + 1) % images.length;
    show(idx);
  }

  function prev() {
    const idx = (currentIndex - 1 + images.length) % images.length;
    show(idx);
  }

  // initialize first two
  slides[0].src = images[0];
  slides[0].classList.add('is-active');
  slides[1].src = images[1 % images.length];

  // autoplay
  function startAutoplay() {
    stopAutoplay();
    timerId = setInterval(next, 4000);
  }
  function stopAutoplay() {
    if (timerId) clearInterval(timerId);
    timerId = null;
  }
  startAutoplay();

  // Controls
  const prevBtn = document.querySelector('.hero-prev');
  const nextBtn = document.querySelector('.hero-next');
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => { prev(); });
    nextBtn.addEventListener('click', () => { next(); });
  }

  // Keep autoplay continuous; no hover pause
}

function initServicesPage() {
  // Initialize service tabs functionality
  initServiceTabs();
  
  const grid = document.getElementById('clients-grid');
  const splitList = document.getElementById('client-names');
  const splitCollage = document.getElementById('client-collage');
  const isSplit = !!(splitList && splitCollage);
  if (!grid && !isSplit) return;

  const muralFallback = [
    'assets/murals/(1).webp', 'assets/murals/(2).webp', 'assets/murals/(3).webp',
    'assets/murals/(4).webp', 'assets/murals/(5).webp', 'assets/murals/(6).webp',
    'assets/murals/(7).webp', 'assets/murals/(8).webp', 'assets/murals/(9).webp',
    'assets/murals/(10).webp', 'assets/murals/(11).webp', 'assets/murals/(12).webp'
  ];
  const clientWorks = [
    'assets/client works/ (1).webp',
    'assets/client works/ (2).webp',
    'assets/client works/ (3).webp',
    'assets/client works/ (4).webp',
    'assets/client works/ (5).webp',
    'assets/client works/ (6).webp',
    'assets/client works/ (7).webp',
    'assets/client works/ (8).webp',
    'assets/client works/ (9).webp',
    'assets/client works/ (10).webp',
    'assets/client works/ (11).webp',
    'assets/client works/ (12).webp'
  ];

  const fallbackClients = [
    'South Assian University', 'Supreme Cort', 'Indian Railway', 'PC Jewellers',
    'Travel n Food Services.', 'Delhi Duty Free Services', 'Client Seven', 'Client Eight'
  ];

  const render = (clients) => {
    console.log('Rendering clients:', clients);
    const trimmed = clients.map(c => c.trim()).filter(Boolean);
    console.log('Trimmed clients:', trimmed);
    if (trimmed.length === 0) return;
    if (grid) grid.innerHTML = '';
    if (isSplit) {
      splitList.innerHTML = '';
      splitCollage.innerHTML = '';
    }

    // Prepare a non-repeating queue of images
    const tilesPool = (clientWorks.length ? clientWorks : muralFallback).slice();
    const queue = shuffleArray(tilesPool);

    trimmed.forEach((name) => {
      const imgSrc = queue.shift() || null;

      if (isSplit) {
        const li = document.createElement('li');
        li.textContent = name;
        splitList.appendChild(li);

        // Create a mix of sizes to achieve a masonry-like collage
        const sizes = ['tile', 'tile wide', 'tile tall', 'tile big'];
        const choose = () => sizes[Math.floor(Math.random() * sizes.length)];
        // add up to 2-3 tiles per client if available, without repeating
        const tilesToAdd = Math.min(3, queue.length + (imgSrc ? 1 : 0));
        for (let k = 0; k < tilesToAdd; k += 1) {
          const tile = document.createElement('div');
          tile.className = choose();
          const img = document.createElement('img');
          const src = k === 0 && imgSrc ? imgSrc : (queue.shift() || imgSrc);
          if (!src) break;
          console.log('Creating tile with image:', src, 'for client:', name);
          img.src = src;
          img.alt = `${name} project image`;
          img.onerror = () => console.error('Failed to load image:', src);
          img.onload = () => console.log('Successfully loaded image:', src);
          tile.appendChild(img);
          splitCollage.appendChild(tile);
        }
      } else if (grid) {
        const card = document.createElement('div');
        card.className = 'client-card';
        const thumb = document.createElement('div');
        thumb.className = 'client-thumb';
        const img = document.createElement('img');
        if (!imgSrc) return;
        console.log('Creating grid card with image:', imgSrc, 'for client:', name);
        img.src = imgSrc;
        img.alt = `${name} project image`;
        img.onerror = () => console.error('Failed to load grid image:', imgSrc);
        img.onload = () => console.log('Successfully loaded grid image:', imgSrc);
        thumb.appendChild(img);
        const caption = document.createElement('div');
        caption.className = 'client-name';
        caption.textContent = name;
        card.appendChild(thumb);
        card.appendChild(caption);
        grid.appendChild(card);
      }
    });
  };

  const clientTxtPath = 'assets/client list.txt';
  fetch(clientTxtPath)
    .then(r => r.ok ? r.text() : Promise.reject(new Error('load failed')))
    .then(text => {
      const lines = text.split(/\r?\n/);
      render(lines);
    })
    .catch(() => {
      console.log('Failed to load client list, using fallback');
      render(fallbackClients);
    });
}

// ---- Gallery ----
function initGalleryPage() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  const more = document.getElementById('gallery-more');
  const quickButtons = document.querySelectorAll('.gallery-quick');
  const prevBtn = document.getElementById('pg-prev');
  const nextBtn = document.getElementById('pg-next');
  const info = document.getElementById('pg-info');

  const PAGE_SIZE = 20;
  let allItems = [];
  let categories = new Set();
  let activeCategory = 'all';
  let page = 1;
  const HIDDEN_BY_DEFAULT = new Set(['misc', 'sketches', 'sketchs', 'media_cover', 'client works', 'client_works', 'sculptures', 'commition_works']);

  function computeCategories() {
    categories = new Set(allItems.map(x => x.category));
    const sorted = Array.from(categories).sort();
    // Build the dropdown while keeping hidden-by-default categories selectable
    more.innerHTML = '<option value="all">All</option>' + sorted.map(c => `<option value="${c}">${c}</option>`).join('');
  }

  function filterItems() {
    if (activeCategory === 'all') {
      return allItems.filter(x => !HIDDEN_BY_DEFAULT.has(String(x.category || '').toLowerCase()))
    }
    return allItems.filter(x => x.category === activeCategory);
  }

  function renderPage() {
    const items = filterItems();
    const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
    if (page > totalPages) page = totalPages;
    const start = (page - 1) * PAGE_SIZE;
    const slice = items.slice(start, start + PAGE_SIZE);

    grid.innerHTML = '';
    slice.forEach((it, idx) => {
      const card = document.createElement('div');
      card.className = 'gallery-item';

      const thumb = document.createElement('div');
      thumb.className = 'gallery-thumb';

      const img = document.createElement('img');
      img.src = encodePathSegments(it.path);
      img.alt = it.name;
      img.decoding = 'async';
      // Eager load a few images to avoid blanks at first paint
      img.loading = idx < 8 ? 'eager' : 'lazy';
      img.style.cursor = 'pointer';
      img.onerror = () => { card.remove(); };
      img.addEventListener('click', () => openLightbox(it));
      thumb.appendChild(img);

      // Also allow clicking anywhere on the thumbnail area
      thumb.addEventListener('click', () => openLightbox(it));

      const cap = document.createElement('div');
      cap.className = 'cap';
      // Show custom name first, then fallback to filename
      cap.textContent = it.name || getFileName(it.path) || `Artwork ${start + idx + 1}`;

      card.appendChild(thumb);
      card.appendChild(cap);
      grid.appendChild(card);
    });

    prevBtn.disabled = page <= 1;
    nextBtn.disabled = page >= totalPages;
    info.textContent = `Page ${page} / ${totalPages}`;

    // Ensure we start from top of the page after changing content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setCategory(cat) {
    activeCategory = cat;
    page = 1;
    renderPage();
  }

  function shuffle(arr) {
    return shuffleArray(arr);
  }

  function encodePathSegments(p) {
    // Normalize backslashes to forward slashes (manifest uses \\ on Windows)
    const normalized = (p || '').replace(/\\/g, '/');
    // Encode only path segments that may contain spaces or special chars
    // Keep forward slashes intact
    return normalized.split('/').map((seg, idx) => {
      if (idx < 2) return seg;
      try { return encodeURIComponent(seg); } catch { return seg; }
    }).join('/');
  }

  function getFileName(p) {
    const normalized = (p || '').replace(/\\/g, '/');
    const parts = normalized.split('/');
    return parts[parts.length - 1] || '';
  }

  // Events
  if (more) {
    more.addEventListener('change', () => setCategory(more.value));
  }
  quickButtons.forEach(btn => {
    btn.addEventListener('click', () => setCategory(btn.dataset.cat));
  });
  prevBtn && prevBtn.addEventListener('click', () => { if (page > 1) { page -= 1; renderPage(); } });
  nextBtn && nextBtn.addEventListener('click', () => { page += 1; renderPage(); });

  // Load manifest with fallback for file:// by injecting the JS manifest if available
  const loadJson = () => fetch('assets/works-manifest.json').then(r => r.json());
  const loadJs = () => new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'assets/works-manifest.js';
    s.onload = () => {
      if (window.WORKS_MANIFEST) resolve(window.WORKS_MANIFEST);
      else reject(new Error('No WORKS_MANIFEST'));
    };
    s.onerror = reject;
    document.head.appendChild(s);
  });

  (loadJson().catch(loadJs)).then(list => {
    allItems = shuffle(list);
    computeCategories();
    renderPage();
  }).catch(() => {
    allItems = [];
    computeCategories();
    renderPage();
  });
}

// ---- Image Modal ----
function initImageModal() {
  let modal = document.getElementById('image-modal');
  // If modal markup doesn't exist on this page, inject a minimal one
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.className = 'image-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <button class="modal-close" aria-label="Close modal">&times;</button>
        <div class="modal-image-container">
          <img id="modal-image" src="" alt="" />
        </div>
        <div class="modal-controls">
          <button class="zoom-in" aria-label="Zoom in">+</button>
          <button class="zoom-out" aria-label="Zoom out">-</button>
          <button class="zoom-reset" aria-label="Reset zoom">Reset</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  const modalImg = modal.querySelector('#modal-image');
  const closeBtn = modal.querySelector('.modal-close');
  const overlay = modal.querySelector('.modal-overlay');
  const zoomInBtn = modal.querySelector('.zoom-in');
  const zoomOutBtn = modal.querySelector('.zoom-out');
  const zoomResetBtn = modal.querySelector('.zoom-reset');
  
  let currentZoom = 1;
  let captionEl = null;
  
  function openModal(item) {
    // Encode path segments for the modal image
    const encodedPath = item.path.split('/').map((seg, idx) => {
      if (idx < 2) return seg;
      try { return encodeURIComponent(seg); } catch { return seg; }
    }).join('/');
    
    modalImg.src = encodedPath;
    modalImg.alt = item.name;
    currentZoom = 1;
    modalImg.style.transform = `scale(${currentZoom})`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Ensure lightbox styling and caption
    modal.classList.add('lightbox');
    if (!captionEl) {
      captionEl = document.createElement('div');
      captionEl.className = 'modal-caption';
      modal.querySelector('.modal-content').appendChild(captionEl);
    }
    captionEl.textContent = item.name || 'Artwork';
  }
  
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    currentZoom = 1;
    modalImg.style.transform = `scale(${currentZoom})`;
  }
  
  function zoomIn() {
    currentZoom = Math.min(currentZoom * 1.2, 3);
    modalImg.style.transform = `scale(${currentZoom})`;
  }
  
  function zoomOut() {
    currentZoom = Math.max(currentZoom / 1.2, 0.5);
    modalImg.style.transform = `scale(${currentZoom})`;
  }
  
  function resetZoom() {
    currentZoom = 1;
    modalImg.style.transform = `scale(${currentZoom})`;
  }
  
  // Event listeners
  closeBtn && closeBtn.addEventListener('click', closeModal);
  overlay && overlay.addEventListener('click', closeModal);
  zoomInBtn && zoomInBtn.addEventListener('click', zoomIn);
  zoomOutBtn && zoomOutBtn.addEventListener('click', zoomOut);
  zoomResetBtn && zoomResetBtn.addEventListener('click', resetZoom);
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
  
  // Make openModal globally available
  window.openModal = openModal;

  // Lightbox alias to keep semantics
  window.openLightbox = openModal;
}


// ---- Section Galleries (Murals, Commission, Sculptures) ----
function initSectionGalleries() {
  const section = document.querySelector('main.container .clients-section');
  if (!section) return;
  const galleryHost = document.createElement('div');
  galleryHost.id = 'section-grid';
  galleryHost.className = 'gallery-grid';
  // Determine which page/category
  const titleEl = section.querySelector('h2');
  if (!titleEl) return;
  const title = titleEl.textContent.trim().toLowerCase();
  const map = {
    'murals': 'murals',
    'commission works': 'commition_works',
    'sculptures': 'sculptures',
  };
  const key = map[title];
  if (!key) {
    // Training page: replace paragraph with info text
    if (title.includes('training')) {
      const p = section.querySelector('p');
      if (p) {
        p.innerHTML = 'We provide personalized, one-to-one and small-group art classes tailored to your goals — from foundational techniques to advanced studio practices. Flexible schedules, portfolio guidance, and workshop intensives available.';
      }
    }
    return;
  }

  // attach grid
  const existingP = section.querySelector('p');
  if (existingP) existingP.remove();
  section.appendChild(galleryHost);

  // Load from manifest and filter by category path
  const loadJson = () => fetch('assets/works-manifest.json').then(r => r.json());
  const loadJs = () => new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'assets/works-manifest.js';
    s.onload = () => { if (window.WORKS_MANIFEST) resolve(window.WORKS_MANIFEST); else reject(new Error('No WORKS_MANIFEST')); };
    s.onerror = reject;
    document.head.appendChild(s);
  });

  loadJs().then(list => {
    let items = list.filter(it => {
      const cat = String(it.category || '').toLowerCase();
      const path = (it.path || '').replace(/\\/g,'/');
      if (key === 'murals') return cat === 'murals' || path.includes('/murals/');
      if (key === 'commition_works') return cat === 'commition_works' || path.includes('/commition_works/');
      if (key === 'sculptures') return cat === 'sculptures' || path.includes('/works/sculptures/') || path.includes('/sculptures/');
      return false;
    });
    if (items.length === 0 && key === 'sculptures') {
      // Fallback: construct from known folder pattern
      const guesses = Array.from({ length: 20 }, (_, i) => i + 1)
        .map(n => ({ category: 'sculptures', path: `assets/works/sculptures/${n}.jpg`, name: `${n}.jpg` }));
      items = guesses;
    }
    renderSectionGrid(galleryHost, items);
  }).catch(() => {
    // fail silent
  });
}

function renderSectionGrid(host, items) {
  if (!host) return;
  host.innerHTML = '';
  const PAGE_SIZE = 40;
  const slice = items.slice(0, PAGE_SIZE);
  slice.forEach((it, idx) => {
    const card = document.createElement('div');
    card.className = 'gallery-item';
    const thumb = document.createElement('div');
    thumb.className = 'gallery-thumb';
    const img = document.createElement('img');
    img.src = encodePathSegmentsLocal(it.path);
    img.alt = it.name;
    img.loading = idx < 10 ? 'eager' : 'lazy';
    img.style.cursor = 'pointer';
    img.onerror = () => card.remove();
    img.addEventListener('click', () => openLightbox(it));
    thumb.appendChild(img);
    const cap = document.createElement('div');
    cap.className = 'cap';
    cap.textContent = it.name || getFileNameLocal(it.path);
    card.appendChild(thumb);
    card.appendChild(cap);
    host.appendChild(card);
  });
}

function encodePathSegmentsLocal(p) {
  const normalized = (p || '').replace(/\\/g, '/');
  return normalized.split('/').map((seg, idx) => idx < 2 ? seg : encodeURIComponent(seg)).join('/');
}
function getFileNameLocal(p) {
  const normalized = (p || '').replace(/\\/g, '/');
  const parts = normalized.split('/');
  return parts[parts.length - 1] || '';
}

// ---- Mobile Menu ----
function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (!mobileToggle || !mobileOverlay || !mobileNav) return;
  
  // Toggle mobile menu
  function toggleMobileMenu() {
    const isActive = mobileToggle.classList.contains('active');
    
    if (isActive) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }
  
  function openMobileMenu() {
    mobileToggle.classList.add('active');
    mobileOverlay.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Mark active page in mobile nav
    markActiveMobileNavLink();
  }
  
  function closeMobileMenu() {
    mobileToggle.classList.remove('active');
    mobileOverlay.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  function markActiveMobileNavLink() {
    const mobileLinks = mobileNav.querySelectorAll('a');
    const current = location.pathname.split('/').pop() || 'index.html';
    
    mobileLinks.forEach((a) => {
      const href = a.getAttribute('href');
      const normalized = href === '' ? 'index.html' : href;
      if (normalized === current) {
        a.classList.add('is-active');
      } else {
        a.classList.remove('is-active');
      }
    });
  }
  
  // Event listeners
  mobileToggle.addEventListener('click', toggleMobileMenu);
  
  // Close menu when clicking on overlay background
  mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) {
      closeMobileMenu();
    }
  });
  
  // Close menu when clicking on a link
  mobileNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      closeMobileMenu();
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  // Handle window resize - close mobile menu if switching to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileOverlay.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}

// ---- Mobile Footer ----
function initMobileFooter() {
  function handleFooterLayout() {
    const servicesCol = document.querySelector('.footer-col:nth-child(2)');
    const followUsSection = document.querySelector('.follow-us-section');
    
    if (!servicesCol || !followUsSection) return;
    
    // Remove any existing mobile follow us
    const existingMobileFollowUs = servicesCol.querySelector('.mobile-follow-us');
    if (existingMobileFollowUs) {
      existingMobileFollowUs.remove();
    }
    
    // Check if we're on mobile (768px or less)
    if (window.innerWidth <= 768) {
      // Clone the Follow Us section for mobile
      const mobileFollowUs = followUsSection.cloneNode(true);
      mobileFollowUs.className = 'mobile-follow-us';
      
      // Append to Services column
      servicesCol.appendChild(mobileFollowUs);
    }
  }
  
  // Initial setup
  handleFooterLayout();
  
  // Handle window resize
  window.addEventListener('resize', handleFooterLayout);
}

// ---- Service Tabs Functionality ----
function initServiceTabs() {
  const serviceTabs = document.querySelectorAll('.service-tab');
  if (!serviceTabs || serviceTabs.length === 0) return;
  
  // Check if we're on the main services page or individual service pages
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const isMainServicesPage = currentPage === 'services.html';
  
  if (isMainServicesPage) {
    // On main services page, no tabs should be active (they're navigation links)
    serviceTabs.forEach(tab => tab.classList.remove('active'));
  } else {
    // On individual service pages, mark the current page tab as active
    serviceTabs.forEach(tab => {
      const href = tab.getAttribute('href');
      if (href === currentPage) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }
  
  // Add click event listeners to all tabs
  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // For navigation tabs, let the default link behavior work
      // The active state will be set when the new page loads
    });
  });
}

