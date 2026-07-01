import { CalendarHeart, CheckCircle2, Sparkles } from "lucide-react";
import ModalWrapper from "../ui/ModalWrapper";
import Stamp from "../ui/Stamp";
import Tag from "../ui/Tag";
import Description from "../ui/Description";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";
import AlternativeText from "../ui/AlternativeText";
import { FOOD_OPTIONS } from "../../utils/constants";

type FinalModalProps = {
  selectedFood: string | null;
  selectedDate: string | null;
  selectedTime: string | null;
};

export function FinalModal({
  selectedFood,
  selectedDate,
  selectedTime,
}: FinalModalProps) {
  const selectedFoodOption = FOOD_OPTIONS.find(
    (option) => option.name === selectedFood,
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);

    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const planSummary = [
    selectedFoodOption
      ? `${selectedFoodOption.emoji} ${selectedFoodOption.name} Date`
      : selectedFood
        ? `${selectedFood} Date`
        : null,
    selectedDate ? formatDate(selectedDate) : null,
    selectedTime ? formatTime(selectedTime) : null,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <ModalWrapper>
      <div className="flex items-center justify-between gap-4">
        <Tag icon={<Sparkles className="h-3.5 w-3.5" />} text="All set" />
        <Stamp icon={<CheckCircle2 className="h-5 w-5" />} />
      </div>

      <div className="mt-4 space-y-3 text-center sm:mt-5 sm:space-y-4 sm:text-left">
        <Description text="Final step" />
        <Title text="It's a date!" />
        <Subtitle text="Everything is saved and ready. Thank you for saying yes to this cute little plan." />
      </div>

      <div className="border-primary/12 mt-4 rounded-2xl border bg-white/80 p-4 sm:mt-5">
        <div className="text-primary mb-2 inline-flex items-center gap-2 text-sm font-semibold">
          <CalendarHeart className="h-4 w-4" />
          Planned details
        </div>

        <p className="text-foreground text-sm font-medium">
          {planSummary || "We are all set for a lovely date."}
        </p>
      </div>

      <AlternativeText text="Can't wait to see you!" />
    </ModalWrapper>
  );
}
