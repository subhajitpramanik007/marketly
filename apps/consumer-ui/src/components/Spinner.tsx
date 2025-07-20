import * as React from 'react';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  className?: string;
  isLoading: boolean;
}

export const Spinner: React.FC<SpinnerProps> = ({ className, isLoading }) => {
  if (!isLoading) return null;

  return <Loader2 className={cn('animate-spin size-4', className)} />;
};
