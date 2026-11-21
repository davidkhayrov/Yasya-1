import { useMemo } from 'react';
import { Heart, Star } from 'lucide-react';

type Particle =
  | { kind: 'heart'; left: number; size: number; duration: number; delay: number; color: string }
  | { kind: 'star'; left: number; size: number; duration: number; delay: number; color: string }
  | { kind: 'dot'; left: number; size: number; duration: number; delay: number; color: string };

const HEART_COLORS = ['#ff7da8', '#ffa6c2', '#f75c91', '#ffc9da'];
const STAR_COLORS = ['#e6c481', '#f0d9a3', '#d4a857', '#fff3d6'];
const DOT_COLORS = ['#ffa6c2', '#e6c481', '#fff3d6'];

function makeParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const roll = Math.random();
    const left = Math.random() * 100;
    const size = 8 + Math.random() * 18;
    const duration = 14 + Math.random() * 16;
    const delay = Math.random() * 18;
    if (roll < 0.4) {
      particles.push({
        kind: 'heart',
        left,
        size,
        duration,
        delay,
        color: HEART_COLORS[i % HEART_COLORS.length],
      });
    } else if (roll < 0.75) {
      particles.push({
        kind: 'star',
        left,
        size: size * 0.7,
        duration,
        delay,
        color: STAR_COLORS[i % STAR_COLORS.length],
      });
    } else {
      particles.push({
        kind: 'dot',
        left,
        size: size * 0.4,
        duration: duration * 0.8,
        delay,
        color: DOT_COLORS[i % DOT_COLORS.length],
      });
    }
  }
  return particles;
}

export default function ParticleBackground() {
  const particles = useMemo(() => makeParticles(36), []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* Мягкие светящиеся пятна */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-gold-300/30 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-rose-100/50 blur-3xl" />

      {/* Плавающие частицы */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          {p.kind === 'heart' && (
            <Heart size={p.size} fill={p.color} color={p.color} style={{ opacity: 0.7 }} />
          )}
          {p.kind === 'star' && (
            <Star size={p.size} fill={p.color} color={p.color} style={{ opacity: 0.7 }} />
          )}
          {p.kind === 'dot' && (
            <div
              style={{
                width: p.size,
                height: p.size,
                borderRadius: '9999px',
                background: p.color,
                opacity: 0.6,
                boxShadow: `0 0 ${p.size}px ${p.color}`,
              }}
            />
          )}
        </div>
      ))}

      {/* Мерцающие звёздочки на месте */}
      {Array.from({ length: 18 }).map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const delay = (i % 6) * 0.8;
        return (
          <Star
            key={`twinkle-${i}`}
            size={6 + (i % 4) * 2}
            color="#e6c481"
            className="absolute"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animation: `twinkle ${3 + (i % 3)}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
