import {
  ArrowRight,
  CalendarDays,
  CircleOff,
  Heart,
  MapPin,
  Sparkles,
} from "lucide-react";

type InviteModalProps = {
  onNext: () => void;
  onDecline: () => void;
};

export function InviteModal({ onNext, onDecline }: InviteModalProps) {
  return (
    <article className="w-full max-w-lg rounded-4xl border border-white/70 bg-white/75 p-4 shadow-[0_20px_70px_rgba(255,146,173,0.22)] backdrop-blur-xl sm:p-6">
      <div className="border-primary/10 rounded-[1.6rem] border bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,245,247,0.96))] p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <div className="border-primary/15 bg-primary/8 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3.5 w-3.5" />A tiny love note
          </div>
          <div className="bg-accent/15 text-accent flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm">
            <Heart className="h-5 w-5 fill-current" />
          </div>
        </div>

        <div className="mt-6 space-y-4 text-center sm:text-left">
          <p className="text-muted-foreground text-sm font-medium tracking-[0.28em] uppercase">
            You are invited
          </p>
          <div className="space-y-5">
            <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
              One cute date night?
            </h1>
            <p className="text-muted-foreground text-base leading-7 sm:text-lg">
              I made this little corner just for us. Soft lights, good food,
              sweet words, and a chance to say yes to a memory together.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="border-primary/10 bg-background/80 rounded-2xl border p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/12 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                <CalendarDays className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-foreground text-sm font-medium">
                  Friday evening
                </p>
                <p className="text-muted-foreground text-sm">
                  Sunset to stargazing
                </p>
              </div>
            </div>
          </div>

          <div className="border-primary/10 bg-background/80 rounded-2xl border p-4">
            <div className="flex items-center gap-3">
              <div className="bg-accent/12 text-accent flex h-10 w-10 items-center justify-center rounded-full">
                <MapPin className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-foreground text-sm font-medium">
                  A cozy surprise
                </p>
                <p className="text-muted-foreground text-sm">
                  Somewhere pretty nearby
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onNext}
            className="bg-primary inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(232,108,138,0.28)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Yes, I&apos;m in
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onDecline}
            className="border-primary/15 text-foreground inline-flex flex-1 items-center justify-center gap-2 rounded-full border bg-white/90 px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
          >
            <CircleOff className="h-4 w-4" />
            No
          </button>
        </div>

        <p className="text-muted-foreground mt-5 text-center text-xs sm:text-left">
          Made with extra sugar, a little sparkle, and lots of heart.
        </p>
      </div>
    </article>
  );
}
