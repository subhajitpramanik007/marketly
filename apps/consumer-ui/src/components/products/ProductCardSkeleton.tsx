import * as React from 'react';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductCardSkeletonProps {}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({}) => {
  return (
    <Card className="w-full p-0 relative">
      <div className="absolute flex flex-col gap-2 right-2 top-2">
        <div className="size-12 border border-border rounded-md bg-secondary" />
        <div className="size-12 border border-border rounded-md bg-secondary" />
      </div>
      <Skeleton className="w-full aspect-square" />
      <div className="p-4">
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
      </div>
    </Card>
  );
};
