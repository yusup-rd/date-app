interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Card = ({ icon, title, description }: CardProps) => {
  return (
    <div className="border-primary/10 bg-background/80 rounded-2xl border p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-primary/12 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
          {icon}
        </div>
        <div>
          <p className="text-foreground text-sm font-medium">{title}</p>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
