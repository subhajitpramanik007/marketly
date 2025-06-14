export const HeaderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </header>
  );
};
