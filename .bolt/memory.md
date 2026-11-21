# Project memory

## Product intent & audience

- Personal birthday countdown site — a tender, atmospheric "small personal story" built with love.
- Target event date: November 21, 2026, 00:00 local user time.
- UI language: Russian throughout.
- Part of a greeting "chain": a "Секретик для тебя!" button transitions to the next site in the chain (URL still pending).

## Brand personality & voice

- Aesthetic, gentle, atmospheric, non-cookie-cutter; designed to feel like returning to a loved one's story.
- Emotional warmth over polish; celebratory and intimate.

## Visual design & UX direction

- Palette: soft pink, milky/cream, white, gold accents.
- Translucent "glass" cards, soft glow, gradient backgrounds.
- Background animation: slowly drifting luminous particles, small hearts, stars (CSS-driven).
- Elegant typography; smooth fade/slide-in entrance animations; digit-change animation on timer cards.
- Timer: four cards (Дни / Часы / Минуты / Секунды), updates every second without page reload.
- On zero: hide timer, trigger confetti + rising hearts, show "Сегодня особенный день! ❤️" with shimmering gold text, then reveal shimmer-on-hover "Секретик для тебя!" button.
- Strong mobile/smartphone responsiveness.

## Decisions, constraints & rationale

- Stack: React + Vite, Tailwind CSS, lucide-react icons, `@/` path alias (per `.bolt/prompt`).
- CSS animations only; no paid libraries; no extra UI/icon packages beyond allowed defaults.
- Timer computes target in user's local timezone.
- Clean, structured code ready for Vercel deployment.

## Open questions & assumptions

- Next-site URL for the "Секретик для тебя!" chain link is still a placeholder — needs real destination.
- Assumed countdown target is a fixed calendar date (not recurring annually).