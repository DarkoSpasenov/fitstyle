/* ==========================================================================
   Fit-Style — inscription.js
   Parcours d'inscription en ligne (7 étapes).

   ARCHITECTURE — à connecter avant mise en production :
   1. Étape « Contrat »    : génération PDF + signature électronique
                             (prestataire de type Skribble / DeepSign / Yousign).
                             La case à cocher ci-dessous n'est PAS une signature
                             électronique qualifiée : elle enregistre uniquement
                             l'acceptation des CGV.
   2. Étape « Paiement »   : redirection vers un prestataire PSP (Stripe,
                             Datatrans, Payrexx, Wallee…) pour carte + TWINT.
                             Aucune donnée bancaire ne doit transiter ni être
                             stockée sur ce site.
   3. Étape « Confirmation » : création du membre dans l'outil de gestion
                             (Gest-Fit) + envoi de l'e-mail de confirmation
                             côté serveur.
   Le fichier ci-dessous gère uniquement l'interface et la validation.
   Aucune transaction n'est simulée.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.querySelector('[data-wizard]');
  if (!root) return;

  var steps = Array.prototype.slice.call(root.querySelectorAll('[data-step]'));
  var indicators = Array.prototype.slice.call(document.querySelectorAll('[data-step-indicator] li'));
  var current = 0;

  var state = { plan: null, centre: null, infos: {} };

  /* ------------------------------------------------------- Navigation -- */
  function render() {
    steps.forEach(function (step, i) { step.hidden = i !== current; });
    indicators.forEach(function (li, i) {
      li.dataset.state = i < current ? 'done' : (i === current ? 'current' : 'todo');
    });

    var heading = steps[current].querySelector('h2');
    if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }

    var top = root.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  function goTo(index) {
    current = Math.max(0, Math.min(steps.length - 1, index));
    render();
  }

  /* ------------------------------------------------- Validation étape -- */
  function validateStep(index) {
    var step = steps[index];

    var radios = step.querySelectorAll('input[type="radio"]');
    if (radios.length) {
      var chosen = step.querySelector('input[type="radio"]:checked');
      if (!chosen) {
        var msg = step.querySelector('[data-step-error]');
        if (msg) msg.textContent = 'Merci de sélectionner une option pour continuer.';
        return false;
      }
      var msgOk = step.querySelector('[data-step-error]');
      if (msgOk) msgOk.textContent = '';
    }

    var fields = step.querySelectorAll('input:not([type="radio"]), select, textarea');
    var ok = true;
    var firstInvalid = null;
    fields.forEach(function (field) {
      if (field.disabled) return;
      if (window.FitStyleForms && !window.FitStyleForms.validateField(field)) {
        ok = false;
        if (!firstInvalid) firstInvalid = field;
      }
    });
    if (firstInvalid) firstInvalid.focus();
    return ok;
  }

  /* ---------------------------------------------------- Récapitulatif -- */
  function collect() {
    var plan = root.querySelector('input[name="abonnement"]:checked');
    if (plan) {
      state.plan = {
        value: plan.value,
        name: plan.dataset.name,
        price: plan.dataset.price,
        duration: plan.dataset.duration,
        terms: plan.dataset.terms || ''
      };
    }
    var centre = root.querySelector('input[name="centre"]:checked');
    if (centre) state.centre = { value: centre.value, name: centre.dataset.name };

    ['prenom', 'nom', 'naissance', 'adresse', 'npa', 'ville', 'telephone', 'email'].forEach(function (key) {
      var input = root.querySelector('[name="' + key + '"]');
      if (input) state.infos[key] = input.value.trim();
    });
  }

  function fill(selector, value) {
    root.querySelectorAll(selector).forEach(function (el) { el.textContent = value || '—'; });
  }

  function updateRecap() {
    collect();
    fill('[data-recap="abonnement"]', state.plan ? state.plan.name : '');
    fill('[data-recap="duree"]', state.plan ? state.plan.duration : '');
    fill('[data-recap="prix"]', state.plan ? state.plan.price : '');
    fill('[data-recap="conditions"]', state.plan ? state.plan.terms : '');
    fill('[data-recap="centre"]', state.centre ? state.centre.name : '');
    fill('[data-recap="nom"]', (state.infos.prenom || '') + ' ' + (state.infos.nom || ''));
    fill('[data-recap="email"]', state.infos.email);
    fill('[data-recap="telephone"]', state.infos.telephone);
    fill('[data-recap="adresse"]',
      [state.infos.adresse, [state.infos.npa, state.infos.ville].filter(Boolean).join(' ')].filter(Boolean).join(', '));
  }

  /* ----------------------------------------------------------- Events -- */
  root.addEventListener('click', function (e) {
    var next = e.target.closest('[data-next]');
    var prev = e.target.closest('[data-prev]');

    if (prev) { e.preventDefault(); goTo(current - 1); return; }

    if (next) {
      e.preventDefault();
      if (!validateStep(current)) return;
      updateRecap();
      goTo(current + 1);
    }
  });

  // Sélection au clavier / clic : on met à jour le récapitulatif en direct
  root.addEventListener('change', function (e) {
    if (e.target.name === 'abonnement' || e.target.name === 'centre') updateRecap();
  });

  // Pré-sélection depuis la page /abonnements (ex. inscription.html?plan=adulte-12)
  var params = new URLSearchParams(window.location.search);
  var preset = params.get('plan');
  if (preset) {
    var input = root.querySelector('input[name="abonnement"][value="' + CSS.escape(preset) + '"]');
    if (input) { input.checked = true; updateRecap(); }
  }

  // Le formulaire ne soumet rien tant que le prestataire de paiement n'est pas branché
  var form = root.closest('form');
  if (form) form.addEventListener('submit', function (e) { e.preventDefault(); });

  render();
})();
