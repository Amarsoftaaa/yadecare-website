/* navbar.js — Handles smooth scrolling for all anchor links in the
   navbar and marks the active section link as the user scrolls. */

'use strict';

/** Smooth-scroll every in-page anchor link. */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/** Highlight the nav link whose section is currently in view. */
function initActiveNav() {
  var navLinks = document.querySelectorAll('header nav a[href^="#"]');
  var sections = Array.from(navLinks)
    .map(function (l) { return document.querySelector(l.getAttribute('href')); })
    .filter(Boolean);

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (l) { l.classList.remove('nav-active'); });
        var active = document.querySelector('header nav a[href="#' + entry.target.id + '"]');
        if (active) active.classList.add('nav-active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(function (s) { observer.observe(s); });
}

document.addEventListener('DOMContentLoaded', function () {
  initSmoothScroll();
  initActiveNav();
});
