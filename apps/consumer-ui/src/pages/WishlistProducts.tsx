'use client';

import { ProductsContainer, ProductsSkeletonContainer } from '@/components/products';
import { useWishlistProducts } from '@/hooks/wishlists/useWishlistProducts';
import * as React from 'react';

export const WishlistProducts: React.FC<{}> = ({}) => {
  const { data, isPending } = useWishlistProducts();

  if (isPending) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-semibold pb-4">Wishlists</h1>

        <ProductsSkeletonContainer />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold pb-4">Wishlists</h1>

      <ProductsContainer
        products={data?.data.products}
        emptyMsg="Your wishlist is empty. Start adding products you love!"
      />
    </div>
  );
};
