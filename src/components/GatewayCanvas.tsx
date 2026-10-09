"use client";

import { useEffect, useRef } from "react";

/**
 * Hero visual: physical devices (left) send signals through a gateway portal
 * (center) where they become data flowing into a cloud lattice (right).
 * Plain canvas 2D, no dependencies. Pauses offscreen; static under reduced motion.
 */

type Pt = { x: number; y: number };
type Packet = { stage: 0 | 1 | 2 | 3; t: number; speed: number; dev: number; row: number; col: number };

const ACCENT = "94, 234, 212";
const ROWS = 7;
const COLS = 4;

const quad = (a: Pt, c: Pt, b: Pt, t: number): Pt => {
  const u = 1 - t;
  return { x: u * u * a.x + 2 * u * t * c.x + t * t * b.x, y: u * u * a.y + 2 * u * t * c.y + t * t * b.y };
};
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function makeSprite(rgb: string) {
  const s = document.createElement("canvas");
  s.width = s.height = 64;
  const g = s.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, `rgba(${rgb},1)`);
  grad.addColorStop(0.25, `rgba(${rgb},0.55)`);
  grad.addColorStop(1, `rgba(${rgb},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return s;
}

export function GatewayCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const glowAccent = makeSprite(ACCENT);
    const glowWhite = makeSprite("236, 237, 238");

    // Devices on a jittered grid in the left zone (normalized coordinates).
    const devices: (Pt & { phase: number; flash: number })[] = [];
    for (let c = 0; c < 3; c++) {
      for (let r = 0; r < 5; r++) {
        if ((c + r) % 3 === 2 && c !== 0) continue;
        devices.push({
          x: 0.05 + c * 0.095 + Math.random() * 0.04,
          y: 0.14 + r * 0.18 + (Math.random() - 0.5) * 0.07,
          phase: Math.random() * Math.PI * 2,
          flash: 0,
        });
      }
    }
    const nodeFlash = Array.from({ length: ROWS }, () => new Array(COLS).fill(0) as number[]);

    let w = 0;
    let h = 0;
    let R = 0;
    let packets: Packet[] = [];
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(w, h) * 0.17;
      if (reduce) draw(0);
    };

    // Layout helpers in pixels, with per-layer parallax.
    const center = (): Pt => ({ x: w * 0.5 + pointer.x * 4, y: h * 0.5 + pointer.y * 4 });
    const devicePos = (i: number, time: number): Pt => {
      const d = devices[i];
      return {
        x: d.x * w + pointer.x * 10,
        y: d.y * h + Math.sin(time * 0.0007 + d.phase) * 4 + pointer.y * 10,
      };
    };
    const latticePos = (r: number, c: number): Pt => ({
      x: (0.71 + c * 0.08) * w + pointer.x * 7,
      y: (0.14 + r * (0.72 / (ROWS - 1))) * h + pointer.y * 7,
    });
    const entry = (yNorm: number): Pt => {
      const a = Math.PI + (yNorm - 0.5) * -1.6;
      const c = center();
      return { x: c.x + Math.cos(a) * R, y: c.y + Math.sin(a) * R };
    };
    const exit = (row: number): Pt => {
      const a = ((row / (ROWS - 1)) - 0.5) * 1.6;
      const c = center();
      return { x: c.x + Math.cos(a) * R, y: c.y + Math.sin(a) * R };
    };

    // Returns the curve (start, control, end) for a packet's current stage.
    const segment = (p: Packet, time: number): [Pt, Pt, Pt] => {
      const d = devices[p.dev];
      if (p.stage === 0) {
        const a = devicePos(p.dev, time);
        const b = entry(d.y);
        return [a, { x: (a.x + b.x) / 2, y: a.y }, b];
      }
      if (p.stage === 1) return [entry(d.y), center(), exit(p.row)];
      if (p.stage === 2) {
        const a = exit(p.row);
        const b = latticePos(p.row, 0);
        return [a, { x: (a.x + b.x) / 2, y: b.y }, b];
      }
      const a = latticePos(p.row, 0);
      const b = latticePos(p.row, p.col);
      return [a, { x: (a.x + b.x) / 2, y: a.y }, b];
    };

    const spawn = (): Packet => {
      const dev = Math.floor(Math.random() * devices.length);
      devices[dev].flash = 1;
      return {
        stage: 0,
        t: 0,
        speed: 0.0045 + Math.random() * 0.003,
        dev,
        row: Math.floor(Math.random() * ROWS),
        col: 1 + Math.floor(Math.random() * (COLS - 1)),
      };
    };

    if (reduce) {
      packets = Array.from({ length: 18 }, () => {
        const p = spawn();
        p.stage = Math.floor(Math.random() * 4) as Packet["stage"];
        p.t = Math.random();
        return p;
      });
      devices.forEach((d) => (d.flash = 0));
    }

    const step = () => {
      for (const p of packets) {
        const mult = p.stage === 1 ? 1.6 : p.stage === 3 ? 1.3 : 1;
        p.t += p.speed * mult;
        if (p.t >= 1) {
          if (p.stage === 3) {
            nodeFlash[p.row][p.col] = 1;
            p.t = 2; // mark done
          } else {
            p.stage = (p.stage + 1) as Packet["stage"];
            p.t = 0;
          }
        }
      }
      packets = packets.filter((p) => p.t <= 1);
      devices.forEach((d) => (d.flash *= 0.94));
      nodeFlash.forEach((row) => row.forEach((_, c) => (row[c] *= 0.95)));
    };

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      const c = center();

      // Device to gateway links
      ctx.lineWidth = 1;
      devices.forEach((d, i) => {
        const a = devicePos(i, time);
        const b = entry(d.y);
        ctx.strokeStyle = `rgba(255,255,255,${0.05 + d.flash * 0.12})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo((a.x + b.x) / 2, a.y, b.x, b.y);
        ctx.stroke();
      });

      // Gateway to lattice links + lattice grid
      for (let r = 0; r < ROWS; r++) {
        const a = exit(r);
        const b = latticePos(r, 0);
        ctx.strokeStyle = `rgba(${ACCENT},0.1)`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo((a.x + b.x) / 2, b.y, b.x, b.y);
        ctx.stroke();
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(latticePos(r, COLS - 1).x, b.y);
        ctx.stroke();
      }
      for (let col = 0; col < COLS; col++) {
        const top = latticePos(0, col);
        const bot = latticePos(ROWS - 1, col);
        ctx.beginPath();
        ctx.moveTo(top.x, top.y);
        ctx.lineTo(bot.x, bot.y);
        ctx.stroke();
      }

      // Portal: halo, rings, rotating arcs, core
      const halo = ctx.createRadialGradient(c.x, c.y, R * 0.2, c.x, c.y, R * 2.2);
      halo.addColorStop(0, `rgba(${ACCENT},0.13)`);
      halo.addColorStop(1, `rgba(${ACCENT},0)`);
      ctx.fillStyle = halo;
      ctx.fillRect(c.x - R * 2.2, c.y - R * 2.2, R * 4.4, R * 4.4);

      ctx.fillStyle = "rgba(7,8,10,0.85)";
      ctx.beginPath();
      ctx.arc(c.x, c.y, R, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(c.x, c.y, R, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.beginPath();
      ctx.arc(c.x, c.y, R * 1.32, 0, Math.PI * 2);
      ctx.stroke();

      const spin = time * 0.00035;
      ctx.lineCap = "round";
      ctx.strokeStyle = `rgba(${ACCENT},0.85)`;
      ctx.lineWidth = 1.6;
      for (let k = 0; k < 3; k++) {
        const s = spin + (k * Math.PI * 2) / 3;
        ctx.beginPath();
        ctx.arc(c.x, c.y, R * 0.74, s, s + 0.9);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 6]);
      ctx.beginPath();
      ctx.arc(c.x, c.y, R * 0.5, -spin * 1.6, -spin * 1.6 + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = `rgba(${ACCENT},0.25)`;
      ctx.beginPath();
      ctx.arc(c.x, c.y, R * 1.32, spin * 0.6, spin * 0.6 + 0.5);
      ctx.stroke();

      const pulse = reduce ? 1 : 0.85 + Math.sin(time * 0.003) * 0.15;
      ctx.drawImage(glowAccent, c.x - R * 0.45 * pulse, c.y - R * 0.45 * pulse, R * 0.9 * pulse, R * 0.9 * pulse);
      ctx.fillStyle = "#ecedee";
      ctx.beginPath();
      ctx.arc(c.x, c.y, 2.6, 0, Math.PI * 2);
      ctx.fill();

      // Devices
      devices.forEach((d, i) => {
        const p = devicePos(i, time);
        const s = 7;
        if (d.flash > 0.05) ctx.drawImage(glowWhite, p.x - 14, p.y - 14, 28, 28 * 1);
        ctx.fillStyle = "#0d0f12";
        ctx.strokeStyle = `rgba(255,255,255,${0.35 + d.flash * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(p.x - s / 2, p.y - s / 2, s, s, 2);
        ctx.fill();
        ctx.stroke();
      });

      // Lattice nodes
      for (let r = 0; r < ROWS; r++) {
        for (let col = 0; col < COLS; col++) {
          const p = latticePos(r, col);
          const f = nodeFlash[r][col];
          if (f > 0.05) ctx.drawImage(glowAccent, p.x - 12 * f - 4, p.y - 12 * f - 4, 24 * f + 8, 24 * f + 8);
          ctx.fillStyle = f > 0.05 ? `rgba(${ACCENT},${0.4 + f * 0.6})` : "rgba(255,255,255,0.28)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.6 + f * 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Packets with short trails. White before the gateway, accent after.
      for (const p of packets) {
        const [a, ctrl, b] = segment(p, time);
        const digital = p.stage >= 2 || (p.stage === 1 && p.t > 0.5);
        const sprite = digital ? glowAccent : glowWhite;
        for (let k = 3; k >= 0; k--) {
          const tt = Math.max(0, p.t - k * 0.025);
          const pos = quad(a, ctrl, b, p.stage === 1 ? ease(tt) : tt);
          const size = k === 0 ? 14 : 8 - k * 1.5;
          ctx.globalAlpha = k === 0 ? 1 : 0.45 - k * 0.12;
          ctx.drawImage(sprite, pos.x - size / 2, pos.y - size / 2, size, size);
        }
        ctx.globalAlpha = 1;
      }
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (reduce) return () => ro.disconnect();

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = Math.max(-1, Math.min(1, (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)));
      pointer.ty = Math.max(-1, Math.min(1, (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)));
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let raf = 0;
    let visible = true;
    let lastSpawn = 0;
    const loop = (time: number) => {
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      if (time - lastSpawn > 260 && packets.length < 36) {
        packets.push(spawn());
        lastSpawn = time;
      }
      step();
      draw(time);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden="true" />;
}
