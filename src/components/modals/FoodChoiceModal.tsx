import { ArrowLeft, UtensilsCrossed } from "lucide-react";

const foodOptions = [
  { emoji: "🍕", name: "Pizza" },
  { emoji: "🍔", name: "Burger" },
  { emoji: "🍣", name: "Sushi" },
  { emoji: "🍜", name: "Ramen" },
  { emoji: "🌮", name: "Tacos" },
  { emoji: "🍩", name: "Donuts" },
  { emoji: "🥞", name: "Pancakes" },
  { emoji: "🍓", name: "Strawberry Treat" },
] as const;

type FoodChoiceModalProps = {
  onBack: () => void;
  onSelect: (foodName: string) => void;
  selectedFood: string | null;
};

export function FoodChoiceModal({
  onBack,
  onSelect,
  selectedFood,
}: FoodChoiceModalProps) {
  return (
    <article className="w-full max-w-lg rounded-4xl border border-white/70 bg-white/75 p-4 shadow-[0_20px_70px_rgba(255,146,173,0.22)] backdrop-blur-xl sm:p-6">
      <div className="border-primary/10 rounded-[1.6rem] border bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,245,247,0.96))] p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="border-primary/15 text-muted-foreground inline-flex items-center gap-2 rounded-full border bg-white/90 px-3 py-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>
          <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium">
            <UtensilsCrossed className="h-3.5 w-3.5" />
            Dinner vote
          </div>
        </div>

        <div className="mt-5 text-center sm:text-left">
          <p className="text-muted-foreground text-sm font-medium tracking-[0.28em] uppercase">
            Step 2
          </p>
          <h1 className="text-foreground mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            What should we eat?
          </h1>
          <p className="text-muted-foreground mt-3 text-base leading-7 sm:text-lg">
            Pick one cute option and I&apos;ll prep our date plan around it.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {foodOptions.map((food) => {
            const isActive = selectedFood === food.name;

            return (
              <button
                key={food.name}
                type="button"
                onClick={() => onSelect(food.name)}
                className={`rounded-2xl border p-3 text-center transition duration-200 hover:-translate-y-0.5 ${
                  isActive
                    ? "border-primary bg-primary/10"
                    : "border-primary/10 bg-background/85"
                }`}
              >
                <span className="text-3xl" aria-hidden="true">
                  {food.emoji}
                </span>
                <p className="text-foreground mt-2 text-sm font-semibold">
                  {food.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </article>
  );
}
