import type { ISingleProduct } from '@/types/product.types';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MinusIcon, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/Image';
import { Label } from '@/components/ui/label';

export const SingleProduct = ({ product }: { product: ISingleProduct }) => {
  const images = product.images;

  const [selectedImage, setSelectedImage] = useState<number | null>(images[0]?.id || null);

  return (
    <div className="flex gap-4">
      {/* small images */}
      <div className="basis-3/6 flex gap-4">
        <div className="flex flex-col gap-2 w-12">
          {images.length > 0 ? (
            images.map(image => (
              <div
                key={image.id}
                className="cursor-pointer"
                onClick={() => setSelectedImage(image.id)}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  loading="lazy"
                  className="size-12 rounded-sm border border-orange-200"
                />
              </div>
            ))
          ) : (
            <Image alt="no image" className="size-12 rounded-sm border border-orange-200" />
          )}
        </div>

        {/* big image */}
        <div className="flex-1">
          <Image
            src={images.find(image => image.id === selectedImage)?.url}
            alt={images.find(image => image.id === selectedImage)?.alt}
            loading="lazy"
            className="w-full aspect-square rounded-sm border border-orange-200"
          />
        </div>
      </div>

      {/* product details */}

      <div className="basis-2/6 flex flex-col gap-2 w-full">
        <div className="border-b">
          {/* Product name */}
          <h1 className="text-3xl font-bold capitalize">{product.name}</h1>

          {/* TODO: add store link */}
          <Link to={`.`}>
            <span className="text-sm text-sky-600 hover:underline hover:text-sky-700">
              Visit store - {product.store.storeName}
            </span>
          </Link>

          {/* Rating */}
          {product.ratings ? (
            <p className="text-sm text-muted-foreground">Rating: {product.ratings}</p>
          ) : (
            <p className="text-sm text-muted-foreground">No ratings yet</p>
          )}
        </div>

        {/* Price */}
        <div>
          <span className="font-semibold">
            ₹ <span className="text-2xl">{product.price}</span>
          </span>
        </div>

        {/* Description */}
        <div className="p-1 bg-muted rounded-md w-full">
          <h3>
            <span className="font-semibold">Description:</span>
          </h3>
          <p className="text-sm text-muted-foreground pb-2">{product.description}</p>
        </div>
      </div>

      {/* Add to cart */}
      <Card className="basis-1/6 flex flex-col gap-2">
        <CardContent className="flex flex-col justify-between h-full gap-2">
          {/* Price */}
          <div className="flex flex-col justify-between">
            <div className="flex items-start justify-start">
              <span className="font-semibold">
                ₹ <span className="text-2xl">{product.price}</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 bottom-0">
            {/* Quantity */}
            <div>
              <Label className="pb-2">Quantity:</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => {}}>
                  <Plus className="size-4" />
                </Button>
                <Input type="number" min={1} max={10} defaultValue={1} />
                <Button variant="outline">
                  <MinusIcon className="size-4" />
                </Button>
              </div>
            </div>
            {/* Add to cart */}
            <Button className="w-full">ADD TO CART</Button>
            {/* Wishlist */}

            <Button variant={'outline'}>ADD TO WISHLIST</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
