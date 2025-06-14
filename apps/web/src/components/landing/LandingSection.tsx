import { cn } from '@/lib/utils';

export const LandingSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn('lg:h-[calc(100vh-64px)] w-full py-16', className)}>{children}</div>;
};
