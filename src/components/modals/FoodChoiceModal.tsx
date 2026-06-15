import { ArrowLeft, UtensilsCrossed } from "lucide-react";
import Tag from "../ui/Tag";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";
import Description from "../ui/Description";
import ControlButton from "../ui/ControlButton";
import ModalWrapper from "../ui/ModalWrapper";

const foodOptions = [
  { emoji: "🍕", name: "Pizza" },
  { emoji: "🍔", name: "Burger" },
  { emoji: "🍣", name: "Sushi" },
  { emoji: "🍜", name: "Ramen" },
  { emoji: "🍝", name: "Pasta" },
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
    <ModalWrapper>
      <div className="flex items-center justify-between gap-4">
        <ControlButton
          icon={<ArrowLeft className="h-3.5 w-3.5" />}
          text="Back"
          onClick={onBack}
        />
        <Tag
          icon={<UtensilsCrossed className="h-3.5 w-3.5" />}
          text="Dinner vote"
        />
      </div>

      <div className="mt-4 space-y-3 text-center sm:mt-5 sm:space-y-4 sm:text-left">
        <Description text="Step 2" />
        <Title text="What should we eat?" />
        <Subtitle text="Pick one cute option and I'll prep our date plan around it." />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:gap-3">
        {foodOptions.map((food) => {
          const isActive = selectedFood === food.name;

          return (
            <button
              key={food.name}
              type="button"
              onClick={() => onSelect(food.name)}
              className={`rounded-2xl border p-2 text-center transition duration-200 hover:-translate-y-0.5 sm:p-3 ${
                isActive
                  ? "border-primary bg-primary/10"
                  : "border-primary/10 bg-background/85 shadow-sm"
              }`}
            >
              <span className="text-2xl sm:text-3xl" aria-hidden="true">
                {food.emoji}
              </span>
              <p className="text-foreground mt-2 text-sm font-semibold">
                {food.name}
              </p>
            </button>
          );
        })}
      </div>
    </ModalWrapper>
  );
}
