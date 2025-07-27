import type { ICartWithProduct } from '@/types';
import * as React from 'react';
import { CartItemCard } from './CartItemCard';

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
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};
