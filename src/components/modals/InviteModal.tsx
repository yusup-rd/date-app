import {
  Angry,
  ArrowRight,
  CalendarDays,
  Heart,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { useState } from "react";
import Tag from "../ui/Tag";
import Card from "../ui/Card";
import Title from "../ui/Title";
import Subtitle from "../ui/Subtitle";
import Description from "../ui/Description";
import ModalWrapper from "../ui/ModalWrapper";
import FallingText from "../ui/FallingText";
import AlternativeText from "../ui/AlternativeText";
import Stamp from "../ui/Stamp";

const INVITE_HEADLINE = "You are invited";
const INVITE_TITLE = "One cute date night?";
const INVITE_SUBTITLE =
  "I made this little corner just for us. Soft lights, good food, and sweet words, with a chance to say yes to a memory together.";

const INVITE_FALLING_SEGMENTS = [
  {
    text: INVITE_HEADLINE,
    wordClass: "falling-text-description",
    breakAfter: true,
  },
  {
    text: INVITE_TITLE,
    wordClass: "falling-text-title",
    breakAfter: true,
  },
  {
    text: INVITE_SUBTITLE,
    wordClass: "falling-text-subtitle",
  },
] as const;

type InviteModalProps = {
  onNext: () => void;
  onDecline: () => void;
};

export function InviteModal({ onNext, onDecline }: InviteModalProps) {
  const [declined, setDeclined] = useState(false);

  const handleDecline = () => {
    setDeclined(true);
    onDecline();
  };

  return (
    <ModalWrapper>
      <div className="flex items-center justify-between gap-4">
        <Tag
          icon={<Sparkles className="h-3.5 w-3.5" />}
          text="A tiny love note"
        />
        <Stamp icon={<Heart className="h-5 w-5 fill-current" />} />
      </div>

      <div className="relative mt-4 text-center sm:mt-5 sm:text-left">
        <div
          className={`relative z-10 space-y-4 ${declined ? "invisible" : ""}`}
          aria-hidden={declined}
        >
          <Description text={INVITE_HEADLINE} />
          <Title text={INVITE_TITLE} />
          <Subtitle text={INVITE_SUBTITLE} />
        </div>
        <FallingText
          fullViewport
          started={declined}
          backgroundColor="transparent"
          className="falling-text-container--left falling-text-container--hidden"
          gravity={0.65}
          highlightWords={["You", "are", "cute", "and", "sweet"]}
          mouseConstraintStiffness={0.85}
          segments={[...INVITE_FALLING_SEGMENTS]}
          trigger="click"
          wireframes={false}
        />
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
          onClick={handleDecline}
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
