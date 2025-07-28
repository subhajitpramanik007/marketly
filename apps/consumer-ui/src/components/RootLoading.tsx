import * as React from 'react';
import { Skeleton } from './ui/skeleton';
import { ShoppingCartIcon } from 'lucide-react';

export const RootLoading: React.FC = ({}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <Skeleton className="h-16 w-full border-b" />
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <ShoppingCartIcon className="size-32 text-primary/50 animate-pulse" />
      </div>
    </div>
  );
};
