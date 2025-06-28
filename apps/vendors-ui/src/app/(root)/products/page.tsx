'use client';

import React from 'react';
import Link from 'next/link';
import { columns } from './columns';
import { DataTable } from './data-table';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/products/useProducts';

function ProductsPage() {
  const [page, setPage] = React.useState(1);

  const { data } = useProducts(page);

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
        <Button asChild>
          <Link href="/products/new-product">Add New Product</Link>
        </Button>
      </div>
      <DataTable columns={columns} data={data?.data.products || []} />
    </div>
  );
}

export default ProductsPage;
