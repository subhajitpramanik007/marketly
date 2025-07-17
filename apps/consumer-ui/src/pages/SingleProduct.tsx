import * as React from 'react';
import { useSingleProduct } from '@/hooks/products/useSingleProduct';
import { SingleProduct } from '@/components/products/SingleProduct';

interface _props {
  slug: string;
}

export const SingleProductPage: React.FC<_props> = ({ slug }) => {
  const { data, isLoading, isError, error } = useSingleProduct({ slug });

  if (isError) {
    return <div className="p-4">{error.message}</div>;
  }

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if(!data?.product) {
    return <div className="p-4">Product not found</div>;
  }

  return <SingleProduct product={data.product} />;
};
