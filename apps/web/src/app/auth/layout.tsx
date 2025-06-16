import { RootHeader } from "@/components/navigation/header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="via-background container mx-auto flex min-h-screen w-full flex-col justify-center bg-gradient-to-bl from-amber-50 to-amber-100">
      <RootHeader />

      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
}
