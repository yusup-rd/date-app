interface StampProps {
  icon: React.ReactNode;
}

const Stamp = ({ icon }: StampProps) => {
  return (
    <div className="bg-accent/15 text-accent flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl shadow-sm">
      {icon}
    </div>
  );
};

export default Stamp;
