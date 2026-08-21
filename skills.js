(function () {
  const filters = document.querySelectorAll('.skills-filter');
  const cards = document.querySelectorAll('.skill-card');

  if (!filters.length || !cards.length) return;

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      filters.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const category = btn.dataset.category;

      cards.forEach((card) => {
        const show = category === 'all' || card.dataset.category === category;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });
})();