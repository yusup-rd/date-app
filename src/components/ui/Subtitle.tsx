interface SubtitleProps {
  text: string;
}

const Subtitle = ({ text }: SubtitleProps) => {
  return (
    <p className="text-muted-foreground text-base leading-7 sm:text-lg">
      {text}
    </p>
  );
};

export default Subtitle;
