(function () {
  const config = {
    spotlightRadius: 400,
    particleCount: 12,
    glowColor: '230, 230, 230',
  };

  const cards = document.querySelectorAll('.bento-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--glow-x', `${x}px`);
      card.style.setProperty('--glow-y', `${y}px`);
      card.style.setProperty('--glow-opacity', '1');
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--glow-opacity', '0');
    });

    card.addEventListener('click', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('div');
      ripple.className = 'bento-ripple';
      ripple.style.left = `${x - 10}px`;
      ripple.style.top = `${y - 10}px`;
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      card.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());

      for (let i = 0; i < config.particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'bento-particle';
        const angle = (Math.PI * 2 * i) / config.particleCount;
        const distance = 40 + Math.random() * 30;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.background = `rgb(${config.glowColor})`;
        card.appendChild(particle);
        particle.addEventListener('animationend', () => particle.remove());
      }
    });
  });
})();