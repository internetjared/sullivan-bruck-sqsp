/* ============================================================
   SULLIVAN BRUCK ARCHITECTS — Squarespace 7.1 Custom JavaScript
   Site: sba-2.squarespace.com
   CDN:  https://sullivan-bruck-sqsp.pages.dev
   ============================================================ */

(function () {
  'use strict';

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

    var filterBar = document.createElement('div');
    filterBar.className = 'sba-filter-bar';

    var allBtn = document.createElement('button');
    allBtn.className = 'sba-filter-btn active';
    allBtn.dataset.filter = 'all';
    allBtn.textContent = 'All Projects';
    filterBar.appendChild(allBtn);

    categoryKeys.sort().forEach(function (slug) {
      var btn = document.createElement('button');
      btn.className = 'sba-filter-btn';
      btn.dataset.filter = slug;
      btn.textContent = categorySet[slug];
      filterBar.appendChild(btn);
    });

    var contentWrapper = gridSection.querySelector('.content-wrapper');
    if (contentWrapper) {
      contentWrapper.insertBefore(filterBar, contentWrapper.firstChild);
    }

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

  /* --- Project page gallery slideshow controls ---
     The gallery section uses Squarespace's native Slideshow: Full
     layout. This moves the native prev/next buttons (handlers intact)
     into a custom controls bar with a counter, bottom-right, matching
     the reference .project-slideshow. Counter stays in sync with the
     native bullet nav (hidden via CSS) through a MutationObserver.
     Falls back to converting a masonry gallery if one is used. */
  function initProjectGallerySlideshow() {
    if (!document.body.classList.contains('view-item')) return;
    if (!document.body.classList.contains('collection-6a4d1d0d85dd204cec53eb22')) return;

    var ss = document.querySelector('.gallery-fullscreen-slideshow');
    if (ss) {
      if (ss.dataset.sbaControls === 'true') return;
      ss.dataset.sbaControls = 'true';

      var natControls = ss.querySelectorAll('.gallery-fullscreen-slideshow-control');
      var bullets = ss.querySelectorAll('.gallery-fullscreen-slideshow-bullet');
      var total = bullets.length ||
        ss.querySelectorAll('.gallery-fullscreen-slideshow-item').length;
      if (natControls.length < 2 || total < 2) return;

      // IMPORTANT: do NOT move the native buttons — Squarespace's
      // controller binds to them after our script runs, and moving
      // them breaks the binding. Hide them and proxy clicks instead
      // (same pattern as the homepage featured-projects slideshow).
      var prevNative = natControls[0].querySelector('button');
      var nextNative = natControls[1].querySelector('button');
      if (!prevNative || !nextNative) return;
      natControls[0].style.display = 'none';
      natControls[1].style.display = 'none';

      var bar = document.createElement('div');
      bar.className = 'sba-slideshow-controls';

      var prevBtn = document.createElement('button');
      prevBtn.className = 'sba-arrow';
      prevBtn.setAttribute('aria-label', 'Previous image');
      prevBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M19 12H5M5 12L12 19M5 12L12 5"/></svg>';

      var counter = document.createElement('span');
      counter.className = 'sba-counter';
      counter.textContent = '1 / ' + total;

      var nextBtn = document.createElement('button');
      nextBtn.className = 'sba-arrow';
      nextBtn.setAttribute('aria-label', 'Next image');
      nextBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg>';

      bar.appendChild(prevBtn);
      bar.appendChild(counter);
      bar.appendChild(nextBtn);
      ss.appendChild(bar);

      // Manual index tracking, with bullet-nav observer as the
      // authoritative sync when available
      var idx = 0;
      function setCounter(i) {
        counter.textContent = (i + 1) + ' / ' + total;
      }

      prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        prevNative.click();
        idx = (idx - 1 + total) % total;
        setCounter(idx);
      });

      nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        nextNative.click();
        idx = (idx + 1) % total;
        setCounter(idx);
      });

      function activeIndex() {
        for (var i = 0; i < bullets.length; i++) {
          var span = bullets[i].querySelector('.js-slideshow-active-slide');
          if (span && !span.hasAttribute('hidden')) return i;
        }
        return -1;
      }

      var bulletNav = ss.querySelector('.gallery-fullscreen-slideshow-bullet-nav');
      if (bulletNav && bullets.length) {
        new MutationObserver(function () {
          var i = activeIndex();
          if (i > -1) { idx = i; setCounter(i); }
        }).observe(bulletNav, {
          attributes: true,
          subtree: true,
          attributeFilter: ['hidden', 'class', 'aria-current']
        });
      }

      // Squarespace's controller initializes on the LAST slide (its
      // internal index starts at total-1). Once the controller has
      // bound, silently advance one slide to land on the true first
      // image, hiding the fade behind a brief opacity mask.
      var slideItems = ss.querySelectorAll('.gallery-fullscreen-slideshow-item');
      function visibleIndex() {
        for (var i = 0; i < slideItems.length; i++) {
          if (getComputedStyle(slideItems[i]).visibility === 'visible') return i;
        }
        return -1;
      }

      var tries = 0;
      var poll = setInterval(function () {
        tries++;
        var bound = (ss.getAttribute('data-controllers-bound') || '')
          .indexOf('GalleryFullscreenSlideshow') > -1;
        if (!bound && tries < 40) return;
        clearInterval(poll);
        if (bound && visibleIndex() === slideItems.length - 1) {
          ss.style.opacity = '0';
          nextNative.click();
          setTimeout(function () {
            ss.style.opacity = '';
            idx = 0;
            setCounter(0);
          }, 1300);
        }
      }, 150);
      return;
    }

    // Fallback: masonry gallery → fading slideshow
    var gallery = document.querySelector('.gallery-masonry');
    if (!gallery) return;
    if (gallery.dataset.sbaSlideshow === 'true') return;
    gallery.dataset.sbaSlideshow = 'true';

    var slides = gallery.querySelectorAll('.gallery-masonry-item');
    if (slides.length === 0) return;

    gallery.classList.add('sba-gallery-slideshow');

    var current = 0;
    slides[0].classList.add('sba-active');

    if (slides.length < 2) return;

    var controls = document.createElement('div');
    controls.className = 'sba-slideshow-controls';

    var prevBtn = document.createElement('button');
    prevBtn.className = 'sba-arrow';
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M19 12H5M5 12L12 19M5 12L12 5"/></svg>';

    var mCounter = document.createElement('span');
    mCounter.className = 'sba-counter';
    mCounter.textContent = '1 / ' + slides.length;

    var nextBtn = document.createElement('button');
    nextBtn.className = 'sba-arrow';
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg>';

    controls.appendChild(prevBtn);
    controls.appendChild(mCounter);
    controls.appendChild(nextBtn);
    gallery.appendChild(controls);

    function goTo(idx) {
      slides[current].classList.remove('sba-active');
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add('sba-active');
      mCounter.textContent = (current + 1) + ' / ' + slides.length;
    }

    prevBtn.addEventListener('click', function (e) {
      e.preventDefault();
      goTo(current - 1);
    });

    nextBtn.addEventListener('click', function (e) {
      e.preventDefault();
      goTo(current + 1);
    });
  }

  function init() {
    if (isEditing()) return;
    initSlideshowControls();
    initContactEnhancements();
    initPortfolioFilters();
    initProjectNav();
    initProjectGallerySlideshow();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
