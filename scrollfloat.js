(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Same defaults as the React Bits <ScrollFloat /> usage example:
  // animationDuration=1, ease='back.inOut(2)', stagger=0.03,
  // scrollStart='center bottom+=50%', scrollEnd='bottom bottom-=40%'
  const animationDuration = 1;
  const ease = 'back.inOut(2)';
  const stagger = 0.03;
  const scrollStart = 'center bottom+=50%';
  const scrollEnd = 'bottom bottom-=40%';

  document.querySelectorAll('.scroll-float').forEach((container) => {
    const original = container.textContent.trim();

    // Preserve the accessible name, then split into per-character spans
    // the same way the component's splitText/useMemo does.
    container.setAttribute('aria-label', original);

    const textWrap = document.createElement('span');
    textWrap.className = 'scroll-float-text';
    textWrap.setAttribute('aria-hidden', 'true');

    original.split('').forEach((char) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      textWrap.appendChild(span);
    });

    container.textContent = '';
    container.appendChild(textWrap);

    gsap.fromTo(
      container.querySelectorAll('.char'),
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: container,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        }
      }
    );
  });
})();