'use client';

import { IProduct } from '@/types';
import Image from 'next/image';
import * as React from 'react';
import { DisplayThis } from '../DisplayThis';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

interface BaseProps {
  title?: string;
}

interface ProductImagesAsVendorProps {
  images: IProduct['images'];
  isFile: false;
}

interface ProductImagesAsFileProps {
  images: File[];
  isFile: true;
}

type ProductImagesProps = ProductImagesAsVendorProps | ProductImagesAsFileProps;

type ProductImageDeleteProps =
  | {
      isDeleteBtn: true;
      onClick: (index: number) => void;
    }
  | {
      isDeleteBtn: false;
      onClick?: never;
    };

type ShowProductImagesProps = BaseProps & ProductImageDeleteProps & ProductImagesProps;

export const ShowProductImages: React.FC<ShowProductImagesProps> = ({
  images,
  title,
  isFile,
  isDeleteBtn,
  onClick,
}) => {
  if (images.length === 0) {
    return null;
  }

  const handleClick = (indexOrId: number) => {
    if (isDeleteBtn && onClick) {
      onClick(indexOrId);
    }
  };

  if (isFile) {
    return (
      <div className="my-2">
        <h2 className="text-lg font-semibold">{title ?? 'Product Images'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={URL.createObjectURL(image)}
                alt="Product image"
                width={600}
                height={600}
                className="w-full aspect-video object-cover rounded-md"
              />
              <DisplayThis when={isDeleteBtn}>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 z-10"
                  onClick={() => handleClick(index)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </DisplayThis>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-2">
      <h2 className="text-lg font-semibold">{title ?? 'Product Images'}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
        {images.map(({ id, url, alt }) => (
          <div key={id} className="relative">
            <Image
              src={url}
              alt={alt}
              width={240}
              height={240}
              className="w-full aspect-video object-cover rounded-md"
            />
            <DisplayThis when={isDeleteBtn}>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 z-10"
                onClick={() => handleClick(id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </DisplayThis>
          </div>
        ))}
      </div>
    </div>
  );
};
