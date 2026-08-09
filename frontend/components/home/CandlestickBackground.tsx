'use client';

import { useEffect, useRef } from 'react';

/**
 * CandlestickBackground
 * ----------------------
 * Lightweight canvas animation: a live-looking random-walk candlestick
 * chart that scrolls right-to-left forever. No 3D, no WebGL — just
 * canvas 2D — so it's cheap on CPU/GPU and safe on low-end devices.
 *
 * The canvas has NO fill background (transparent). It must sit on top
 * of the same .nx-page gradient as the rest of the hero, so candles
 * look like they belong to the page rather than a boxed widget.
 */

type Candle = {
  open: number;
  close: number;
  high: number;
  low: number;
};

const CANDLE_WIDTH = 10;
const CANDLE_GAP = 6;
const NEW_CANDLE_MS = 550;

export default function CandlestickBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Seed a random walk of candles
    let candles: Candle[] = [];
    let last = 50; // 0-100 normalized price
    const colCount = () => Math.ceil(width / (CANDLE_WIDTH + CANDLE_GAP)) + 2;

    const makeCandle = (): Candle => {
      const drift = (Math.random() - 0.48) * 9; // slight upward bias
      const open = last;
      const close = Math.max(6, Math.min(94, open + drift));
      const wickUp = Math.random() * 4;
      const wickDown = Math.random() * 4;
      const high = Math.max(open, close) + wickUp;
      const low = Math.min(open, close) - wickDown;
      last = close;
      return { open, close, high, low };
    };

    for (let i = 0; i < colCount(); i++) candles.push(makeCandle());

    const priceToY = (p: number) => {
      const padding = 24;
      const usable = height - padding * 2;
      return padding + (1 - p / 100) * usable;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      candles.forEach((c, i) => {
        const x = width - (candles.length - i) * (CANDLE_WIDTH + CANDLE_GAP);
        if (x < -CANDLE_WIDTH) return;

        const up = c.close >= c.open;
        const color = up ? 'rgba(0, 230, 118, 0.9)' : 'rgba(255, 56, 96, 0.9)';
        const glow = up ? 'rgba(0, 230, 118, 0.55)' : 'rgba(255, 56, 96, 0.55)';

        // wick
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + CANDLE_WIDTH / 2, priceToY(c.high));
        ctx.lineTo(x + CANDLE_WIDTH / 2, priceToY(c.low));
        ctx.stroke();

        // body
        const yOpen = priceToY(c.open);
        const yClose = priceToY(c.close);
        const top = Math.min(yOpen, yClose);
        const bodyHeight = Math.max(2, Math.abs(yOpen - yClose));

        ctx.shadowColor = glow;
        ctx.shadowBlur = 10;
        ctx.fillStyle = color;
        ctx.fillRect(x, top, CANDLE_WIDTH, bodyHeight);
        ctx.shadowBlur = 0;
      });
    };

    draw();
    if (prefersReducedMotion) {
      return () => window.removeEventListener('resize', resize);
    }

    const interval = window.setInterval(() => {
      candles.push(makeCandle());
      if (candles.length > colCount() + 4) candles.shift();
      draw();
    }, NEW_CANDLE_MS);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" aria-hidden="true" />
    </div>
  );
}
