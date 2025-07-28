import * as React from 'react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { Link } from '@tanstack/react-router';

import type { ICartWithProduct } from '@/types';

import { Image } from '@/components/Image';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';

import { useCartItemQuantity, useDeleteItemFromCart } from '@/hooks/cart';

interface CartItemCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cartItem: ICartWithProduct;
  selected: boolean;
  onItemSelection: (itemId: number) => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  cartItem: { id, product, quantity },
  selected,
  onItemSelection,
  ...props
}) => {
  const { removeFromCart, isPending } = useDeleteItemFromCart(id);
  const { mutate: updateCartItemQuantity } = useCartItemQuantity(id, product.id);

  function handleChangeQuantity(type: 'increment' | 'decrement') {
    let newQuantity = quantity;
    if (type === 'increment') {
      newQuantity += 1;
    } else {
      newQuantity -= 1;
    }

    if (newQuantity === 0) {
      removeFromCart();
      return;
    }

    if (newQuantity > product.stock) {
      toast.error('Out of stock');
      return;
    }

    if (newQuantity === 10) {
      toast.error('Maximum quantity reached');
      return;
    }

    updateCartItemQuantity(newQuantity);
  }

  return (
    <Card {...props} className={cn(isPending && 'animate-pulse', props.className)}>
      <CardContent className="flex gap-4">
        <div>
          <Checkbox checked={selected} onCheckedChange={() => onItemSelection(id)} />
        </div>
        <Image
          href={product.imageUrl}
          alt={product.name}
          className="w-[10rem] aspect-square object-cover rounded-md"
        />
        <div className="flex-1 space-y-1 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-medium">{product.name}</h2>
            {product.stock <= 0 ? (
              <p className="text-destructive">Out of stock</p>
            ) : (
              <p className="text-emerald-500">In stock</p>
            )}

            <div>
              <p className="text-muted-foreground text-sm">
                Sold by:{' '}
                <Link
                  to={'/stores/$storeId'}
                  params={{ storeId: product.storeId.toString() }}
                  className="text-primary hover:underline"
                >
                  <span className="font-semibold">{product.storeName}</span>
                </Link>
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            {/* add quantity in end align */}
            <div className="flex items-center gap-1 rounded-full border-2 border-primary bg-muted px-2 w-fit">
              <button
                className="cursor-pointer disabled:cursor-not-allowed"
                disabled={quantity === 0}
                onClick={() => handleChangeQuantity('decrement')}
              >
                {quantity === 1 ? (
                  <TrashIcon className="size-4 text-destructive" />
                ) : (
                  <MinusIcon className="size-4 text-muted-foreground" />
                )}
              </button>
              <span className="mx-2">{quantity}</span>
              <button
                className="cursor-pointer disabled:cursor-not-allowed"
                disabled={quantity === 10}
                onClick={() => handleChangeQuantity('increment')}
              >
                <PlusIcon className="size-4 text-muted-foreground" />
              </button>
            </div>

            <Separator orientation="vertical" />

            {/* Delete */}
            <Button
              variant="link"
              className="text-destructive text-sm p-0"
              onClick={() => removeFromCart()}
            >
              Delete
            </Button>

            <Separator orientation="vertical" />

            {/* Share */}
            <Button variant="link" className="text-muted-foreground text-sm p-0">
              Share
            </Button>
          </div>
        </div>

        <div>
          <span className="text-lg font-semibold">₹{product.price}</span>
        </div>
      </CardContent>
    </Card>
  );
};
