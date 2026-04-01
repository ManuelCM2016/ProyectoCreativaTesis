'use client';

import { useRef, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════════
   BokehParticles — Reusable mouse-reactive particle canvas
   ═══════════════════════════════════════════════════════════════════════════════
   Props:
     sectionRef  — ref to the parent <section> (required for sizing + mouse)
     color       — hex color for particles (default: '#94C6F2')
     count       — particle count (default: 210)
     mouseRadius — repulsion radius in px (default: 180)
     mouseForce  — repulsion strength (default: 1.2)
   ═══════════════════════════════════════════════════════════════════════════════ */

interface BokehParticlesProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  color?: string;
  count?: number;
  mouseRadius?: number;
  mouseForce?: number;
}

interface Particle {
  x: number; y: number;
  baseX: number; baseY: number;
  r: number; opacity: number;
  speed: number; drift: number;
  phase: number;
}

function hexToRgb(hex: string) {
  const c = hex.replace('#', '');
  return {
    r: parseInt(c.substring(0, 2), 16),
    g: parseInt(c.substring(2, 4), 16),
    b: parseInt(c.substring(4, 6), 16),
  };
}

export default function BokehParticles({
  sectionRef,
  color = '#94C6F2',
  count = 210,
  mouseRadius = 180,
  mouseForce = 1.2,
}: BokehParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d')!;
    const rgb = hexToRgb(color);
    let w = 0, h = 0;

    const resize = () => {
      const rect = section.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const createParticles = () => {
      particlesRef.current = Array.from({ length: count }, () => {
        const r = 3 + Math.random() * 14;
        const x = Math.random() * w;
        const y = Math.random() * h;
        return {
          x, y, baseX: x, baseY: y,
          r,
          opacity: 0.06 + Math.random() * 0.18,
          speed: 0.15 + Math.random() * 0.35,
          drift: (Math.random() - 0.5) * 0.3,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    resize();
    createParticles();

    const onMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    section.addEventListener('mousemove', onMouseMove);
    section.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', resize);

    let time = 0;
    const draw = () => {
      time += 0.008;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particlesRef.current) {
        // Gentle float upward
        p.baseY -= p.speed * 0.3;
        p.baseX += p.drift * 0.2;

        // Wrap
        if (p.baseY < -p.r * 2) { p.baseY = h + p.r * 2; p.baseX = Math.random() * w; }
        if (p.baseX < -p.r * 2) p.baseX = w + p.r * 2;
        if (p.baseX > w + p.r * 2) p.baseX = -p.r * 2;

        // Sine oscillation
        const floatX = Math.sin(time * 1.2 + p.phase) * 12;
        const floatY = Math.cos(time * 0.8 + p.phase) * 8;

        let targetX = p.baseX + floatX;
        let targetY = p.baseY + floatY;

        // Mouse repulsion
        const ddx = targetX - mx;
        const ddy = targetY - my;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);
        if (dist < mouseRadius && dist > 0) {
          const force = (1 - dist / mouseRadius) * mouseForce;
          targetX += (ddx / dist) * force * 60;
          targetY += (ddy / dist) * force * 60;
        }

        // Smooth approach
        p.x += (targetX - p.x) * 0.06;
        p.y += (targetY - p.y) * 0.06;

        // Draw bokeh (radial gradient)
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${p.opacity * 1.6})`);
        grad.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},${p.opacity * 0.7})`);
        grad.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      section.removeEventListener('mousemove', onMouseMove);
      section.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, [sectionRef, color, count, mouseRadius, mouseForce]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  );
}
