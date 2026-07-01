import { ArrowLeft, CalendarCheck2, Heart } from "lucide-react";
import ModalWrapper from "../ui/ModalWrapper";
import ControlButton from "../ui/ControlButton";
import Stamp from "../ui/Stamp";
import Description from "../ui/Description";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";

type DateFormModalProps = {
  onBack: () => void;
  onSubmitDate: (payload: { date: string; time: string }) => void;
  selectedFood: string | null;
};

export function DateFormModal({
  onBack,
  onSubmitDate,
  selectedFood,
}: DateFormModalProps) {
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit: React.ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedDate = String(formData.get("date") ?? "");
    const selectedTime = String(formData.get("time") ?? "");

    console.log("Selected food:", selectedFood);
    console.log("Selected date:", selectedDate);
    console.log("Selected time:", selectedTime);

    onSubmitDate({ date: selectedDate, time: selectedTime });
  };

  return (
    <ModalWrapper>
      <div className="flex items-center justify-between gap-4">
        <ControlButton
          icon={<ArrowLeft className="h-3.5 w-3.5" />}
          text="Back"
          onClick={onBack}
        />
        <Stamp icon={<CalendarCheck2 className="h-5 w-5" />} />
      </div>

      <div className="mt-4 space-y-3 text-center sm:mt-5 sm:space-y-4 sm:text-left">
        <Description text="Step 3" />
        <Title text={`${selectedFood} Date?`} />
        <Subtitle text="Pick a day and time for our date. I can't wait to see you!" />
      </div>

      <form
        className="mt-4 space-y-3 sm:mt-5 sm:space-y-4"
        onSubmit={handleSubmit}
      >
        <label className="block space-y-1.5">
          <span className="text-foreground text-sm font-semibold">Day</span>
          <input
            type="date"
            name="date"
            min={today}
            className="border-primary/15 text-foreground block w-full rounded-xl border bg-white/90 px-3 py-2.5"
            required
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-foreground text-sm font-semibold">Time</span>
          <input
            type="time"
            name="time"
            className="border-primary/15 text-foreground block w-full rounded-xl border bg-white/90 px-3 py-2.5"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-primary inline-flex w-full flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(232,108,138,0.28)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          Let's go!
          <Heart className="h-4 w-4 fill-white" />
        </button>
      </form>
    </ModalWrapper>
  );
}
