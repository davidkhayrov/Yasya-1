import { useEffect, useRef, useState } from 'react';

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calcTimeLeft(target: Date): TimeLeft {
  const now = new Date().getTime();
  const diff = target.getTime() - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

type UnitKey = 'days' | 'hours' | 'minutes' | 'seconds';

const LABELS: Record<UnitKey, string> = {
  days: 'Дней',
  hours: 'Часов',
  minutes: 'Минут',
  seconds: 'Секунд',
};

function TimeCard({
  value,
  label,
  unitKey,
}: {
  value: number;
  label: string;
  unitKey: UnitKey;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const [animateKey, setAnimateKey] = useState(0);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      prevValue.current = value;
      setDisplayValue(value);
      setAnimateKey((k) => k + 1);
    }
  }, [value]);

  return (
    <div className="glass-card animate-glow-pulse relative flex w-[5.2rem] flex-col items-center rounded-2xl px-3 py-4 sm:w-28 sm:py-6 md:w-32">
      <div className="relative h-12 w-full overflow-hidden text-center sm:h-16 md:h-20">
        <span
          key={animateKey}
          className={animateKey > 0 ? 'digit-roll' : ''}
          style={{ display: 'inline-block' }}
        >
          <span className="font-serif block text-4xl font-semibold leading-none text-rose-500 sm:text-5xl md:text-6xl">
            {pad(displayValue)}
          </span>
        </span>
      </div>
      <span className="mt-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-rose-400/80 sm:text-xs">
        {label}
      </span>
      <span className="sr-only">{unitKey}</span>
    </div>
  );
}

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div
      className="grid max-w-md grid-cols-4 gap-3 sm:max-w-2xl sm:gap-4 md:gap-5"
      role="timer"
      aria-live="polite"
      aria-label="Обратный отсчёт до дня рождения"
    >
      <TimeCard value={timeLeft.days} label={LABELS.days} unitKey="days" />
      <TimeCard value={timeLeft.hours} label={LABELS.hours} unitKey="hours" />
      <TimeCard value={timeLeft.minutes} label={LABELS.minutes} unitKey="minutes" />
      <TimeCard value={timeLeft.seconds} label={LABELS.seconds} unitKey="seconds" />
    </div>
  );
}
