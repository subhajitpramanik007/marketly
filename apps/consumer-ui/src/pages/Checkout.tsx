import { formatPrice } from '@/lib/utils';

import { Image } from '@/components/Image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useCheckoutPayment, useCheckoutSummary } from '@/hooks/checkout';

function CheckoutPage() {
  const { data } = useCheckoutSummary();
  const { mutate: handleCheckout } = useCheckoutPayment();

  const checkoutData = data?.data;

  if (!checkoutData) {
    return <div>Checkout not found</div>;
  }

  const {
    cartItems,
    totalPrice, // inital total
    discount,
    totalAfterDiscount,
    deliveryCharge,
    grandTotal, // for payment
  } = checkoutData;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="py-4">
        <h1 className="text-2xl font-bold">Process your checkout</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Checkout Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="w-full flex justify-end pb-2 ">
              <h2 className="font-semibold">Price</h2>
            </div>
            <div className="flex flex-col gap-4 border-t">
              {cartItems.map(item => (
                <div key={item.id} className="py-4 border-b">
                  <div className="flex justify-between gap-4">
                    <div className="flex gap-4">
                      <Image
                        href={item.imageUrl}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-md aspect-square border border-border"
                      />
                      <h3 className="font-semibold">{item.name}</h3>
                    </div>
                    <div className="flex flex-col justify-between w-auto ml-auto text-sm">
                      <div className="flex flex-col">
                        {/* Price per unit */}
                        <div className="flex ml-auto">
                          <span className="min-w-16 w-auto flex items-center justify-end ">
                            <p>{formatPrice(item.price)}</p>
                          </span>
                        </div>

                        {/* Quantity */}
                        <div className="flex ml-auto">
                          <span>Qty : </span>
                          <span className="min-w-16 w-auto ml-auto">
                            <span className="w-full flex items-center justify-end ">
                              <p>{item.quantity}</p>
                            </span>
                          </span>
                        </div>

                        {/* Discount per unit */}
                        <div className="flex ml-auto">
                          <span>Discount per unit: </span>
                          <span className="min-w-16 w-auto flex items-center justify-end">
                            <p>{formatPrice(item.discount || 0)}</p>
                          </span>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="flex ml-auto font-semibold border-t pt-1">
                        <span>Total: </span>
                        <span className="min-w-16 w-auto flex items-center justify-end">
                          <p>{formatPrice(item.totalPrice)}</p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end justify-end py-2">
            {/* Gross Total */}
            <div className="flex items-center justify-between w-full">
              <span className="">Gross Total:</span>
              <span className="font-semibold">{formatPrice(totalPrice)}</span>
            </div>

            {/* Discount */}
            <div className="flex items-center justify-between w-full">
              <span className="">Discount:</span>
              <span className="">{formatPrice(discount)}</span>
            </div>

            {/* Total after discount */}
            <div className="flex items-center justify-between w-full">
              <span className="">Total after discount:</span>
              <span className="font-semibold border-t mt-1">{formatPrice(totalAfterDiscount)}</span>
            </div>

            {/* Delivery charge */}
            <div className="flex items-center justify-between w-full">
              <span className="">Delivery charge:</span>
              <span className="">{formatPrice(deliveryCharge)}</span>
            </div>

            {/* Grand Total */}
            <div className="flex items-center justify-between w-full">
              <span className="">Grand Total:</span>
              <span className="font-semibold border-t mt-1">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <div className="flex justify-end mt-4 border-t py-2">
            <Button className="mr-2" variant="outline" onClick={() => {}}>
              Cancel Checkout
            </Button>
            <Button onClick={() => handleCheckout()}>Proceed to Payment</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CheckoutPage;
