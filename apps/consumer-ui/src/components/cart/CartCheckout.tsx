import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';

interface CartCheckoutProps {
  totalPrice: number;
}

export const CartCheckout: React.FC<CartCheckoutProps> = ({ totalPrice }) => {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-end justify-end gap-2 w-full">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold">₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
