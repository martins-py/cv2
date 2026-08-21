(function () {
  const canvas = document.getElementById('dot-field');
  const ctx = canvas.getContext('2d');

  const config = {
    dotRadius: 1.2,
    dotSpacing: 22,
    bulgeStrength: 50,
    glowRadius: 140,
    cursorRadius: 400,
    cursorForce: 0.1,
    bulgeOnly: true,
    gradientFrom: '#3a3a3a',
    gradientTo: '#141414',
    glowColor: '#e8e8e8',
};

  let width, height, dots = [];
  let mouse = { x: -9999, y: -9999 };

  function hexToRgb(hex) {
    const v = parseInt(hex.replace('#', ''), 16);
    return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
  }

  const colorFrom = hexToRgb(config.gradientFrom);
  const colorTo = hexToRgb(config.gradientTo);

  function lerpColor(t) {
    const r = Math.round(colorFrom.r + (colorTo.r - colorFrom.r) * t);
    const g = Math.round(colorFrom.g + (colorTo.g - colorFrom.g) * t);
    const b = Math.round(colorFrom.b + (colorTo.b - colorFrom.b) * t);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    buildDots();
  }

  function buildDots() {
    dots = [];
    const cols = Math.ceil(width / config.dotSpacing) + 1;
    const rows = Math.ceil(height / config.dotSpacing) + 1;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * config.dotSpacing;
        const y = j * config.dotSpacing;
        dots.push({
          baseX: x,
          baseY: y,
          x, y,
          colorT: (x / width + y / height) / 2,
        });
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (const dot of dots) {
      const dx = dot.baseX - mouse.x;
      const dy = dot.baseY - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let targetX = dot.baseX;
      let targetY = dot.baseY;
      let glow = 0;

      if (dist < config.cursorRadius) {
        const falloff = 1 - dist / config.cursorRadius;

        if (config.bulgeOnly) {
          const angle = Math.atan2(dy, dx);
          const push = falloff * config.bulgeStrength * config.cursorForce;
          targetX = dot.baseX + Math.cos(angle) * push;
          targetY = dot.baseY + Math.sin(angle) * push;
        }

        if (dist < config.glowRadius) {
          glow = 1 - dist / config.glowRadius;
        }
      }

      dot.x += (targetX - dot.x) * 0.15;
      dot.y += (targetY - dot.y) * 0.15;

      const color = lerpColor(dot.colorT);

      if (glow > 0) {
        ctx.shadowBlur = 6 * glow;
        ctx.shadowColor = config.glowColor;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, config.dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.globalAlpha = 1;


    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  resize();
  animate();
})();