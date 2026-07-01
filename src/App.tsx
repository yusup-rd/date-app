import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { KittyBubbleBackground } from "./components/ui/KittyBubbleBackground";
import ClickSpark from "./components/ui/ClickSpark";
import { FoodChoiceModal } from "./components/modals/FoodChoiceModal";
import { InviteModal } from "./components/modals/InviteModal";
import { DateFormModal } from "./components/modals/DateFormModal";
import { FinalModal } from "./components/modals/FinalModal";
import NoStrikeAnimation from "./components/ui/NoStrikeAnimation.tsx";
import kittyMask from "./assets/bg/bg-kitty.svg";
import run1 from "./assets/animate/run-1.png";
import run2 from "./assets/animate/run-2.png";
import run3 from "./assets/animate/run-3.png";
import run4 from "./assets/animate/run-4.png";
import jump1 from "./assets/animate/jump-1.png";
import jump2 from "./assets/animate/jump-2.png";
import jump3 from "./assets/animate/jump-3.png";
import jump4 from "./assets/animate/jump-4.png";
import jump5 from "./assets/animate/jump-5.png";
import jump6 from "./assets/animate/jump-6.png";
import jump7 from "./assets/animate/jump-7.png";
import jump8 from "./assets/animate/jump-8.png";
import { Heart } from "lucide-react";

type ModalStep = "invite" | "food" | "date" | "final";

type NoStrikeState = {
  buttonRect: DOMRect;
  id: number;
};

const PRELOAD_ASSETS = [
  kittyMask,
  run1,
  run2,
  run3,
  run4,
  jump1,
  jump2,
  jump3,
  jump4,
  jump5,
  jump6,
  jump7,
  jump8,
];

const preloadImage = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const image = new Image();
    image.src = src;

    if (image.complete) {
      resolve();
      return;
    }

    image.onload = () => resolve();
    image.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
  });

const preloadFonts = async () => {
  if (!("fonts" in document)) {
    return;
  }

  await Promise.all([
    document.fonts.load('400 1rem "Quicksand"'),
    document.fonts.load('500 1rem "Quicksand"'),
    document.fonts.load('600 1rem "Quicksand"'),
    document.fonts.load('400 1rem "Pacifico"'),
    document.fonts.ready,
  ]);
};

function GlobalLoader() {
  return (
    <main className="bg-background text-foreground relative grid h-dvh place-items-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_52%),radial-gradient(circle_at_15%_20%,rgba(232,108,138,0.18),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(247,179,156,0.24),transparent_30%)]" />

      <div className="relative flex flex-col items-center gap-5 text-center">
        <motion.div
          className="border-primary/20 flex h-16 w-16 items-center justify-center rounded-2xl border bg-white/85 shadow-[0_12px_34px_rgba(232,108,138,0.2)]"
          animate={{ rotate: [0, -12, 12, -8, 8, 0], y: [0, -4, 0] }}
          transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart className="fill-primary text-primary h-8 w-8" />
        </motion.div>
        <p className="text-foreground text-sm font-semibold sm:text-base">
          Preparing all the cute things...
        </p>
      </div>
    </main>
  );
}

function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [step, setStep] = useState<ModalStep>("invite");
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [noStrike, setNoStrike] = useState<NoStrikeState | null>(null);
  const [isNoGone, setIsNoGone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      await Promise.all([
        preloadFonts(),
        Promise.all(PRELOAD_ASSETS.map((assetPath) => preloadImage(assetPath))),
      ]);

      if (isMounted) {
        setIsAppReady(true);
      }
    };

    void bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFoodSelect = (foodName: string) => {
    setSelectedFood(foodName);
    setStep("date");
  };

  const handleNoClick = (buttonElement: HTMLButtonElement) => {
    setNoStrike({
      buttonRect: buttonElement.getBoundingClientRect(),
      id: Date.now(),
    });
  };

  const handleNoKick = () => {
    setIsNoGone(true);
  };

  const clearNoStrike = () => {
    setNoStrike(null);
  };

  const handleDateSubmit = async ({
    date,
    time,
  }: {
    date: string;
    time: string;
  }) => {
    setIsSubmitting(true);

    const loadingToast = toast.loading("Sending your date request...");

    try {
      const res = await fetch("/.netlify/functions/sendTelegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          food: selectedFood,
          date,
          time,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Sent! Check Telegram 💌", {
        id: loadingToast,
      });

      setSelectedDate(date);
      setSelectedTime(time);
      setStep("final");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      toast.error(message, {
        id: loadingToast,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAppReady) {
    return <GlobalLoader />;
  }

  return (
    <ClickSpark
      className="h-dvh w-full overflow-hidden"
      duration={450}
      sparkColor="#e86c8a"
      sparkCount={10}
      sparkRadius={22}
      sparkSize={12}
    >
      <Toaster position="top-center" />
      <main className="bg-background text-foreground relative h-dvh overflow-hidden">
        <KittyBubbleBackground />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.68),transparent_48%),radial-gradient(circle_at_18%_22%,rgba(232,108,138,0.16),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(247,179,156,0.2),transparent_32%),linear-gradient(180deg,rgba(255,247,242,0.58),rgba(255,240,246,0.62))]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-size-[18px_18px] opacity-20" />

        <section className="relative grid h-full place-items-center overflow-hidden px-4 py-4 sm:px-6 sm:py-6">
          {noStrike ? (
            <NoStrikeAnimation
              key={noStrike.id}
              buttonRect={noStrike.buttonRect}
              onKick={handleNoKick}
              onComplete={clearNoStrike}
            />
          ) : null}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === "invite" ? (
                <InviteModal
                  isNoGone={isNoGone}
                  onDecline={handleNoClick}
                  onNext={() => setStep("food")}
                />
              ) : null}

              {step === "food" ? (
                <FoodChoiceModal
                  onBack={() => setStep("invite")}
                  onSelect={handleFoodSelect}
                  selectedFood={selectedFood}
                />
              ) : null}

              {step === "date" ? (
                <DateFormModal
                  onBack={() => setStep("food")}
                  onSubmitDate={handleDateSubmit}
                  selectedFood={selectedFood}
                  isLoading={isSubmitting}
                />
              ) : null}

              {step === "final" ? (
                <FinalModal
                  selectedDate={selectedDate}
                  selectedFood={selectedFood}
                  selectedTime={selectedTime}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </ClickSpark>
  );
}

export default App;
