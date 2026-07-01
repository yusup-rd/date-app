import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { KittyBubbleBackground } from "./components/ui/KittyBubbleBackground";
import ClickSpark from "./components/ui/ClickSpark";
import { FoodChoiceModal } from "./components/modals/FoodChoiceModal";
import { InviteModal } from "./components/modals/InviteModal";
import { DateFormModal } from "./components/modals/DateFormModal";
import NoStrikeAnimation from "./components/ui/NoStrikeAnimation.tsx";

type ModalStep = "invite" | "food" | "date";

type NoStrikeState = {
  buttonRect: DOMRect;
  id: number;
};

function App() {
  const [step, setStep] = useState<ModalStep>("invite");
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [noStrike, setNoStrike] = useState<NoStrikeState | null>(null);
  const [isNoGone, setIsNoGone] = useState(false);

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

  return (
    <ClickSpark
      className="h-dvh w-full overflow-hidden"
      duration={450}
      sparkColor="#e86c8a"
      sparkCount={10}
      sparkRadius={22}
      sparkSize={12}
    >
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
                  selectedFood={selectedFood}
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
