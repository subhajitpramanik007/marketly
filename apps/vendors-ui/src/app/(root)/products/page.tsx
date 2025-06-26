'use client';

import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function ProductsPage() {
  const [products, setProducts] = React.useState([]);

  if (products.length === 0) {
    return (
      <div className="w-full flex flex-col">
        <div className="flex w-full justify-between">
          <div className="">
            <h1 className="text-2xl font-bold">Products</h1>
          </div>

          <Button asChild>
            <Link href="/products/new-product">
              <PlusIcon className="mr-2 h-4 w-4" /> Add Your First Product
            </Link>
          </Button>
        </div>
        <p className="text-muted-foreground">You have no products yet</p>
      </div>
    );
  }

  return <div>Products</div>;
}

export default ProductsPage;
