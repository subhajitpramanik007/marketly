'use client';

import React, { use } from 'react';
import { useSearchParams } from 'next/navigation';

import { ProductDetails } from '@/components/products/ProductDetails';
import { useProductDetails } from '@/hooks/products/useProductDetails';
import { EditProductDetails } from '@/components/products/EditProductDetails';
import { AddProductImages } from '@/components/products/AddProductImages';

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const slug = use(params).productSlug;
  const searchParams = useSearchParams();

  const [action, setAction] = React.useState<'edit' | 'addImages' | null>(null);

  React.useEffect(() => {
    if (searchParams.get('edit') && searchParams.get('edit') === 'true') {
      setAction('edit');
    } else if (searchParams.get('addImages') && searchParams.get('addImages') === 'true') {
      setAction('addImages');
    } else {
      setAction(null);
    }
  }, [searchParams]);

  const { data, isLoading, isError, error } = useProductDetails(slug);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const product = data?.data.product;

  if (!product) return <div>Product not found</div>;

  switch (action) {
    case 'edit':
      return <EditProductDetails product={product} />;
    case 'addImages':
      return <AddProductImages product={product} />;
    default:
      return <ProductDetails product={product} />;
  }
}
