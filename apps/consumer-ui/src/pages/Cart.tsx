import React from 'react';
import { CartCheckout, CartItems, CartItemsSkeleton } from '@/components/cart';

import { useCartItems, useNoOfItemsInCart } from '@/hooks/cart';

function CartPage() {
  const { data, isPending } = useCartItems();
  const { data: noOfItems } = useNoOfItemsInCart();

  const [cartItemIds, setCartItemIds] = React.useState<number[]>([]);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const handleSelection = (itemId: number) => {
    setCartItemIds(prevIds => {
      console.log('Toggling selection for item:', itemId);
      if (prevIds.includes(itemId)) {
        return prevIds.filter(id => id !== itemId);
      } else {
        return [...prevIds, itemId];
      }
    });
  };

  const calculateTotalPrice = React.useCallback(() => {
    if (!cartItemIds) return 0;
    const selectedItems = data?.data?.cartItems.filter(item => cartItemIds.includes(item.id));
    const total =
      selectedItems?.reduce(
        (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
        0,
      ) || 0;
    setTotalPrice(total);
  }, [cartItemIds, data]);

  React.useEffect(() => {
    setCartItemIds(data?.data?.cartItems.map(item => item.id) || []);
  }, [data]);

  React.useEffect(() => {
    calculateTotalPrice();
  }, [cartItemIds, data]);

  if (isPending) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-xl font-semibold mb-4">Shopping Cart</h1>
        <CartItemsSkeleton />
      </div>
    );
  }

  return (
    <React.Fragment>
      <CartItems
        cartItems={data?.data?.cartItems || []}
        selectedCartItemIds={cartItemIds}
        onItemSelection={handleSelection}
      />

      {noOfItems && noOfItems > 0 ? <CartCheckout totalPrice={totalPrice} /> : null}
    </React.Fragment>
  );
}

export default CartPage;
