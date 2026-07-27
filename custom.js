/* ============================================================
   SULLIVAN BRUCK ARCHITECTS — Squarespace 7.1 Custom JavaScript
   Site: sba-2.squarespace.com
   CDN:  https://sullivan-bruck-sqsp.pages.dev
   ============================================================ */

(function () {
  'use strict';

  /* --- Portfolio project metadata (category + location per URL slug) ---
     Drives the filter bar and card location labels on the portfolio
     landing page. Baked in here so it works with no extra setup.
     To add a new project: add one line keyed by its URL slug.
     A Code Block defining window.SBA_PROJECTS on the page overrides this. */
  window.SBA_PROJECTS = window.SBA_PROJECTS || {
    // Multi-Family
    "luxe-125":                        { cat: "Multi-Family", loc: "The Highlands, NW Columbus" },
    "station-324":                     { cat: "Multi-Family", loc: "Italian Village, Columbus" },
    "flats-at-4200":                   { cat: "Multi-Family", loc: "Tampa, Florida" },
    "the-rise":                        { cat: "Multi-Family", loc: "Milo Grogan, Columbus" },
    "steelhouse":                      { cat: "Multi-Family", loc: "5th By Northwest, Columbus" },
    "liberty-grand":                   { cat: "Multi-Family", loc: "Powell, Ohio" },
    "the-broadview":                   { cat: "Multi-Family", loc: "Grandview Heights, Columbus" },
    "river-rich":                      { cat: "Multi-Family", loc: "Franklinton, Columbus" },
    "the-theodore":                    { cat: "Multi-Family", loc: "Bridge Park, Dublin" },
    "tuller-flats":                    { cat: "Multi-Family", loc: "Dublin, Ohio" },
    "the-barrett":                     { cat: "Multi-Family", loc: "Merion Village, Columbus" },
    "flats-on-vine":                   { cat: "Multi-Family", loc: "Arena District, Columbus" },
    "flats-ii":                        { cat: "Multi-Family", loc: "Arena District, Columbus" },
    "belmont":                         { cat: "Multi-Family", loc: "San Margherita, Columbus" },
    "the-dorchester":                  { cat: "Multi-Family", loc: "Grandview Yard, Grandview Heights" },
    "the-broadview-phase-2":           { cat: "Multi-Family", loc: "Grandview Heights, Columbus" },
    "luxe-88":                         { cat: "Multi-Family", loc: "NW Columbus, Ohio" },
    "station-73":                      { cat: "Multi-Family", loc: "Olde Detroit, Cleveland" },
    "the-brooks":                      { cat: "Multi-Family", loc: "Grandview Yard, Grandview Heights" },
    "aston":                           { cat: "Multi-Family", loc: "Victorian Village, Columbus" },
    "rich-street-walk":                { cat: "Multi-Family", loc: "Downtown Columbus" },
    "trotters-park":                   { cat: "Multi-Family", loc: "Harrison West, Columbus" },
    "the-province-at-boulder":         { cat: "Multi-Family", loc: "Boulder, Colorado" },
    "the-julian":                      { cat: "Multi-Family", loc: "River South, Downtown Columbus" },
    "lancaster-midtown":               { cat: "Multi-Family", loc: "Lancaster, Ohio" },
    "avery-pointe":                    { cat: "Multi-Family", loc: "Hilliard, Ohio" },
    "the-kipton":                      { cat: "Multi-Family", loc: "Grandview Heights, Columbus" },
    "harper-house":                    { cat: "Multi-Family", loc: "The Highlands, NW Columbus" },
    "8th-and-high":                    { cat: "Multi-Family", loc: "Columbus, Ohio" },
    "luxe-23":                         { cat: "Multi-Family", loc: "Columbus, Ohio" },
    "kendall-park-phase-2":            { cat: "Multi-Family", loc: "Columbus, Ohio" },
    "camden":                          { cat: "Multi-Family", loc: "Columbus, Ohio" },
    "centerfield-apartments":          { cat: "Multi-Family", loc: "Downtown Dayton, Ohio" },
    // Commercial
    "organ-cole":                      { cat: "Commercial", loc: "Marble Cliff, Ohio" },
    "st-charles-prep":                 { cat: "Commercial", loc: "Bexley, Ohio" },
    "standley-law":                    { cat: "Commercial", loc: "Dublin, Ohio" },
    // Single Family
    "private-residence-brick-house":   { cat: "Single Family", loc: "Upper Arlington, Ohio" },
    "private-residence-bridgehampton": { cat: "Single Family", loc: "Bridge Hampton, New York" },
    "delaware-residence":              { cat: "Single Family", loc: "Delaware, Ohio" },
    "heron-bay":                       { cat: "Single Family", loc: "Columbus, Ohio" },
    "north-of-broad":                  { cat: "Single Family", loc: "King Lincoln District, Columbus" },
    "private-residence-melaragno":     { cat: "Single Family", loc: "Columbus, Ohio" },
    "new-albany-renovation":           { cat: "Single Family", loc: "New Albany, Ohio" },
    "ravine-run-lot-4":                { cat: "Single Family", loc: "Columbus, Ohio" },
    "ravine-run-lot-5":                { cat: "Single Family", loc: "Columbus, Ohio" },
    "private-residence-upper-chelsea": { cat: "Single Family", loc: "Upper Arlington, Ohio" },
    "private-residence-white-house":   { cat: "Single Family", loc: "Upper Arlington, Ohio" }
  };

  function isEditing() {
    return (
      document.body.classList.contains('sqs-is-page-editing') ||
      document.body.classList.contains('sqs-edit-mode-active') ||
      document.documentElement.classList.contains('squarespace-damask')
    );
  }

  function initSlideshowControls() {
    var section = document.querySelector('section[data-section-id="69c5859f3b7752712f05e4b0"]');
    if (!section) return;
    if (section.dataset.controlsInit === 'true') return;
    section.dataset.controlsInit = 'true';

    var slides = section.querySelectorAll('.slide.list-item');
    var totalSlides = slides.length;
    if (totalSlides === 0) return;

    // Find the original arrow buttons (keep them functional but hidden)
    var leftContainer = section.querySelector('.arrow-container--left');
    var rightContainer = section.querySelector('.arrow-container--right');
    var leftBtn = leftContainer ? leftContainer.querySelector('button') : null;
    var rightBtn = rightContainer ? rightContainer.querySelector('button') : null;

    if (!leftBtn || !rightBtn) return;

    // Hide original arrow containers
    leftContainer.style.display = 'none';
    rightContainer.style.display = 'none';

    // Build custom controls: [← ] [ 1 / 4 ] [ → ]
    var controls = document.createElement('div');
    controls.className = 'sba-slideshow-controls';

    // Build clean arrow buttons from scratch (no cloning Squarespace's markup)
    var newLeft = document.createElement('button');
    newLeft.className = 'sba-arrow';
    newLeft.setAttribute('aria-label', 'Previous slide');
    newLeft.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M19 12H5M5 12L12 19M5 12L12 5"/></svg>';

    var newRight = document.createElement('button');
    newRight.className = 'sba-arrow';
    newRight.setAttribute('aria-label', 'Next slide');
    newRight.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg>';

    var counter = document.createElement('span');
    counter.className = 'sba-counter';
    counter.textContent = '1 / ' + totalSlides;

    controls.appendChild(newLeft);
    controls.appendChild(counter);
    controls.appendChild(newRight);

    // Append to slideshow-holder (not gutter) so it's inside the image bounds
    var holder = section.querySelector('.slideshow-holder');
    if (holder) {
      holder.style.position = 'relative';
      holder.appendChild(controls);
    }

    // Track current slide index manually
    var currentIndex = 0;

    // Click handlers — trigger original buttons and update index directly
    newLeft.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      leftBtn.click();
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      counter.textContent = (currentIndex + 1) + ' / ' + totalSlides;
    });

    newRight.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      rightBtn.click();
      currentIndex = (currentIndex + 1) % totalSlides;
      counter.textContent = (currentIndex + 1) + ' / ' + totalSlides;
    });

    // Clean up any old counter
    var oldCounter = section.querySelector('.sba-slide-counter');
    if (oldCounter) oldCounter.remove();
  }

  /* --- Contact form enhancements --- */
  function initContactEnhancements() {
    var section = document.querySelector('section[data-section-id="69c5863d2526b8252328c50c"]');
    if (!section) return;
    if (section.dataset.contactInit === 'true') return;
    section.dataset.contactInit = 'true';

    // Add send arrow icon to submit button (into the visible state span)
    var submitBtn = section.querySelector('button[type="submit"]');
    if (submitBtn) {
      // Squarespace uses .form-submit-button-state as the visible label
      var stateSpan = submitBtn.querySelector('.form-submit-button-state');
      var visibleText = stateSpan ? stateSpan.querySelector('span[aria-hidden="true"]') : null;
      var target = visibleText || stateSpan || submitBtn;
      if (target && !target.querySelector('.sba-send-icon')) {
        var arrow = document.createElement('span');
        arrow.className = 'sba-send-icon';
        arrow.innerHTML = ' <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg>';
        target.appendChild(arrow);
      }
    }

    // Add icons to phone and email links
    var phoneLink = section.querySelector('a[href^="tel"]');
    var emailLink = section.querySelector('a[href^="mailto"]');

    if (phoneLink && !phoneLink.classList.contains('sba-enhanced')) {
      phoneLink.classList.add('sba-enhanced');
      var phoneIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>';
      var wrapper = document.createElement('span');
      wrapper.className = 'sba-contact-icon';
      wrapper.innerHTML = phoneIcon;
      wrapper.appendChild(document.createTextNode(' ' + phoneLink.textContent));
      phoneLink.textContent = '';
      phoneLink.appendChild(wrapper);
    }

    if (emailLink && !emailLink.classList.contains('sba-enhanced')) {
      emailLink.classList.add('sba-enhanced');
      var emailIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>';
      var wrapper2 = document.createElement('span');
      wrapper2.className = 'sba-contact-icon';
      wrapper2.innerHTML = emailIcon;
      wrapper2.appendChild(document.createTextNode(' ' + emailLink.textContent));
      emailLink.textContent = '';
      emailLink.appendChild(wrapper2);
    }
  }

  /* --- Portfolio filter bar and category tagging ---
     Reads from window.SBA_PROJECTS config defined in a Code Block
     on the portfolio page. Each key is the project URL slug.
     Value: { cat: "Multi-Family", loc: "The Highlands, NW Columbus" }

     Client workflow for new projects:
     1. Add portfolio item normally (title + images)
     2. Copy the URL slug from the project settings
     3. Add one line to the Code Block config on the portfolio page
  */
  function initPortfolioFilters() {
    var gridSection = document.querySelector('[data-sqsp-section="portfolio-list"]');
    if (!gridSection) {
      gridSection = document.querySelector('section[data-section-id="6a4d1d0d85dd204cec53eb74"]');
    }
    if (!gridSection) return;
    if (gridSection.dataset.filtersInit === 'true') return;
    gridSection.dataset.filtersInit = 'true';

    var config = window.SBA_PROJECTS;
    if (!config) return;

    var grid = gridSection.querySelector('.portfolio-grid-overlay') ||
               gridSection.querySelector('.grid-wrapper');
    if (!grid) return;

    var gridItems = grid.querySelectorAll('.grid-item');
    if (gridItems.length === 0) return;

    var categorySet = {};

    gridItems.forEach(function (el) {
      var href = el.getAttribute('href') || '';
      var itemSlug = href.split('/').filter(Boolean).pop() || '';
      var data = config[itemSlug];
      if (!data) return;

      if (data.cat) {
        var catSlug = data.cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        el.dataset.category = catSlug;
        categorySet[catSlug] = data.cat;
      }

      if (data.loc) {
        var textContainer = el.querySelector('.portfolio-text');
        if (textContainer && !textContainer.querySelector('.sba-project-location')) {
          var loc = document.createElement('span');
          loc.className = 'sba-project-location';
          loc.textContent = data.loc;
          textContainer.appendChild(loc);
        }
      }
    });

    var categoryKeys = Object.keys(categorySet);
    if (categoryKeys.length === 0) return;

    // Deliberate order (matches the reference): Multi-Family,
    // Commercial, Single Family, then any others alphabetically.
    var preferred = ['multi-family', 'commercial', 'single-family'];
    categoryKeys.sort(function (a, b) {
      var ia = preferred.indexOf(a), ib = preferred.indexOf(b);
      if (ia === -1) ia = 99; if (ib === -1) ib = 99;
      return ia - ib || a.localeCompare(b);
    });

    var filterBar = document.createElement('div');
    filterBar.className = 'sba-filter-bar';

    var allBtn = document.createElement('button');
    allBtn.className = 'sba-filter-btn active';
    allBtn.dataset.filter = 'all';
    allBtn.textContent = 'All Projects';
    filterBar.appendChild(allBtn);

    categoryKeys.forEach(function (slug) {
      var btn = document.createElement('button');
      btn.className = 'sba-filter-btn';
      btn.dataset.filter = slug;
      btn.textContent = categorySet[slug];
      filterBar.appendChild(btn);
    });

    // Insert the bar directly before the grid inside its own parent
    // (.content). content-wrapper is a flex container, so inserting
    // there would place the bar BESIDE the grid instead of above it.
    grid.parentNode.insertBefore(filterBar, grid);

    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.sba-filter-btn');
      if (!btn) return;

      filterBar.querySelectorAll('.sba-filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      var filter = btn.dataset.filter;

      gridItems.forEach(function (card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('sba-hidden');
        } else {
          card.classList.add('sba-hidden');
        }
      });
    });
  }

  /* --- Project page prev / all / next navigation ---
     Injected automatically on every portfolio item page, built from
     the collection JSON. No per-project setup needed. */
  function initProjectNav() {
    if (!document.body.classList.contains('view-item')) return;
    if (!document.body.classList.contains('collection-6a4d1d0d85dd204cec53eb22')) return;
    if (document.querySelector('.sba-project-nav')) return;

    var sections = document.getElementById('sections');
    if (!sections) return;

    var path = window.location.pathname.replace(/\/$/, '');
    var collectionPath = path.substring(0, path.lastIndexOf('/'));
    if (!collectionPath) return;

    fetch(collectionPath + '?format=json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var items = data.items || (data.collection && data.collection.items) || [];
        if (items.length < 2) return;

        var index = -1;
        items.forEach(function (item, i) {
          if (item.fullUrl === path) index = i;
        });
        if (index === -1) return;

        var prev = items[(index - 1 + items.length) % items.length];
        var next = items[(index + 1) % items.length];

        var nav = document.createElement('div');
        nav.className = 'sba-project-nav';

        var prevLink = document.createElement('a');
        prevLink.href = prev.fullUrl;
        prevLink.innerHTML = '&larr; <span>Previous Project</span>';

        var allLink = document.createElement('a');
        allLink.href = collectionPath;
        allLink.className = 'sba-all-projects';
        allLink.innerHTML = '<span>All Projects</span>';

        var nextLink = document.createElement('a');
        nextLink.href = next.fullUrl;
        nextLink.innerHTML = '<span>Next Project</span> &rarr;';

        nav.appendChild(prevLink);
        nav.appendChild(allLink);
        nav.appendChild(nextLink);
        sections.appendChild(nav);
      })
      .catch(function () {});
  }

  /* --- Project page gallery slideshow ---
     Let Squarespace's native fullscreen slideshow run (it lazy-loads
     images as it advances and handles start/wrap correctly). We hide
     its default side arrows + bullet nav via CSS, and add a minimal
     bar of arrow icons BELOW the image whose clicks proxy the native
     prev/next buttons — so native advancement still loads every image
     (fixes the "black frames after 3-4 images" bug caused by the old
     takeover, which froze native advancement and left later lazy
     images unloaded). Client request: arrows below, minimal icons. */
  function initProjectGallerySlideshow() {
    if (!document.body.classList.contains('view-item')) return;
    if (!document.body.classList.contains('collection-6a4d1d0d85dd204cec53eb22')) return;

    var galleryScope = document.getElementById('gallery') || document;
    var ss = galleryScope.querySelector('.gallery-fullscreen-slideshow');
    if (!ss) return;
    if (ss.dataset.sbaNav === 'true') return;
    ss.dataset.sbaNav = 'true';

    var prevNative = ss.querySelector('button[data-previous]');
    var nextNative = ss.querySelector('button[data-next]');
    var bullets = ss.querySelectorAll('.gallery-fullscreen-slideshow-bullet');
    var total = bullets.length ||
      ss.querySelectorAll('.gallery-fullscreen-slideshow-item').length;
    if (!prevNative || !nextNative || total < 2) return;

    var bar = document.createElement('div');
    bar.className = 'sba-gallery-nav';

    var prevBtn = document.createElement('button');
    prevBtn.className = 'sba-gallery-arrow';
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M15 6L9 12L15 18"/></svg>';

    var counter = document.createElement('span');
    counter.className = 'sba-gallery-counter';
    counter.textContent = '1 / ' + total;

    var nextBtn = document.createElement('button');
    nextBtn.className = 'sba-gallery-arrow';
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25"><path d="M9 6L15 12L9 18"/></svg>';

    bar.appendChild(prevBtn);
    bar.appendChild(counter);
    bar.appendChild(nextBtn);

    // Place the bar right after the slideshow so it sits below the image
    var host = ss.parentNode;
    host.insertBefore(bar, ss.nextSibling);

    // Track the index ourselves — each arrow click maps 1:1 to a
    // native advance, and the native slideshow starts on slide 1 and
    // doesn't autoplay, so a manual counter stays in sync (reading the
    // native bullet state proved unreliable).
    var idx = 0;

    prevBtn.addEventListener('click', function (e) {
      e.preventDefault();
      prevNative.click();
      idx = (idx - 1 + total) % total;
      counter.textContent = (idx + 1) + ' / ' + total;
    });

    nextBtn.addEventListener('click', function (e) {
      e.preventDefault();
      nextNative.click();
      idx = (idx + 1) % total;
      counter.textContent = (idx + 1) + ' / ' + total;
    });
  }

  /* --- Footer social links → text labels ---
     The reference footer uses text links (Facebook, LinkedIn, ...),
     not icons. Squarespace's social-links block renders SVG icons,
     so we add a text label from each link's accessible name and
     hide the icon via CSS (.sba-textified). Site-wide (global footer). */
  function initFooterSocialLabels() {
    var footer = document.getElementById('footer-sections');
    if (!footer) return;

    var links = footer.querySelectorAll('.sqs-svg-icon--wrapper');
    links.forEach(function (a) {
      if (a.dataset.sbaText === 'true') return;
      a.dataset.sbaText = 'true';

      var label = a.getAttribute('aria-label') || a.getAttribute('title') || '';
      if (!label) {
        // Derive from the domain as a fallback
        var href = a.getAttribute('href') || '';
        var m = href.match(/([a-z]+)\.(com|net|org|io)/i);
        if (m) label = m[1];
      }
      label = label.replace(/-unauth$/i, '').trim();
      if (!label) return;

      a.classList.add('sba-textified');
      var span = document.createElement('span');
      span.className = 'sba-social-label';
      span.textContent = label.charAt(0).toUpperCase() + label.slice(1);
      a.appendChild(span);
    });
  }

  function init() {
    if (isEditing()) return;
    initSlideshowControls();
    initContactEnhancements();
    initPortfolioFilters();
    initProjectNav();
    initProjectGallerySlideshow();
    initFooterSocialLabels();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
