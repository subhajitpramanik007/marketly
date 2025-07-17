import * as React from 'react';
import { Link } from '@tanstack/react-router';

import type { IProduct } from '@/types/product.types';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Heart, ShoppingCart, ShoppingCartIcon } from 'lucide-react';

export const ProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Card className="pt-0 relative">
      {/* like */}
      <div className="absolute top-2 right-2 flex flex-col gap-2">
        <Button variant="outline">
          {product.isInWishlist ? (
            <Heart className="text-red-500 fill-red-500" />
          ) : (
            <Heart className="text-muted-foreground" />
          )}
        </Button>

        {/* Cart */}
        <Button variant="outline" className="relative">
          {product.cart ? (
            <div>
              <ShoppingCart />
              {product.cart.quantity > 0 && (
                <div className="absolute top-0 right-0 w-4 h-4 rounded-full flex items-center justify-center text-xs">
                  {product.cart.quantity}
                </div>
              )}
            </div>
          ) : (
            <ShoppingCartIcon className="text-muted-foreground" />
          )}
        </Button>
      </div>

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
        <Badge className="hover:cursor-pointer">#{product?.category}</Badge>
        <p className="flex items-center gap-1">
          <span>₹</span>
          <span className="font-semibold text-xl">{product.price}</span>
        </p>
      </CardFooter>
    </Card>
  );
};
