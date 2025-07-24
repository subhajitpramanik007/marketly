import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MinusIcon, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import { IsLoggedIn, IsLogout } from '@/components/auth';

interface AddCartCardProps {
  id: number;
  price: string;
}

export const AddCartCard: React.FC<AddCartCardProps> = ({ id, price }) => {
  const [quantity, setQuantity] = React.useState<number>(1);

  function handleIncrementQuantity() {
    const newQuantity = quantity + 1;
    if (newQuantity > 10) {
      toast.error('Quantity cannot be more than 10');
    } else {
      setQuantity(newQuantity);
    }
  }

  function handleDecrementQuantity() {
    const newQuantity = quantity - 1;
    if (newQuantity < 1) {
      toast.error('Quantity cannot be less than 1');
    } else {
      setQuantity(newQuantity);
    }
  }

  function handleAddToCart() {}

  function handleAddToWishlist() {}

  return (
    <Card className="basis-1/6 flex flex-col gap-2 bg-secondary">
      <CardContent className="flex flex-col justify-between h-full gap-2">
        {/* Price */}
        <div className="flex flex-col justify-between">
          <div className="flex items-start justify-start">
            <span className="font-semibold">
              ₹ <span className="text-2xl">{price}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 bottom-0">
          {/* Quantity */}
          <div>
            <Label className="pb-2">Quantity:</Label>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleIncrementQuantity}>
                <Plus className="size-4" />
              </Button>
              <Input type="number" min={1} max={10} defaultValue={quantity} value={quantity} />
              <Button variant="outline" onClick={handleDecrementQuantity}>
                <MinusIcon className="size-4" />
              </Button>
            </div>
          </div>

          <IsLogout asToast>
            <Button className="w-full" onClick={handleAddToCart}>
              ADD TO CART
            </Button>
          </IsLogout>
          <IsLoggedIn>
            <Button className="w-full" onClick={handleAddToCart}>
              ADD TO CART
            </Button>
          </IsLoggedIn>

          <IsLogout asToast>
            <Button variant={'outline'} className="w-full" onClick={handleAddToWishlist}>
              ADD TO WISHLIST
            </Button>
          </IsLogout>
          <IsLoggedIn>
            <Button variant={'outline'} className="w-full" onClick={handleAddToWishlist}>
              ADD TO WISHLIST
            </Button>
          </IsLoggedIn>
        </div>
      </CardContent>
    </Card>
  );
};
