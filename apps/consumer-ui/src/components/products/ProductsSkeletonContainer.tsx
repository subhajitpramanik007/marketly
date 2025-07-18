import * as React from 'react';
import { ProductCardSkeleton } from './ProductCardSkeleton';

export const ProductsSkeletonContainer: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {[...Array(12)].map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
