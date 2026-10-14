// AccessiLearn - Accessibility & Performance Script
// Candidate: Sakshi (ID: 466235)

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Accessible Accordion Controller ---
  const accordionButtons = document.querySelectorAll('.accordion-header');

  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const targetPanelId = button.getAttribute('aria-controls');
      const targetPanel = document.getElementById(targetPanelId);
      const icon = button.querySelector('.acc-icon');

      if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        targetPanel.setAttribute('hidden', '');
        if (icon) icon.textContent = '+';
      } else {
        button.setAttribute('aria-expanded', 'true');
        targetPanel.removeAttribute('hidden');
        if (icon) icon.textContent = '−';
      }
    });

    // Keyboard Arrow navigation for Accordion
    button.addEventListener('keydown', (e) => {
      const buttons = Array.from(accordionButtons);
      const index = buttons.indexOf(button);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextButton = buttons[(index + 1) % buttons.length];
        nextButton.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevButton = buttons[(index - 1 + buttons.length) % buttons.length];
        prevButton.focus();
      }
    });
  });

  // --- Accessible Form Handler ---
  const form = document.getElementById('accessibleForm');
  const statusAlert = document.getElementById('statusAlert');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();

    if (!name || !email) {
      statusAlert.textContent = 'Error: Please fill in all required fields marked with an asterisk.';
      statusAlert.style.backgroundColor = '#fee2e2';
      statusAlert.style.color = '#991b1b';
      statusAlert.classList.add('active');
      return;
    }

    statusAlert.textContent = `Thank you, ${name}! Your accessibility feedback has been submitted successfully.`;
    statusAlert.style.backgroundColor = '#dcfce7';
    statusAlert.style.color = '#14532d';
    statusAlert.classList.add('active');
    form.reset();
  });
});
