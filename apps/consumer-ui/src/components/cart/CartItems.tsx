import type { ICartWithProduct } from '@/types';
import * as React from 'react';
import { CartItemCard } from './CartItemCard';
import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { ShoppingCartIcon } from 'lucide-react';

interface CartItemsProps {
  cartItems: ICartWithProduct[];
  selectedCartItemIds: number[];
  onItemSelection: (itemId: number) => void;
}

export const CartItems: React.FC<CartItemsProps> = ({
  cartItems,
  selectedCartItemIds,
  onItemSelection,
}) => {
  return (
    <div className="py-4">
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {cartItems.map(cartItem => (
            <CartItemCard
              key={cartItem.id}
              cartItem={cartItem}
              selected={!!selectedCartItemIds?.includes(cartItem.id)}
              onItemSelection={onItemSelection}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            {/* Line */}
            <div className="absolute left-1/2 top-1/2 rotate-135 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-muted"></div>
            <ShoppingCartIcon className="size-16 text-muted" />
          </div>

          <p>Your cart is empty.</p>

          <Button asChild>
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
