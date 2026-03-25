/* animations.js — Intersection Observer driven scroll animations
   (.fade-up visibility toggling) and animated stat counters. */

'use strict';

/** Observe all .fade-up elements and add .visible when they enter
    the viewport. Each element is unobserved after its first reveal. */
function initFadeUp() {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-up').forEach(function (el) {
    observer.observe(el);
  });
}

/** Animate a single [data-target] element from 0 to its target value
    using an ease-out cubic curve over ~1800 ms. */
function animateStat(el) {
  var target = parseInt(el.dataset.target, 10);
  var suffix = el.dataset.suffix || '';
  var t0 = null;

  function tick(now) {
    if (!t0) t0 = now;
    var progress = Math.min((now - t0) / 1800, 1);
    var eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/** Watch the stats row; start all counters when it scrolls into view. */
function initStatCounters() {
  var statsRow = document.getElementById('statsRow');
  if (!statsRow) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(animateStat);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(statsRow);
}

document.addEventListener('DOMContentLoaded', function () {
  initFadeUp();
  initStatCounters();
});
