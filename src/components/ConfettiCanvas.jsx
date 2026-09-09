import React, { useEffect, useRef } from 'react';

export const ConfettiCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const confettiCount = 70;
    const confettiList = [];

    const colors = [
      '#ff4fa3', '#ff77b7', '#a855f7', '#8b5cf6',
      '#38bdf8', '#34d399', '#fbbf24', '#f43f5e'
    ];

    for (let i = 0; i < confettiCount; i++) {
      confettiList.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 2.5 + 1.2,
        speedX: (Math.random() - 0.5) * 1.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiList.forEach((c) => {
        c.y += c.speedY;
        c.x += Math.sin(c.y * 0.02) * c.speedX;
        c.rotation += c.rotationSpeed;

        if (c.y > canvas.height) {
          c.y = -20;
          c.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 1.5);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
};
