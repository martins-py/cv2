(function () {
  const canvas = document.getElementById('orbCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let size = 0;
  let hovering = false;
  let hoverT = 0;
  let rotation = 0;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    size = rect.width;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);
  }

  function draw(time) {
    ctx.clearRect(0, 0, size, size);
    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.42;

    hoverT += ((hovering ? 1 : 0) - hoverT) * 0.08;
    if (hovering) rotation += 0.012;

    const t = time * 0.0006;

    const glow = ctx.createRadialGradient(cx, cy, radius * 0.3, cx, cy, radius * 1.3);
    glow.addColorStop(0, `rgba(230, 230, 230, ${0.30 + hoverT * 0.2})`);
    glow.addColorStop(1, 'rgba(230, 230, 230, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
    ctx.fill();

    const colors = ['#e8e8e8', '#9c9c9c', '#4a4a4a'];
    for (let i = 0; i < 3; i++) {
      const angle = t * (0.6 + i * 0.3) + rotation + (i * Math.PI * 2) / 3;
      const wobble = Math.sin(t * 1.5 + i) * radius * 0.15;
      const bx = cx + Math.cos(angle) * (radius * 0.45 + wobble);
      const by = cy + Math.sin(angle) * (radius * 0.45 + wobble);
      const blobRadius = radius * (0.55 + hoverT * 0.1);

      const grad = ctx.createRadialGradient(bx, by, 0, bx, by, blobRadius);
      grad.addColorStop(0, colors[i] + 'cc');
      grad.addColorStop(1, colors[i] + '00');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(bx, by, blobRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = `rgba(220, 220, 220, ${0.28 + hoverT * 0.3})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.05, 0, Math.PI * 2);
    ctx.stroke();

    requestAnimationFrame(draw);
  }

  const wrapper = canvas.parentElement;
  wrapper.addEventListener('mouseenter', () => hovering = true);
  wrapper.addEventListener('mouseleave', () => hovering = false);
  window.addEventListener('resize', resize);

  resize();
  requestAnimationFrame(draw);
})();