// mobile nav toggle
document.addEventListener('click', function (e) {
  var toggle = e.target.closest('.nav-toggle');
  if (toggle) {
    var nav = document.querySelector('.nav');
    if (nav) {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    }
    return;
  }
  // mobile dropdown: tap to expand when in mobile layout
  var dt = e.target.closest('.dropdown-toggle');
  if (dt) {
    e.preventDefault();
    var item = dt.closest('.has-dropdown');
    var expanded = window.matchMedia('(max-width:860px)').matches ? item.classList.toggle('open') : true;
    if (expanded) item.classList.add('open');
    dt.setAttribute('aria-expanded', String(expanded));
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key !== 'Escape') return;
  var activeMenu = document.activeElement.closest('.has-dropdown.open');
  var activeNav = document.activeElement.closest('.nav.open');
  if (activeNav) activeNav.querySelector('.nav-toggle').focus();
  else if (activeMenu) activeMenu.querySelector('.dropdown-toggle').focus();
  document.querySelectorAll('.has-dropdown.open, .nav.open').forEach(function (el) { el.classList.remove('open'); });
  document.querySelectorAll('[aria-expanded="true"]').forEach(function (el) { el.setAttribute('aria-expanded', 'false'); });
});

// current year in footer
document.querySelectorAll('[data-year]').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Keep visual hover state and the accessible state in sync.
document.querySelectorAll('.has-dropdown').forEach(function (item) {
  var toggle = item.querySelector('.dropdown-toggle');
  item.addEventListener('mouseenter', function () {
    if (window.matchMedia('(max-width:860px)').matches) return;
    item.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  });
  item.addEventListener('mouseleave', function () {
    if (window.matchMedia('(max-width:860px)').matches || item.contains(document.activeElement)) return;
    item.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
  item.addEventListener('focusout', function (event) {
    if (item.contains(event.relatedTarget)) return;
    item.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});
