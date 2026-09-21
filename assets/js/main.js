/* ==========================================================================
   Fit-Style — main.js
   Comportements globaux : header sticky, menu mobile, reveal au scroll,
   onglets, année dynamique. Aucune dépendance externe.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------- Header sticky -- */
  var header = document.querySelector('[data-header]');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------ Menu mobile -- */
  var burger = document.querySelector('[data-burger]');
  var mobileNav = document.querySelector('[data-mobile-nav]');

  function closeNav() {
    if (!burger || !mobileNav) return;
    burger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  }

  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      mobileNav.classList.toggle('is-open', !open);
      document.body.classList.toggle('nav-open', !open);
    });

    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    // Sécurité : si l'écran repasse en desktop, on referme proprement
    window.matchMedia('(min-width: 961px)').addEventListener('change', closeNav);
  }

  /* ------------------------------------------------- Reveal au scroll -- */
  var revealables = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealables.length && 'IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealables.forEach(function (el, i) {
      // léger décalage pour les éléments d'une même grille
      el.style.transitionDelay = (Math.min(i % 4, 3) * 60) + 'ms';
      io.observe(el);
    });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ----------------------------------------------------------- Onglets -- */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var buttons = group.querySelectorAll('[role="tab"]');

    function activate(btn) {
      buttons.forEach(function (b) {
        var selected = b === btn;
        b.setAttribute('aria-selected', String(selected));
        b.setAttribute('tabindex', selected ? '0' : '-1');
        var panel = document.getElementById(b.getAttribute('aria-controls'));
        if (panel) panel.hidden = !selected;
      });
    }

    buttons.forEach(function (btn, index) {
      btn.addEventListener('click', function () { activate(btn); });
      btn.addEventListener('keydown', function (e) {
        var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!dir) return;
        e.preventDefault();
        var next = buttons[(index + dir + buttons.length) % buttons.length];
        next.focus();
        activate(next);
      });
    });
  });

  /* ------------------------------------------------- Année dynamique --- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
