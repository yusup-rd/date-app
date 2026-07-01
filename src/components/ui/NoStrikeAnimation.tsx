import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import jump1 from "../../assets/animate/jump-1.png";
import jump2 from "../../assets/animate/jump-2.png";
import jump3 from "../../assets/animate/jump-3.png";
import jump4 from "../../assets/animate/jump-4.png";
import jump5 from "../../assets/animate/jump-5.png";
import jump6 from "../../assets/animate/jump-6.png";
import jump7 from "../../assets/animate/jump-7.png";
import jump8 from "../../assets/animate/jump-8.png";
import run1 from "../../assets/animate/run-1.png";
import run2 from "../../assets/animate/run-2.png";
import run3 from "../../assets/animate/run-3.png";
import run4 from "../../assets/animate/run-4.png";

const RUN_FRAMES = [run1, run2, run3, run4];
const JUMP_FRAMES = [jump1, jump2, jump3, jump4, jump5, jump6, jump7, jump8];
const RUN_TRAVEL_DURATION = 0.8;
const RETURN_TRAVEL_DURATION = 0.95;
const KICK_FRAME_INTERVAL = 70;
const KICK_TOTAL_DURATION = JUMP_FRAMES.length * KICK_FRAME_INTERVAL;

type NoStrikeAnimationProps = {
  buttonRect: DOMRect;
  onKick: () => void;
  onComplete: () => void;
};

function NoStrikeAnimation({
  buttonRect,
  onKick,
  onComplete,
}: NoStrikeAnimationProps) {
  const [phase, setPhase] = useState<"run" | "kick" | "return">("run");
  const [runFrameIndex, setRunFrameIndex] = useState(0);
  const [kickFrameIndex, setKickFrameIndex] = useState(0);
  const [returnFrameIndex, setReturnFrameIndex] = useState(0);
  const [showFlyingButton, setShowFlyingButton] = useState(false);
  const kittySize = 124;
  const startX = window.innerWidth + 140;
  const startY = Math.max(24, buttonRect.top - 78);
  const targetX = Math.max(
    buttonRect.left + buttonRect.width - kittySize * 0.9,
    buttonRect.left - 92,
  );
  const targetY = Math.max(18, buttonRect.top - 56);

  useEffect(() => {
    if (phase !== "run") {
      return;
    }

    const interval = window.setInterval(() => {
      setRunFrameIndex(
        (currentIndex) => (currentIndex + 1) % RUN_FRAMES.length,
      );
    }, 80);

    return () => {
      window.clearInterval(interval);
    };
  }, [onKick, phase]);

  useEffect(() => {
    if (phase !== "kick") {
      return;
    }

    const interval = window.setInterval(() => {
      setKickFrameIndex((currentIndex) =>
        Math.min(currentIndex + 1, JUMP_FRAMES.length - 1),
      );
    }, KICK_FRAME_INTERVAL);
    const flyingButtonTimer = window.setTimeout(
      () => setShowFlyingButton(true),
      110,
    );
    const returnTimer = window.setTimeout(() => {
      setPhase("return");
    }, KICK_TOTAL_DURATION + 40);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(flyingButtonTimer);
      window.clearTimeout(returnTimer);
    };
  }, [onComplete, phase]);

  useEffect(() => {
    if (phase !== "return") {
      return;
    }

    const interval = window.setInterval(() => {
      setReturnFrameIndex(
        (currentIndex) => (currentIndex + 1) % RUN_FRAMES.length,
      );
    }, 80);

    const doneTimer = window.setTimeout(onComplete, 1100);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(doneTimer);
    };
  }, [onComplete, phase]);

  const frameSource =
    phase === "kick"
      ? JUMP_FRAMES[kickFrameIndex]
      : phase === "return"
        ? RUN_FRAMES[returnFrameIndex]
        : RUN_FRAMES[runFrameIndex];
  const mirrored = phase !== "return";
  const animatedX = phase === "return" ? startX : targetX;
  const animatedY = phase === "return" ? startY : targetY;

  const handleMotionComplete = () => {
    if (phase === "run") {
      setKickFrameIndex(0);
      setPhase("kick");
      onKick();
      return;
    }

    if (phase === "return") {
      onComplete();
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-10001 overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 z-20"
        initial={{ x: startX, y: startY }}
        animate={{ x: animatedX, y: animatedY }}
        onAnimationComplete={handleMotionComplete}
        transition={
          phase === "return"
            ? { duration: RETURN_TRAVEL_DURATION, ease: [0.22, 1, 0.36, 1] }
            : { duration: RUN_TRAVEL_DURATION, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <img
          alt="Hello Kitty running in to kick the button"
          className="h-31 w-31 drop-shadow-[0_18px_24px_rgba(232,108,138,0.22)] will-change-transform select-none"
          decoding="async"
          draggable={false}
          src={frameSource}
          style={{
            transform: mirrored ? "scaleX(-1)" : "scaleX(1)",
            backfaceVisibility: "hidden",
          }}
        />
      </motion.div>

      <AnimatePresence>
        {showFlyingButton ? (
          <motion.button
            aria-hidden="true"
            className="border-primary/15 text-foreground pointer-events-none absolute z-10 inline-flex items-center justify-center gap-2 rounded-full border bg-white/90 px-5 py-3 text-sm font-semibold shadow-[0_14px_30px_rgba(232,108,138,0.28)]"
            initial={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
            animate={{
              opacity: 0,
              scale: 0.45,
              x: -260,
              y: -190,
              rotate: -720,
            }}
            exit={{ opacity: 0 }}
            style={{
              left: buttonRect.left,
              top: buttonRect.top,
              width: buttonRect.width,
              height: buttonRect.height,
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            No!
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default NoStrikeAnimation;
