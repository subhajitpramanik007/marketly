import * as React from 'react';
import { Link } from '@tanstack/react-router';

import type { IProduct } from '@/types/product.types';

import { Badge } from '@/components/ui/badge';
import { ProductButtons } from './ProductButtons';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Card className="pt-0 relative">
      {/* like */}
      <ProductButtons isInWishlist={!!product.isInWishlist} cart={product.cart} />

      <CardContent className="p-0">
        <Link to={`/$product`} params={{ product: product.slug }}>
          <img
            src={product?.imageUrl ?? 'no-image.png'}
            alt={product?.name}
            className="w-full aspect-square object-cover rounded-md"
          />
        </Link>
      </CardContent>
      <CardFooter className="flex flex-col w-full items-start gap-1 px-2">
        <h2 className="font-semibold text-muted-foreground">{product?.name}</h2>
        <Badge className="hover:cursor-pointer">
          <Link to={`/category/$category`} params={{ category: product?.category }}>
            #{product?.category}
          </Link>
        </Badge>
        <p className="flex items-center gap-1">
          <span>₹</span>
          <span className="font-semibold text-xl">{product.price}</span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default React.memo(ProductCard);
