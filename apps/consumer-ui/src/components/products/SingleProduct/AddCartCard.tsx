import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MinusIcon, Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import { IsLoggedIn, IsLogout } from '@/components/auth';
import { useProductAddToWishlist } from '@/hooks/wishlists/useProductAddToWishlist';

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10;

interface AddCartCardProps {
  id: number;
  price: string;
}

export const AddCartCard: React.FC<AddCartCardProps> = ({ id, price }) => {
  const [quantity, setQuantity] = React.useState<number>(1);
  const addWishlistMutation = useProductAddToWishlist();

  function handleIncrementQuantity() {
    const newQuantity = quantity + 1;
    if (newQuantity > MAX_QUANTITY) {
      toast.error('Quantity cannot be more than 10');
    } else {
      setQuantity(newQuantity);
    }
  }

  function handleDecrementQuantity() {
    const newQuantity = quantity - 1;
    if (newQuantity < MIN_QUANTITY) {
      toast.error('Quantity cannot be less than 1');
    } else {
      setQuantity(newQuantity);
    }
  }

  function handleAddToCart() {}

  function handleAddToWishlist() {
    addWishlistMutation.mutate(id);
  }

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
              <Button
                variant="outline"
                onClick={handleIncrementQuantity}
                disabled={quantity == MAX_QUANTITY}
              >
                <Plus className="size-4" />
              </Button>
              <span className="w-full p-1 text-center rounded-md border font-semibold">
                {quantity}
              </span>
              <Button
                variant="outline"
                onClick={handleDecrementQuantity}
                disabled={quantity == MIN_QUANTITY}
              >
                <MinusIcon className="size-4" />
              </Button>
            </div>
          </div>

          <IsLogout asToast>
            <Button className="w-full bg-amber-500 hover:bg-amber-500/90">Add to Card</Button>
          </IsLogout>
          <IsLoggedIn>
            <Button className="w-full bg-amber-500 hover:bg-amber-500/90" onClick={handleAddToCart}>
              Add to Card
            </Button>
          </IsLoggedIn>

          <IsLogout asToast>
            <Button className="w-full">Buy now</Button>
          </IsLogout>
          {/* TODO: add buy now functionality */}
          <IsLoggedIn>
            <Button className="w-full">Buy now</Button>
          </IsLoggedIn>

          <IsLogout asToast>
            <Button variant={'outline'} className="w-full">
              Add to wishlist
            </Button>
          </IsLogout>
          <IsLoggedIn>
            <Button
              variant={'outline'}
              className="w-full"
              onClick={handleAddToWishlist}
              disabled={addWishlistMutation.isPending}
            >
              Add to wishlist
            </Button>
          </IsLoggedIn>
        </div>
      </CardContent>
    </Card>
  );
};
