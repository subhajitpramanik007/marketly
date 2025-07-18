import * as React from 'react';

import { Image } from '@/components/Image';
import type { IProductImage } from '@/types/product.types';

interface ImagesListProps extends React.HTMLAttributes<HTMLDivElement> {
  images: IProductImage[];
}

export const ImagesList: React.FC<ImagesListProps> = ({ images, ...props }) => {
  if (images.length === 0) {
    return (
      <div className="flex gap-4" {...props}>
        <div className="flex flex-col gap-2 w-12">
          <Image alt="no image" className="size-12 rounded-sm border border-orange-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4" {...props}>
      <div className="flex flex-col gap-2 w-12">
        {images.map((image, idx) => (
          <div key={image.id} className="cursor-pointer">
            <Image
              src={image.url}
              alt={image.alt}
              data-image-idx={idx}
              loading="lazy"
              className="size-12 rounded-sm border border-orange-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
