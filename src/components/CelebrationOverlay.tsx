import { useMemo } from 'react';
import { Heart } from 'lucide-react';

const CONFETTI_COLORS = ['#ff7da8', '#ffa6c2', '#e6c481', '#f0d9a3', '#f75c91', '#fff3d6', '#ffc9da'];
const HEART_COLORS = ['#ff7da8', '#f75c91', '#ffa6c2', '#e63f76'];

type Confetti = {
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  shape: 'rect' | 'circle';
  rotate: number;
};

type RisingHeart = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
};

function makeConfetti(count: number): Confetti[] {
  return Array.from({ length: count }).map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 3,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 6 + Math.random() * 10,
    shape: i % 2 === 0 ? 'rect' : 'circle',
    rotate: Math.random() * 360,
  }));
}

function makeHearts(count: number): RisingHeart[] {
  return Array.from({ length: count }).map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 5 + Math.random() * 5,
    size: 16 + Math.random() * 22,
    color: HEART_COLORS[i % HEART_COLORS.length],
  }));
}

export default function CelebrationOverlay() {
  const confetti = useMemo(() => makeConfetti(80), []);
  const hearts = useMemo(() => makeHearts(30), []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {confetti.map((c, i) => (
        <div
          key={`conf-${i}`}
          className="confetti-piece"
          style={{
            left: `${c.left}%`,
            width: c.shape === 'rect' ? `${c.size}px` : `${c.size}px`,
            height: c.shape === 'rect' ? `${c.size * 1.6}px` : `${c.size}px`,
            background: c.color,
            borderRadius: c.shape === 'circle' ? '9999px' : '2px',
            transform: `rotate(${c.rotate}deg)`,
            animation: `confettiFall ${c.duration}s linear ${c.delay}s infinite`,
            boxShadow: `0 0 8px ${c.color}55`,
          }}
        />
      ))}

      {hearts.map((h, i) => (
        <div
          key={`heart-${i}`}
          className="absolute bottom-0"
          style={{
            left: `${h.left}%`,
            animation: `heartRise ${h.duration}s ease-in ${h.delay}s infinite`,
          }}
        >
          <Heart size={h.size} fill={h.color} color={h.color} style={{ opacity: 0.85 }} />
        </div>
      ))}
    </div>
  );
}
