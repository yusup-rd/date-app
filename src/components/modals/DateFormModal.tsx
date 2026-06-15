import { ArrowLeft, CalendarCheck2 } from "lucide-react";

type DateFormModalProps = {
  onBack: () => void;
  selectedFood: string | null;
};

export function DateFormModal({ onBack, selectedFood }: DateFormModalProps) {
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
          <div className="bg-accent/15 text-accent inline-flex h-10 w-10 items-center justify-center rounded-2xl">
            <CalendarCheck2 className="h-4.5 w-4.5" />
          </div>
        </div>

        <div className="mt-5 text-center sm:text-left">
          <p className="text-muted-foreground text-sm font-medium tracking-[0.28em] uppercase">
            Step 3
          </p>
          <h1 className="text-foreground mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            Third modal
          </h1>
          <p className="text-muted-foreground mt-3 text-base leading-7 sm:text-lg">
            Drafting our schedule{selectedFood ? ` with ${selectedFood}` : ""}.
            Pick a day and time.
          </p>
        </div>

        <form className="mt-6 space-y-4">
          <label className="block space-y-1.5">
            <span className="text-foreground text-sm font-semibold">
              Date day
            </span>
            <input
              type="date"
              className="border-primary/15 text-foreground block w-full rounded-xl border bg-white/90 px-3 py-2.5"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-foreground text-sm font-semibold">Time</span>
            <input
              type="time"
              className="border-primary/15 text-foreground block w-full rounded-xl border bg-white/90 px-3 py-2.5"
            />
          </label>

          <button
            type="button"
            className="bg-primary inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(232,108,138,0.28)]"
          >
            Save for now
          </button>
        </form>
      </div>
    </article>
  );
}
