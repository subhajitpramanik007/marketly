import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';

interface CartCheckoutProps {
  totalPrice: number;
  onProceedToCheckout: () => void;
}

export const CartCheckout: React.FC<CartCheckoutProps> = ({ totalPrice, onProceedToCheckout }) => {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-end justify-end gap-2 w-full">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold">₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="mt-6">
            <Button onClick={onProceedToCheckout}>Proceed to Checkout</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
