interface AlternativeTextProps {
  text: string;
}

const AlternativeText = ({ text }: AlternativeTextProps) => {
  return (
    <p className="text-muted-foreground mt-3 text-center text-xs sm:mt-4">
      {text}
    </p>
  );
};

export default AlternativeText;
