interface DescriptionProps {
  text: string;
}

const Description = ({ text }: DescriptionProps) => {
  return (
    <p className="text-muted-foreground text-sm font-medium tracking-[0.28em] uppercase">
      {text}
    </p>
  );
};

export default Description;
