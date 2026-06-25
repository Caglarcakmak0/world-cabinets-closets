// mobile nav toggle
document.addEventListener('click', function (e) {
  var toggle = e.target.closest('.nav-toggle');
  if (toggle) {
    var nav = document.querySelector('.nav');
    if (nav) nav.classList.toggle('open');
    return;
  }
  // mobile dropdown: tap to expand when in mobile layout
  var dt = e.target.closest('.dropdown-toggle');
  if (dt && window.matchMedia('(max-width:860px)').matches) {
    e.preventDefault();
    dt.closest('.has-dropdown').classList.toggle('open');
  }
});

// contact form — no backend; graceful confirmation
document.addEventListener('submit', function (e) {
  var form = e.target.closest('#contact-form');
  if (!form) return;
  e.preventDefault();
  var btn = form.querySelector('[type=submit]');
  if (btn) { btn.textContent = 'Thank you — we’ll be in touch!'; btn.disabled = true; }
  form.reset();
});

// current year in footer
document.querySelectorAll('[data-year]').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});
