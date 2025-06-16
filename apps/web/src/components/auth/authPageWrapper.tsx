"use client";

import { cn } from "@/lib/utils";
import { useSubDomain } from "@/store/subdomain.store";

export function AuthPageWrapper({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  const { isInit } = useSubDomain();

  return (
    <div className={cn("w-full max-w-4xl py-8", className)}>
      <h1 className="bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-center text-4xl font-bold tracking-tighter text-transparent">
        Marketly
      </h1>
      <p
        className={cn(
          "text-muted-foreground animation-duration-initial pt-4 text-center text-xl font-semibold transition-all duration-300 ease-in-out",
          !isInit && "blur-xs",
        )}
      >
        {title}
      </p>
      <div className="flex justify-center py-8">{children}</div>
    </div>
  );
}
