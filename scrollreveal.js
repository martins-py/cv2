(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Groups of selectors. Elements matched together in one querySelectorAll
  // call get staggered relative to each other (nice for grids of cards).
  const revealGroups = [
    '#about .about-title, #about .about-subtitle',
    '#about .code-window, #about .story-panel',
    '#projects h2, #projects .projects-intro',
    '.projects-featured-grid .featured-project-card',
    '.projects-subhead',
    '.projects-grid .project-card',
    '#services h2, #services .services-intro',
    '.services-grid .service-card',
    '#skills h2',
    '.skills-grid .skill-card',
    '#contact h2, #contact .contact-info, #contact .contact-form'
  ];

  const targets = [];

  revealGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      // Cap the stagger so a long row of cards doesn't take forever to finish.
      el.style.setProperty('--reveal-delay', `${Math.min(i, 5) * 90}ms`);
      targets.push(el);
    });
  });

  // If the browser can't do IntersectionObserver, or the user asked for
  // reduced motion, just show everything immediately.
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      // Trigger a little before the element's edge fully reaches the
      // viewport bottom, so the reveal feels timed to the scroll rather
      // than snapping in late.
      rootMargin: '0px 0px -8% 0px'
    }
  );

  targets.forEach((el) => observer.observe(el));
})();