/* navbar.js — Hamburger toggle, scroll-shadow, smooth scrolling,
   and active section highlighting. */

'use strict';

/* ── Hamburger menu ─────────────────────────────────────────── */
function initHamburger() {
  var burger = document.getElementById('navBurger');
  var links  = document.getElementById('navLinks');
  if (!burger || !links) return;

  function openMenu() {
    links.classList.add('nav-open');
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Men\u00fc schlie\u00dfen');
    document.body.classList.add('nav-body-lock');
  }

  function closeMenu() {
    links.classList.remove('nav-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Men\u00fc \u00f6ffnen');
    document.body.classList.remove('nav-body-lock');
  }

  burger.addEventListener('click', function () {
    if (links.classList.contains('nav-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  /* Close when any nav link is clicked */
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && links.classList.contains('nav-open')) {
      closeMenu();
      burger.focus();
    }
  });
}

/* ── Scroll shadow on navbar ────────────────────────────────── */
function initScrollShadow() {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;

  function update() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }

  window.addEventListener('scroll', update, { passive: true });
  update(); /* run once on load */
}

/* ── Smooth scrolling for all in-page anchor links ──────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id     = link.getAttribute('href');
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── Highlight the nav link for the section in view ─────────── */
function initActiveNav() {
  var navLinks = document.querySelectorAll('#navLinks a[href^="#"]');
  var sections = Array.from(navLinks)
    .map(function (l) { return document.querySelector(l.getAttribute('href')); })
    .filter(Boolean);

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navLinks.forEach(function (l) { l.classList.remove('nav-active'); });
      var active = document.querySelector(
        '#navLinks a[href="#' + entry.target.id + '"]'
      );
      if (active) active.classList.add('nav-active');
    });
  }, { threshold: 0.30 });

  sections.forEach(function (s) { observer.observe(s); });
}

/* ── Init ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  initHamburger();
  initScrollShadow();
  initSmoothScroll();
  initActiveNav();
});
