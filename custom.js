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

    // Add send arrow icon to submit button
    var submitBtn = section.querySelector('button[type="submit"]');
    if (submitBtn) {
      var label = submitBtn.querySelector('.form-submit-button-label');
      if (label && !label.querySelector('.sba-send-icon')) {
        var arrow = document.createElement('span');
        arrow.className = 'sba-send-icon';
        arrow.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12H19M19 12L12 5M19 12L12 19"/></svg>';
        label.appendChild(arrow);
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

  function init() {
    if (isEditing()) return;
    initSlideshowControls();
    initContactEnhancements();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
