import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FoodChoiceModal } from "./components/modals/FoodChoiceModal";
import { InviteModal } from "./components/modals/InviteModal";
import { DateFormModal } from "./components/modals/DateFormModal";

type ModalStep = "invite" | "food" | "date";

function App() {
  const [step, setStep] = useState<ModalStep>("invite");
  const [selectedFood, setSelectedFood] = useState<string | null>(null);

  const handleFoodSelect = (foodName: string) => {
    setSelectedFood(foodName);
    setStep("date");
  };

  return (
    <main className="bg-background text-foreground relative min-h-dvh overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_44%),radial-gradient(circle_at_20%_20%,rgba(255,177,193,0.45),transparent_26%),radial-gradient(circle_at_80%_15%,rgba(255,221,178,0.48),transparent_28%),linear-gradient(180deg,rgba(255,248,244,0.92),rgba(255,240,246,0.9))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-size-[18px_18px] opacity-30" />

      <section className="relative grid min-h-dvh place-items-center px-4 py-8 sm:px-6">
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
                onDecline={() => setStep("invite")}
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
  );
}

export default App;
