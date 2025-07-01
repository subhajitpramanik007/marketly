'use client';

import React from 'react';
import Link from 'next/link';
import { IProduct } from '@/types';
import { usePathname } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSession } from '@/hooks/useSession';
import { usePermission } from '@/hooks/usePermision';

export const ProductDetails = ({ product }: { product: IProduct }) => {
  const pathname = usePathname();
  const { isCanManage } = usePermission();

  return (
    <div className="max-w-4xl mx-auto rounded-2xl shadow-md p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Product Details</h1>

        {isCanManage ? (
          <div className="flex gap-6">
            {/* Edit */}
            <Button asChild>
              <Link href={`${pathname}?edit=true`} replace>
                Edit Product Details
              </Link>
            </Button>
            {/* Add images */}
            <Button asChild>
              <Link href={`${pathname}?addImages=true`} replace>
                Add Product Images
              </Link>
            </Button>
          </div>
        ) : null}
      </div>

      <ProductDetailsCard product={product} />
    </div>
  );
};

export const ProductDetailsCard: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Card className="">
      <CardContent className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <span className="text-sm text-muted-foreground">
            Added by{' '}
            <Link href={`/staffs?staffId=${product.addedBy.id}`} className="underline">
              {product.addedBy.firstName} {product.addedBy.lastName}
            </Link>
          </span>
        </div>

        {/* Meta Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="bg-secondary rounded-lg p-4">
            <h3 className="text-secondary-foreground text-lg">Slug</h3>
            <p className="font-medium">{product.slug}</p>
          </div>

          <div className="bg-secondary rounded-lg p-4">
            <h3 className="text-secondary-foreground text-lg">Category</h3>
            <p className="font-medium capitalize">{product.category}</p>
          </div>

          <div className="bg-secondary rounded-lg p-4">
            <h3 className="text-secondary-foreground text-lg">Price</h3>
            <p className="font-medium">₹ {product.price}</p>
          </div>

          <div className="bg-secondary rounded-lg p-4">
            <h3 className="text-secondary-foreground text-lg">Stock</h3>
            <p className="font-medium">{product.stock}</p>
          </div>

          <div className="bg-secondary rounded-lg p-4">
            <h3 className="text-secondary-foreground text-lg">Status</h3>
            <p
              className={`font-medium ${product.isAvailable ? 'text-emerald-500' : 'text-destructive'}`}
            >
              {product.isAvailable ? 'Available' : 'Unavailable'}
            </p>
          </div>

          <div className="bg-secondary rounded-lg p-4">
            <h3 className="text-secondary-foreground text-lg">Tags</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {product.tags.map((tag: string) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="text-muted-foreground mt-2">{product.description}</p>
        </div>

        {/* Dates */}
        <div className="text-xs text-gray-400 text-right w-auto">
          <p>Created at: {new Date(product.createdAt).toLocaleString()}</p>
          <p>Last updated at: {new Date(product.updatedAt).toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};
