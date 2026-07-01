import {
  Angry,
  ArrowRight,
  CalendarDays,
  Heart,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import Tag from "../ui/Tag";
import Card from "../ui/Card";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";
import Description from "../ui/Description";
import ModalWrapper from "../ui/ModalWrapper";
import AlternativeText from "../ui/AlternativeText";
import Stamp from "../ui/Stamp";

type InviteModalProps = {
  onNext: () => void;
  onDecline: () => void;
};

export function InviteModal({ onNext }: InviteModalProps) {
  return (
    <ModalWrapper>
      <div className="flex items-center justify-between gap-4">
        <Tag
          icon={<Sparkles className="h-3.5 w-3.5" />}
          text="A tiny love note"
        />
        <Stamp icon={<Heart className="h-5 w-5 fill-current" />} />
      </div>

      <div className="mt-4 space-y-3 text-center sm:mt-5 sm:space-y-4 sm:text-left">
        <Description text="You are invited" />
        <Title text="One cute date night?" />
        <Subtitle text="I made this little corner just for us. Soft lights, good food, and sweet words, with a chance to say yes to a memory together." />
      </div>

      <div className="mt-4 grid gap-2 sm:mt-5 sm:grid-cols-2 sm:gap-3">
        <Card
          icon={<CalendarDays className="h-4.5 w-4.5" />}
          title="Evening plans"
          description="Golden hour into something cozy"
        />

        <Card
          icon={<UtensilsCrossed className="h-4.5 w-4.5" />}
          title="Choose dinner"
          description="Pick something you're craving"
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:gap-3">
        <button
          type="button"
          onClick={onNext}
          className="bg-primary inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(232,108,138,0.28)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          Yes, I&apos;m in
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="border-primary/15 text-foreground inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border bg-white/90 px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5"
        >
          <Angry className="h-4 w-4" />
          No!
        </button>
      </div>

      <AlternativeText text="Made with extra sugar, a little sparkle, and lots of heart." />
    </ModalWrapper>
  );
}
