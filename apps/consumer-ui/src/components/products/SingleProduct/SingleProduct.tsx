import type { ISingleProduct } from '@/types/product.types';

import { ImageSection } from './ImageSection';
import { AddCartCard } from './AddCartCard';
import { ProductDetailSection } from './ProductDetailSection';

export const SingleProduct = ({ product }: { product: ISingleProduct }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 md:gap-4">
      <div className="w-full md:basis-1/2">
        <ImageSection images={product.images} />
      </div>
      <div className="flex flex-col gap-4 w-full md:basis-1/2">
        <ProductDetailSection product={product} />
        <AddCartCard id={product.id} price={product.price} />
      </div>
    </div>
  );
};
