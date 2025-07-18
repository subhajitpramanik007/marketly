import * as React from 'react';
import type { IProduct } from '@/types/product.types';

import { ProductCard } from './ProductCard';

interface ProductsSkeletonContainerProps {
  products?: IProduct[];
}

export const ProductsContainer: React.FC<ProductsSkeletonContainerProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div>
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};
