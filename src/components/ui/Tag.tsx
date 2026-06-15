interface TagProps {
  icon: React.ReactNode;
  text: string;
}
const Tag = ({ icon, text }: TagProps) => {
  return (
    <div className="border-primary/15 bg-primary/8 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

export default Tag;
