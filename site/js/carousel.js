/* carousel.js — Reviews data, carousel rendering, slide navigation,
   auto-play timer, touch swipe support, and dot indicators. */

'use strict';

var REVIEWS = [
  {
    text:   'Das Team von YadeCare hat meiner Mutter das Leben erleichtert. Immer p\u00fcnktlich, immer freundlich \u2013 wir k\u00f6nnten uns keinen besseren Pflegedienst vorstellen.',
    author: 'Maria S.',
    city:   'M\u00fcnchen'
  },
  {
    text:   'Professionelle und herzliche Pflege. Wir f\u00fchlen uns in den besten H\u00e4nden. Die Pflegekr\u00e4fte behandeln meinen Vater mit gro\u00dfem Respekt und viel Einf\u00fchlungsverm\u00f6gen.',
    author: 'Thomas K.',
    city:   'M\u00fcnchen'
  },
  {
    text:   'Nach dem Krankenhausaufenthalt meines Vaters hat YadeCare uns sofort geholfen. Unkompliziert, schnell und absolut professionell. Sehr empfehlenswert!',
    author: 'Anna L.',
    city:   'M\u00fcnchen'
  },
  {
    text:   'Endlich ein Pflegedienst, dem wir wirklich vertrauen k\u00f6nnen. Das gesamte Team ist engagiert, zuverl\u00e4ssig und geht auf alle W\u00fcnsche ein. Herzlichen Dank!',
    author: 'Herbert M.',
    city:   'M\u00fcnchen'
  }
];

var STAR = '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">' +
  '<path d="M10 1L12.39 7.26L19 8.27L14 13.14L15.18 20.02L10 16.77L4.82 20.02L6 13.14L1 8.27L7.61 7.26L10 1Z"/>' +
  '</svg>';

var currentSlide  = 0;
var carouselTimer = null;

/** Move carousel to the given slide index. */
function goToSlide(idx) {
  currentSlide = (idx + REVIEWS.length) % REVIEWS.length;

  var track = document.getElementById('carouselTrack');
  if (track) track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

  document.querySelectorAll('.dot').forEach(function (dot, i) {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() { goToSlide(currentSlide + 1); }

function startCarousel() {
  stopCarousel();
  carouselTimer = setInterval(nextSlide, 5000);
}

function stopCarousel() {
  if (carouselTimer) { clearInterval(carouselTimer); carouselTimer = null; }
}

/** Build slide HTML and dot buttons, then wire up interactions. */
function renderCarousel() {
  var track  = document.getElementById('carouselTrack');
  var dotsEl = document.getElementById('carouselDots');
  if (!track || !dotsEl) return;

  track.innerHTML = REVIEWS.map(function (review) {
    return (
      '<div class="review-slide">' +
        '<div class="review-box">' +
          '<div class="stars">' + STAR.repeat(5) + '</div>' +
          '<p class="review-quote">\u201e' + review.text + '\u201c</p>' +
          '<div class="review-author">' + review.author + ' \u00b7 ' + review.city + '</div>' +
        '</div>' +
      '</div>'
    );
  }).join('');

  /* Create dot buttons with event listeners (no inline onclick). */
  dotsEl.innerHTML = '';
  REVIEWS.forEach(function (_, i) {
    var btn = document.createElement('button');
    btn.className   = 'dot' + (i === 0 ? ' active' : '');
    btn.setAttribute('aria-label', 'Rezension ' + (i + 1));
    btn.addEventListener('click', function () {
      goToSlide(i);
      startCarousel();
    });
    dotsEl.appendChild(btn);
  });
}

/** Touch swipe: swipe left → next, swipe right → previous. */
function initSwipe() {
  var track = document.getElementById('carouselTrack');
  if (!track) return;

  var startX = 0;
  track.addEventListener('touchstart', function (e) {
    startX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', function (e) {
    var delta = startX - e.changedTouches[0].screenX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? nextSlide() : goToSlide(currentSlide - 1);
      startCarousel();
    }
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', function () {
  renderCarousel();

  var wrap = document.getElementById('carouselWrap');
  if (wrap) {
    wrap.addEventListener('mouseenter', stopCarousel);
    wrap.addEventListener('mouseleave', startCarousel);
  }

  initSwipe();
  startCarousel();
});
