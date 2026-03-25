/* kontakt.js — Contact form submission handling and success message
   display. Simulates sending with a brief loading state. */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var form    = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  if (!form || !success) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Wird gesendet\u2026';

    setTimeout(function () {
      form.reset();
      submitBtn.style.display = 'none';
      success.style.display   = 'block';
    }, 900);
  });
});
