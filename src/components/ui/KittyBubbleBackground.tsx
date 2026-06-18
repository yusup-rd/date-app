import { useSyncExternalStore } from "react";
import kittyMask from "../../assets/bg/bg-kitty.svg";
import "../../styles/KittyBubbleBackground.css";

// ─── Tweak these values to adjust the background ─────────────────────────────

/** Kitty count on phones / narrow screens. */
const BUBBLE_COUNT_MOBILE = 52;

/** Kitty count on desktop (md breakpoint and up). */
const BUBBLE_COUNT_DESKTOP = 80;

/** Screen width that counts as desktop — matches Tailwind `md` (768px). */
const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

/** Kitty fill colors — pulled from the app palette. Add or swap hex codes here. */
const PALETTE = [
  "#e86c8a",
  "#f7b39c",
  "#d98aa3",
  "#f4a99a",
  "#c97d93",
] as const;

/** Min / max pixel size for each kitty. */
const SIZE_MIN = 28;
const SIZE_MAX = 80;

/** Opacity range while a kitty is visible (0 = invisible, 1 = solid). */
const OPACITY_MIN = 0.28;
const OPACITY_MAX = 0.58;

/** How long each kitty takes to rise, in seconds (min / max). Higher = slower. */
const DURATION_MIN = 14;
const DURATION_MAX = 36;

/** Max horizontal drift in pixels — controls side-to-side wobble. */
const DRIFT_MAX = 90;

/** Kitties smaller than this get a soft blur to fake depth. Set to 0 to disable. */
const BLUR_SIZE_THRESHOLD = 38;
const BLUR_MIN = 0.2;
const BLUR_MAX = 0.8;

// ─────────────────────────────────────────────────────────────────────────────

type BubbleConfig = {
  id: number;
  left: number;
  size: number;
  color: (typeof PALETTE)[number];
  opacity: number;
  blur: number;
  duration: number;
  delay: number;
  rotStart: number;
  rotEnd: number;
  drift1: number;
  drift2: number;
  drift3: number;
  driftEnd: number;
};

const seeded = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const lerp = (min: number, max: number, t: number) => min + (max - min) * t;

const useIsDesktop = () =>
  useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia(DESKTOP_MEDIA_QUERY);
      media.addEventListener("change", onStoreChange);
      return () => media.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(DESKTOP_MEDIA_QUERY).matches,
    () => false,
  );

const createBubbles = (count: number): BubbleConfig[] =>
  Array.from({ length: count }, (_, i) => {
    const r = (n: number) => seeded(i * 17 + n);

    const size = lerp(SIZE_MIN, SIZE_MAX, r(1));
    const duration = lerp(DURATION_MIN, DURATION_MAX, r(2));
    const drift = (r(3) - 0.5) * DRIFT_MAX * 2;

    return {
      id: i,
      left: r(4) * 100,
      size,
      color: PALETTE[Math.floor(r(5) * PALETTE.length)],
      opacity: lerp(OPACITY_MIN, OPACITY_MAX, r(6)),
      blur:
        BLUR_SIZE_THRESHOLD > 0 && size < BLUR_SIZE_THRESHOLD
          ? lerp(BLUR_MIN, BLUR_MAX, r(7))
          : 0,
      duration,
      delay: -(r(8) * duration),
      rotStart: -35 + r(9) * 70,
      rotEnd: -50 + r(10) * 100,
      drift1: drift * 0.25,
      drift2: drift * 0.6,
      drift3: drift * 0.85,
      driftEnd: drift,
    };
  });

const MOBILE_BUBBLES = createBubbles(BUBBLE_COUNT_MOBILE);
const DESKTOP_BUBBLES = createBubbles(BUBBLE_COUNT_DESKTOP);

export function KittyBubbleBackground() {
  const isDesktop = useIsDesktop();
  const bubbles = isDesktop ? DESKTOP_BUBBLES : MOBILE_BUBBLES;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="kitty-bubble absolute will-change-transform"
          style={
            {
              left: `${bubble.left}%`,
              width: bubble.size,
              height: bubble.size,
              backgroundColor: bubble.color,
              opacity: bubble.opacity,
              filter: bubble.blur > 0 ? `blur(${bubble.blur}px)` : undefined,
              WebkitMaskImage: `url(${kittyMask})`,
              maskImage: `url(${kittyMask})`,
              "--kitty-duration": `${bubble.duration}s`,
              "--kitty-delay": `${bubble.delay}s`,
              "--kitty-opacity": bubble.opacity,
              "--rot-start": `${bubble.rotStart}deg`,
              "--rot-end": `${bubble.rotEnd}deg`,
              "--drift-1": `${bubble.drift1}px`,
              "--drift-2": `${bubble.drift2}px`,
              "--drift-3": `${bubble.drift3}px`,
              "--drift-end": `${bubble.driftEnd}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
