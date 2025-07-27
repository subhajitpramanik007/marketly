import * as React from 'react';
import { ShoppingCartIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useNoOfItemsInCart } from '@/hooks/cart';

export const Cart: React.FC = ({}) => {
  const { data: noOfItems } = useNoOfItemsInCart();

  return (
    <div className="relative">
      {noOfItems && noOfItems > 0 ? (
        <span className="absolute -top-2 -right-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-white">
          {noOfItems}
        </span>
      ) : null}
      <Link to="/cart" className="flex items-center">
        <ShoppingCartIcon className="size-5 text-primary" />
      </Link>
    </div>
  );
};
