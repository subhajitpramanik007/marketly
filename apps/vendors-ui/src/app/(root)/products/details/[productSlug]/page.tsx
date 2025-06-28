'use client';

import { use } from 'react';
import { ProductDetails } from '@/components/products/ProductDetails';
import { useProductDetails } from '@/hooks/products/useProductDetails';

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productSlug: string }>;
}) {
  const slug = use(params).productSlug;

  const { data, isLoading, isError, error } = useProductDetails(slug);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const product = data?.data.product;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto rounded-2xl shadow-md p-4">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>

      <ProductDetails product={product} />
    </div>
  );
}
