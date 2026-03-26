/* ============================================================
   SULLIVAN BRUCK ARCHITECTS — Squarespace 7.1 Custom JavaScript
   Site: sba-2.squarespace.com
   CDN:  TBD (Cloudflare Pages)

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

  /* --- Init: runs on DOMContentLoaded --- */
  function init() {
    if (isEditing()) return;

    // Future enhancements go here.
    // Each feature should be its own function,
    // guarded with idempotent checks.
  }

  document.addEventListener('DOMContentLoaded', init);
})();
