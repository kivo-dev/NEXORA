'use client';

import { useEffect, useState } from 'react';

const FULL_TEXT = 'Trading Intelligence';
const TYPE_MS = 70;
const DELETE_MS = 40;
const PAUSE_MS = 2200;

type Phase = 'typing' | 'pausing' | 'deleting' | 'holding';

export default function TypewriterHeadline() {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setText(FULL_TEXT);
      setPhase('holding');
      return;
    }

    if (phase === 'typing') {
      if (text.length < FULL_TEXT.length) {
        const t = window.setTimeout(() => setText(FULL_TEXT.slice(0, text.length + 1)), TYPE_MS);
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(() => setPhase('pausing'), PAUSE_MS);
      return () => window.clearTimeout(t);
    }

    if (phase === 'pausing') {
      const t = window.setTimeout(() => setPhase('deleting'), 0);
      return () => window.clearTimeout(t);
    }

    if (phase === 'deleting') {
      if (text.length > 0) {
        const t = window.setTimeout(() => setText(FULL_TEXT.slice(0, text.length - 1)), DELETE_MS);
        return () => window.clearTimeout(t);
      }
      const t = window.setTimeout(() => setPhase('typing'), 500);
      return () => window.clearTimeout(t);
    }
  }, [text, phase]);

  // Split what's typed so far across the original two lines: "Trading" / "Intelligence"
  const firstWord = 'Trading';
  const shownFirst = text.slice(0, firstWord.length);
  const shownSecond = text.slice(firstWord.length + 1); // +1 skips the space

  return (
    <h1
      className="nx-display mt-6 text-5xl sm:text-6xl lg:text-[4.2rem]"
      style={{ color: '#ffffff', textShadow: '0 2px 18px rgba(10, 40, 90, 0.35)' }}
    >
      {shownFirst}
      {text.length <= firstWord.length && <span className="nx-terminal-cursor" style={{ background: '#ffffff', width: 4 }} />}
      <br />
      {shownSecond}
      {text.length > firstWord.length && <span className="nx-terminal-cursor" style={{ background: '#ffffff', width: 4 }} />}
    </h1>
  );
}
