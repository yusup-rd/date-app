interface ControlButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}
const ControlButton = ({ icon, text, onClick }: ControlButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-primary/15 text-muted-foreground inline-flex items-center gap-2 rounded-full border bg-white/90 px-3 py-1.5 text-xs font-semibold"
    >
      {icon}
      {text}
    </button>
  );
};

export default ControlButton;
