/* BCL site behaviour: nav, config-driven links, forms (temporary states), year */
(function () {
  var cfg = window.BCL_CONFIG || {};

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Populate config-driven links (data-cfg="key") */
  document.querySelectorAll('[data-cfg]').forEach(function (el) {
    var key = el.getAttribute('data-cfg');
    var val = cfg[key];
    if (!val) return;
    if (el.tagName === 'A') el.setAttribute('href', key === 'email' ? 'mailto:' + val : val);
    if (el.hasAttribute('data-cfg-text')) el.textContent = val;
  });

  /* Offer buttons: use specific Selar URL if set, else fall back to store (never broken) */
  document.querySelectorAll('[data-offer]').forEach(function (a) {
    var k = a.getAttribute('data-offer');
    var url = (cfg.offers && cfg.offers[k]) ? cfg.offers[k] : cfg.selarStore;
    if (url) a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });

  /* Simple validation helper */
  function validate(form) {
    var ok = true;
    form.querySelectorAll('[required]').forEach(function (f) {
      var wrap = f.closest('.field');
      var valid = f.type === 'checkbox' ? f.checked : f.value.trim() !== '';
      if (valid && f.type === 'email') valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value.trim());
      if (wrap) wrap.classList.toggle('invalid', !valid);
      if (!valid) ok = false;
    });
    return ok;
  }

  /* Newsletter + contact forms */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var kind = form.getAttribute('data-form'); // 'newsletter' | 'contact'
    var action = kind === 'newsletter' ? cfg.mailerliteActionUrl : cfg.contactFormActionUrl;
    var success = form.parentElement.querySelector('.form-success');

    // Honeypot anti-spam
    var hp = form.querySelector('[name="company_website"]');

    form.addEventListener('submit', function (e) {
      if (hp && hp.value) { e.preventDefault(); return; } // bot
      if (!validate(form)) { e.preventDefault(); return; }

      // If no endpoint configured yet -> controlled temporary state (no transmission)
      if (!action) {
        e.preventDefault();
        if (success) {
          success.classList.add('show');
          success.textContent = kind === 'newsletter'
            ? 'Thank you — your interest is noted. The sign-up will be activated once the BCL newsletter goes live.'
            : 'Thank you — your message has been captured. Email delivery is activated at launch; meanwhile please reach us at ' + (cfg.email || '');
        }
        form.reset();
        return;
      }
      // If endpoint configured, allow normal submit to that action.
      form.setAttribute('action', action);
      form.setAttribute('method', 'post');
    });
  });

  /* Footer year */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
