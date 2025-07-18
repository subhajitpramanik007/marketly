import type { ISingleProduct } from '@/types/product.types';
import { Link } from '@tanstack/react-router';
import * as React from 'react';

interface ProductDetailSectionProps {
  product: ISingleProduct;
}

export const ProductDetailSection: React.FC<ProductDetailSectionProps> = ({ product }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="border-b">
        {/* Product name */}
        <h1 className="text-3xl font-bold capitalize">{product.name}</h1>

        {/* TODO: add store link */}
        <Link to={`.`}>
          <span className="text-sm text-sky-600 hover:underline hover:text-sky-700">
            Visit store - {product.store.storeName}
          </span>
        </Link>

        {/* Rating */}
        {product.ratings ? (
          <p className="text-sm text-muted-foreground">Rating: {product.ratings}</p>
        ) : (
          <p className="text-sm text-muted-foreground">No ratings yet</p>
        )}
      </div>

      {/* Price */}
      <div>
        <span className="font-semibold">
          ₹ <span className="text-2xl">{product.price}</span>
        </span>
      </div>

      {/* Description */}
      <div className="p-1 bg-muted rounded-md w-full">
        <h3>
          <span className="font-semibold">Description:</span>
        </h3>
        <p className="text-sm text-muted-foreground pb-2">{product.description}</p>
      </div>
    </div>
  );
};
