import { cn } from "@/lib/utils";

export const LandingSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("w-full py-16 lg:h-[calc(100vh-64px)]", className)}>
      {children}
    </div>
  );
};
