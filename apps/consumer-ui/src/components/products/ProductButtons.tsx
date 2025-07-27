import * as React from 'react';
import { IsLoggedIn, IsLogout } from '../auth';
import { Button } from '../ui/button';
import type { IProduct } from '@/types/product.types';
import { Heart, ShoppingCartIcon } from 'lucide-react';

interface ProductButtonsProps {
  isInWishlist: boolean;
  cart: IProduct['cart'];
  onToggleToWishlist: () => void;
  onAddToCart: (quantity?: number) => void;
}

export const ProductButtons: React.FC<ProductButtonsProps> = ({
  isInWishlist,
  cart,
  onToggleToWishlist,
  onAddToCart,
}) => {
  return (
    <div className="absolute top-2 right-2 flex flex-col gap-2">
      <IsLogout asToast>
        <Button variant="outline" size="icon">
          <Heart className="text-muted-foreground" />
        </Button>
      </IsLogout>
      <IsLoggedIn>
        <Button variant="outline" size="icon" onClick={onToggleToWishlist}>
          <span>
            {isInWishlist ? (
              <Heart className="text-red-500 fill-red-500" />
            ) : (
              <Heart className="text-muted-foreground" />
            )}
          </span>
        </Button>
      </IsLoggedIn>

      {/* Cart */}
      <IsLogout asToast>
        <Button variant="outline" size="icon">
          <ShoppingCartIcon className="text-muted-foreground" />
        </Button>
      </IsLogout>
      <IsLoggedIn>
        <Button variant="outline" size="icon" className="relative" onClick={() => onAddToCart()}>
          <div>
            <ShoppingCartIcon />
            <span>
              {cart && cart.quantity > 0 && (
                <div className="absolute top-0 right-0 w-4 h-4 rounded-full flex items-center justify-center text-xs text-white bg-primary">
                  {cart.quantity}
                </div>
              )}
            </span>
          </div>
        </Button>
      </IsLoggedIn>
    </div>
  );
};
