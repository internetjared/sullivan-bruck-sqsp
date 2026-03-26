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

  function isEditing() {
    return (
      document.body.classList.contains('sqs-is-page-editing') ||
      document.body.classList.contains('sqs-edit-mode-active') ||
      document.documentElement.classList.contains('squarespace-damask')
    );
  }

  /* --- Featured Projects slideshow controls ---
     Rebuilds the arrow containers into a single flex row:
     [← ] [ 1 / 4 ] [ → ]
     Positioned bottom-right, matching the wireframe exactly.
  */
  function initSlideshowControls() {
    var section = document.querySelector('section[data-section-id="69c5859f3b7752712f05e4b0"]');
    if (!section) return;
    if (section.dataset.controlsInit === 'true') return;
    section.dataset.controlsInit = 'true';

    var slides = section.querySelectorAll('.slide.list-item');
    var totalSlides = slides.length;
    if (totalSlides === 0) return;

    // Find the original arrow buttons
    var leftContainer = section.querySelector('.arrow-container--left');
    var rightContainer = section.querySelector('.arrow-container--right');
    var leftBtn = leftContainer ? leftContainer.querySelector('button') : null;
    var rightBtn = rightContainer ? rightContainer.querySelector('button') : null;

    if (!leftBtn || !rightBtn) return;

    // Hide the original arrow containers
    leftContainer.style.display = 'none';
    rightContainer.style.display = 'none';

    // Create new unified controls bar
    var controls = document.createElement('div');
    controls.className = 'sba-slideshow-controls';

    // Clone the arrow buttons into our new bar
    var newLeft = leftBtn.cloneNode(true);
    var newRight = rightBtn.cloneNode(true);
    newLeft.className = 'sba-arrow';
    newRight.className = 'sba-arrow';

    // Remove the gold background divs that Squarespace nests inside
    [newLeft, newRight].forEach(function (btn) {
      var bgDivs = btn.querySelectorAll('div');
      bgDivs.forEach(function (d) { d.remove(); });
    });

    // Counter
    var counter = document.createElement('span');
    counter.className = 'sba-counter';
    counter.textContent = '1 / ' + totalSlides;

    controls.appendChild(newLeft);
    controls.appendChild(counter);
    controls.appendChild(newRight);

    // Insert into the slideshow gutter
    var gutter = section.querySelector('.slideshow-gutter');
    if (gutter) {
      gutter.appendChild(controls);
    }

    // Wire up click events — trigger the original hidden buttons
    newLeft.addEventListener('click', function (e) {
      e.preventDefault();
      leftBtn.click();
      setTimeout(updateCounter, 200);
    });

    newRight.addEventListener('click', function (e) {
      e.preventDefault();
      rightBtn.click();
      setTimeout(updateCounter, 200);
    });

    function updateCounter() {
      var currentSlides = section.querySelectorAll('.slide.list-item');
      for (var i = 0; i < currentSlides.length; i++) {
        var transform = getComputedStyle(currentSlides[i]).transform;
        if (transform === 'none' || (transform.indexOf('-9999') === -1 && transform.indexOf('9999') === -1)) {
          counter.textContent = (i + 1) + ' / ' + totalSlides;
          break;
        }
      }
    }

    // Observe slide changes
    var slidesContainer = section.querySelector('.slides');
    if (slidesContainer) {
      var observer = new MutationObserver(function () {
        updateCounter();
      });
      observer.observe(slidesContainer, { attributes: true, subtree: true, attributeFilter: ['style', 'class'] });
    }

    // Remove any old counter element
    var oldCounter = section.querySelector('.sba-slide-counter');
    if (oldCounter) oldCounter.remove();
  }

  function init() {
    if (isEditing()) return;
    initSlideshowControls();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
