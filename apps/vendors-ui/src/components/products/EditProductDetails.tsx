'use client';

import * as React from 'react';
import { IProduct } from '@/types';
import { ProductDetailsEditForm } from './ProductDetailsEditForm';

export const EditProductDetails: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div className="max-w-4xl mx-auto rounded-2xl shadow-md p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product Details</h1>
      <ProductDetailsEditForm product={product} />
    </div>
  );
};
