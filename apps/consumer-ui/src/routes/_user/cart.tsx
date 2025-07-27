import { useNoOfItemsInCart } from '@/hooks/cart';
import { createFileRoute } from '@tanstack/react-router';

import CartPage from '@/pages/Cart';

export const Route = createFileRoute('/_user/cart')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: noOfItems } = useNoOfItemsInCart();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">
        Shopping Cart
        <span className="text-sm text-gray-500"> ({noOfItems} items)</span>
      </h1>

      <CartPage />
    </div>
  );
}
