interface TitleProps {
  text: string;
}

const Title = ({ text }: TitleProps) => {
  return (
    <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
      {text}
    </h1>
  );
};

export default Title;
