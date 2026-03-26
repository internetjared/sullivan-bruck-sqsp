/* ============================================================
   SULLIVAN BRUCK ARCHITECTS — Squarespace 7.1 Custom JavaScript
   Site: sba-2.squarespace.com
   CDN:  https://sullivan-bruck-sqsp.pages.dev

   Rules:
   - Idempotent initialization (safe to run multiple times)
   - DOMContentLoaded entry point
   - Event delegation preferred
   - MutationObserver only when necessary, scoped narrowly
   - Edit-mode aware
   ============================================================ */

(function () {
  'use strict';

  /* --- Utility: detect edit mode --- */
  function isEditing() {
    return (
      document.body.classList.contains('sqs-is-page-editing') ||
      document.body.classList.contains('sqs-edit-mode-active') ||
      document.documentElement.classList.contains('squarespace-damask')
    );
  }

  /* --- Slide counter for Featured Projects slideshow --- */
  function initSlideCounter() {
    var section = document.querySelector('section[data-section-id="69c5859f3b7752712f05e4b0"]');
    if (!section) return;
    if (section.dataset.counterInit === 'true') return;
    section.dataset.counterInit = 'true';

    var slides = section.querySelectorAll('.slide.list-item');
    var totalSlides = slides.length;
    if (totalSlides === 0) return;

    // Create counter element
    var counter = document.createElement('div');
    counter.className = 'sba-slide-counter';
    counter.textContent = '1 / ' + totalSlides;

    // Insert into the slideshow gutter, between the arrows
    var gutter = section.querySelector('.slideshow-gutter');
    if (gutter) {
      gutter.appendChild(counter);
    }

    // Update counter when slides change
    function updateCounter() {
      var currentSlides = section.querySelectorAll('.slide.list-item');
      for (var i = 0; i < currentSlides.length; i++) {
        var transform = getComputedStyle(currentSlides[i]).transform;
        // Active slide has no -9999 translate
        if (transform === 'none' || (transform.indexOf('-9999') === -1 && transform.indexOf('9999') === -1)) {
          counter.textContent = (i + 1) + ' / ' + totalSlides;
          break;
        }
      }
    }

    // Listen for arrow clicks
    var arrows = section.querySelectorAll('.desktop-arrows button, .desktop-arrows a, .mobile-arrow-button');
    arrows.forEach(function (arrow) {
      arrow.addEventListener('click', function () {
        setTimeout(updateCounter, 150);
      });
    });

    // Also observe for slide changes via MutationObserver (scoped to slides container)
    var slidesContainer = section.querySelector('.slides');
    if (slidesContainer) {
      var observer = new MutationObserver(function () {
        updateCounter();
      });
      observer.observe(slidesContainer, { attributes: true, subtree: true, attributeFilter: ['style', 'class'] });
    }
  }

  /* --- Init: runs on DOMContentLoaded --- */
  function init() {
    if (isEditing()) return;
    initSlideCounter();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
