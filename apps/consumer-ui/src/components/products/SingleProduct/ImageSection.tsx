import * as React from 'react';

import { ImagesList } from './ImagesList';
import { Image } from '@/components/Image';
import type { IProductImage } from '@/types/product.types';

interface ImageSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  images: IProductImage[];
}

export const ImageSection: React.FC<ImageSectionProps> = ({ images, ...props }) => {
  const [selectedImageIdx, setSelectedImageIdx] = React.useState<number>(0);

  const selectedImageHandler = (e: React.MouseEvent) => {
    const idx = (e.target as HTMLImageElement).getAttribute('data-image-idx');
    if (idx && Number(idx) !== selectedImageIdx) {
      setSelectedImageIdx(Number(idx));
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-2" {...props}>
      <ImagesList images={images} onClick={selectedImageHandler} />

      {/* big image */}
      <div className="flex-1 w-full">
        <Image
          src={images[selectedImageIdx]?.url}
          alt={images[selectedImageIdx]?.alt}
          loading="lazy"
          className="w-full aspect-square rounded-sm border border-orange-200"
        />
      </div>
    </div>
  );
};
