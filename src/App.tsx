import { useEffect, useMemo, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';
import CountdownTimer from '@/components/CountdownTimer';
import CelebrationOverlay from '@/components/CelebrationOverlay';

// Дата дня рождения: 30 ноября 2026 года, 00:00 по местному времени пользователя
const BIRTHDAY_DATE = new Date(2026, 10, 30, 0, 0, 0); // месяц 10 = ноябрь (0-индексация)

// URL следующего сайта в поздравительной цепочке
const NEXT_SITE_URL = 'https://yasya-2.vercel.app/';

function useCountdownReached(target: Date): boolean {
  const [reached, setReached] = useState(() => new Date().getTime() >= target.getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setReached(new Date().getTime() >= target.getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return reached;
}

export default function App() {
  const targetDate = useMemo(() => BIRTHDAY_DATE, []);
  const isBirthday = useCountdownReached(targetDate);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ParticleBackground />

      {isBirthday && <CelebrationOverlay />}

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-10">
        {isBirthday ? <BirthdayContent /> : <CountdownContent targetDate={targetDate} />}
      </main>

      <footer className="relative z-10 pb-5 text-center text-xs text-rose-400/60">
        Сделано с любовью
      </footer>
    </div>
  );
}

function CountdownContent({ targetDate }: { targetDate: Date }) {
  const formattedDate = targetDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col items-center text-center">
      <div className="animate-fade-in mb-6 flex items-center gap-2 rounded-full bg-white/50 px-5 py-2 backdrop-blur-md">
        <Sparkles size={18} className="text-gold-500" />
        <span className="text-sm font-medium tracking-wide text-rose-400">
          {formattedDate}
        </span>
      </div>

      <h1 className="animate-fade-in-up font-serif max-w-2xl text-3xl font-medium leading-tight text-rose-500 sm:text-5xl md:text-6xl">
        До твоего дня рождения
        <br />
        осталось:
      </h1>

      <div className="animate-fade-in-up mt-10 sm:mt-14" style={{ animationDelay: '0.3s' }}>
        <CountdownTimer targetDate={targetDate} />
      </div>

      <p
        className="animate-fade-in-up mt-10 max-w-md text-base leading-relaxed text-rose-400/80 sm:text-lg"
        style={{ animationDelay: '0.6s' }}
      >
        Каждая секунда приближает нас к этому особенному дню. Жди с улыбкой — чудо уже близко.
      </p>
    </div>
  );
}

function BirthdayContent() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowButton(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="animate-pop-in mb-6 flex items-center gap-2 rounded-full bg-white/60 px-6 py-2 backdrop-blur-md">
        <Heart size={18} fill="#f75c91" color="#f75c91" />
        <span className="text-sm font-medium tracking-wide text-rose-400">
          30 ноября 2026
        </span>
      </div>

      <h1 className="animate-pop-in font-serif max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl md:text-7xl">
        <span className="text-shimmer">Сегодня особенный день!</span>
      </h1>

      <p className="mt-2 animate-pop-in text-3xl sm:text-4xl">❤️</p>

      <p
        className="animate-fade-in-up mt-6 max-w-md text-base leading-relaxed text-rose-400/90 sm:text-lg"
        style={{ animationDelay: '1s' }}
      >
        Пусть этот день будет наполнен теплом, нежностью и радостью. Ты этого заслуживаешь.
      </p>

      {showButton && (
        <a
          href={NEXT_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shine-btn animate-fade-in-up group mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-rose-400 to-rose-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-rose-400/40 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-rose-500/50 active:scale-95"
          style={{ animationDelay: '0.2s' }}
        >
          <Heart
            size={22}
            fill="white"
            color="white"
            className="transition-transform duration-300 group-hover:scale-125"
          />
          Секретик для тебя!
        </a>
      )}
    </div>
  );
}
