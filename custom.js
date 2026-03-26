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

  function init() {
    if (isEditing()) return;
    initSlideshowControls();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
