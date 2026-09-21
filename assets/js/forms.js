/* ==========================================================================
   Fit-Style — forms.js
   Validation côté client + message de confirmation.

   IMPORTANT : aucun envoi réel n'est effectué tant que le backend n'est pas
   branché. Renseigner l'attribut data-endpoint du <form> avec l'URL de
   traitement (script PHP, service d'e-mail, CRM…) pour activer l'envoi.
   ========================================================================== */
(function () {
  'use strict';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError(field, message) {
    var wrapper = field.closest('.field') || field.closest('.checkbox');
    if (!wrapper) return;
    wrapper.classList.toggle('field--error', Boolean(message));
    // Pour une case à cocher, le message se trouve juste après le label
    var slot = wrapper.querySelector('.field__error');
    if (!slot && wrapper.nextElementSibling && wrapper.nextElementSibling.classList.contains('field__error')) {
      slot = wrapper.nextElementSibling;
    }
    if (slot) slot.textContent = message || '';
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
  }

  function validateField(field) {
    var value = (field.value || '').trim();

    if (field.type === 'checkbox') {
      if (field.required && !field.checked) { setError(field, 'Merci de cocher cette case.'); return false; }
      setError(field, ''); return true;
    }
    if (field.required && !value) { setError(field, 'Ce champ est obligatoire.'); return false; }
    if (value && field.type === 'email' && !EMAIL_RE.test(value)) { setError(field, 'Adresse e-mail invalide.'); return false; }
    if (value && field.type === 'tel' && value.replace(/[^0-9+]/g, '').length < 9) { setError(field, 'Numéro de téléphone incomplet.'); return false; }

    setError(field, '');
    return true;
  }

  function validateForm(form) {
    var fields = form.querySelectorAll('input, select, textarea');
    var firstInvalid = null;
    var ok = true;

    fields.forEach(function (field) {
      if (field.type === 'hidden' || field.disabled) return;
      if (!validateField(field)) { ok = false; if (!firstInvalid) firstInvalid = field; }
    });

    if (firstInvalid) firstInvalid.focus();
    return ok;
  }

  window.FitStyleForms = { validateForm: validateForm, validateField: validateField };

  document.querySelectorAll('[data-form]').forEach(function (form) {
    var status = form.querySelector('[data-form-status]');

    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        if ((field.closest('.field') || {}).classList && field.closest('.field').classList.contains('field--error')) {
          validateField(field);
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(form)) return;

      var endpoint = form.getAttribute('data-endpoint');
      var submitBtn = form.querySelector('[type="submit"]');

      function show(message, ok) {
        if (!status) return;
        status.innerHTML = message;
        status.classList.add('is-visible');
        status.classList.toggle('form-status--ok', Boolean(ok));
        status.setAttribute('role', 'status');
        status.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }

      if (!endpoint) {
        // Pas de backend connecté : on confirme la validation sans simuler d'envoi.
        show('<strong>Formulaire valide.</strong> L\'envoi n\'est pas encore actif : le point de traitement (attribut <code>data-endpoint</code>) doit être connecté avant la mise en ligne.', false);
        return;
      }

      if (submitBtn) { submitBtn.disabled = true; submitBtn.dataset.label = submitBtn.textContent; submitBtn.textContent = 'Envoi…'; }

      fetch(endpoint, { method: 'POST', body: new FormData(form) })
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          form.reset();
          show('<strong>Merci, votre demande est envoyée.</strong> L\'équipe Fit-Style vous recontacte rapidement.', true);
        })
        .catch(function () {
          show('L\'envoi a échoué. Merci de réessayer ou de nous appeler directement.', false);
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.label || 'Envoyer'; }
        });
    });
  });
})();
