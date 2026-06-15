interface ModalWrapperProps {
  children: React.ReactNode;
}

const ModalWrapper = ({ children }: ModalWrapperProps) => {
  return (
    <article className="flex max-h-[calc(100dvh-2rem)] w-full max-w-lg overflow-hidden rounded-4xl border border-white/70 bg-white/75 p-3 shadow-[0_20px_70px_rgba(255,146,173,0.22)] backdrop-blur-xl sm:max-h-[calc(100dvh-3rem)] sm:p-5">
      <div className="border-primary/10 flex max-h-full flex-col overflow-hidden rounded-[1.6rem] border bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,245,247,0.96))] p-4 sm:p-6">
        {children}
      </div>
    </article>
  );
};

export default ModalWrapper;
