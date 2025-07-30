import React from 'react';
import { CartCheckout, CartItems, CartItemsSkeleton } from '@/components/cart';

import { useCartItems, useNoOfItemsInCart } from '@/hooks/cart';
import { useRouter } from '@tanstack/react-router';
import { localStoreData } from '@/lib/localstore-data';
import toast from 'react-hot-toast';
import type { ICart } from '@/types';

function CartPage() {
  const router = useRouter();
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

  function handleProceedToCheckout() {
    // collect cart item ids and proceed to checkout and redirect to checkout page
    const selectedItems = data?.data?.cartItems?.filter(item => {
      if (cartItemIds.includes(item.id))
        return {
          id: item.id,
          quantity: item.quantity,
          productId: item.product.id,
        };
    });

    if (!selectedItems || selectedItems.length === 0) {
      toast.error('Please select at least one item to checkout');
      return;
    }

    const cartItemForCheckout: ICart[] = selectedItems.map(item => {
      return {
        id: item.id,
        quantity: item.quantity,
        productId: item.product.id,
      };
    });

    localStoreData.set(
      'checkout_items',
      JSON.stringify({
        cartItems: cartItemForCheckout,
      }),
      true,
    );

    router.navigate({ to: '/checkout' });
  }

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

      {noOfItems && noOfItems > 0 ? (
        <CartCheckout
          totalPrice={totalPrice}
          onProceedToCheckout={handleProceedToCheckout} //handle proceed to checkout
        />
      ) : null}
    </React.Fragment>
  );
}

export default CartPage;
