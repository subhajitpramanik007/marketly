export default function AuthLayout({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) {
  return (
    <div className="via-background container mx-auto flex min-h-screen w-full flex-col justify-center bg-gradient-to-bl from-amber-50 to-amber-100">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-4xl py-8">
          <h1 className="bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-center text-4xl font-bold tracking-tighter text-transparent">
            Marketly
          </h1>
          <p className="text-muted-foreground animation-duration-initial pt-4 text-center text-xl font-semibold transition-all duration-300 ease-in-out">
            {title}
          </p>
          <div className="flex justify-center py-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
