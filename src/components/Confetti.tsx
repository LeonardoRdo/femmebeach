import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useCart } from "./CartProvider";

// Chuva de confete em canvas, disparada a cada item adicionado ao carrinho (`celebrate` muda no CartProvider).
// Explode do centro da tela, onde abre o aviso "Adicionado ao carrinho". Cores da identidade: terracota, areia, marrom.
const COLORS = ["#9A4F31", "#E0702C", "#F3ECDD", "#D6C9AD", "#4A2A1B", "#e3b93a", "#ffffff"];

type P = { x: number; y: number; vx: number; vy: number; w: number; h: number; r: number; vr: number; c: string; o: number; round: boolean };

export default function Confetti() {
  const { celebrate } = useCart();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    if (!celebrate || reduce) return;
    const cvs = ref.current;
    const ctx = cvs?.getContext("2d");
    if (!cvs || !ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = window.innerWidth, H = window.innerHeight;
    cvs.width = W * dpr; cvs.height = H * dpr; cvs.style.display = "block";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const ps: P[] = [];
    const cx = W / 2, cy = H / 2 - 40, spread = Math.min(260, W * 0.5);
    for (let i = 0; i < 160; i++) {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.4, sp = 7 + Math.random() * 10;
      ps.push({ x: cx + (Math.random() - 0.5) * spread, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 4, w: 6 + Math.random() * 6, h: 4 + Math.random() * 5,
        r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3, c: COLORS[i % COLORS.length], o: 1, round: Math.random() < 0.3 });
    }
    const start = performance.now();
    let last = start;
    cancelAnimationFrame(raf.current);
    const frame = (now: number) => {
      const dt = Math.min(2, (now - last) / 16.7); last = now;
      ctx.clearRect(0, 0, W, H);
      let alive = 0;
      for (const p of ps) {
        p.vy += 0.32 * dt; p.vx *= Math.pow(0.98, dt); p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt;
        if (now - start > 1600) p.o -= 0.02 * dt;
        if (p.o <= 0 || p.y > H + 20) continue;
        alive++;
        ctx.save(); ctx.globalAlpha = Math.max(0, p.o); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
        if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.w / 2.2, 0, Math.PI * 2); ctx.fill(); }
        else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, Math.abs(Math.cos(p.r * 2)) * p.h + 1);
        ctx.restore();
      }
      if (alive) raf.current = requestAnimationFrame(frame);
      else { ctx.clearRect(0, 0, W, H); cvs.style.display = "none"; }
    };
    raf.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf.current);
  }, [celebrate, reduce]);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[80] hidden h-full w-full" />;
}
