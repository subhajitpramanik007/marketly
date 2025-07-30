import type { ICart } from '@/types';
import CheckoutPage from '@/pages/Checkout';

import { localStoreData } from '@/lib/localstore-data';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_user/checkout')({
  loader: () => {
    const checkoutData = localStoreData.get<{ cartItems: ICart[] }>('checkout_items', true);
    return { checkoutItems: checkoutData?.cartItems || [] };
  },
  component: RouteComponent,
  onLeave: () => {
    localStoreData.remove('checkout_items');
  },
});

function RouteComponent() {
  return (
    <div className="p-4">
      <CheckoutPage />
    </div>
  );
}
