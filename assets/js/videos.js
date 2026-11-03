var videoTrack = document.getElementById('video-track');
var videoButtons = document.querySelectorAll('[data-video-direction]');

function updateVideoButtons() {
  videoButtons[0].disabled = videoTrack.scrollLeft <= 1;
  videoButtons[1].disabled = videoTrack.scrollLeft + videoTrack.clientWidth >= videoTrack.scrollWidth - 1;
}

videoButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var card = videoTrack.querySelector('.video-card');
    var step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(videoTrack).columnGap);
    videoTrack.scrollBy({left: Number(button.dataset.videoDirection) * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  });
});
videoTrack.addEventListener('scroll', updateVideoButtons, {passive: true});
window.addEventListener('resize', updateVideoButtons);
updateVideoButtons();

videoTrack.addEventListener('click', function (event) {
  var button = event.target.closest('[data-video]');
  if (!button) return;
  var player = document.createElement('iframe');
  player.src = 'https://www.youtube-nocookie.com/embed/' + button.dataset.video + '?autoplay=1';
  player.title = button.getAttribute('aria-label').replace(/^Play /, '');
  player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  player.allowFullscreen = true;
  player.referrerPolicy = 'strict-origin-when-cross-origin';
  button.replaceWith(player);
  player.focus();
});
