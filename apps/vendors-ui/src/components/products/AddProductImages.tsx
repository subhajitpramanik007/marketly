'use client';

import * as React from 'react';
import { IProduct } from '@/types';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CloudUpload, X } from 'lucide-react';
import { ShowProductImages } from './ShowProductImages';

import { useProductImagesUpload } from '@/hooks/products/useProductImagesUpload';
import { useDeleteProductImage } from '@/hooks/products/useDeleteProductImage';

export const AddProductImages: React.FC<{ product: IProduct }> = ({ product }) => {
  const { images, removeImage, setImages, handleImageUpload } = useProductImagesUpload({
    productId: product.id,
    slug: product.slug,
  });

  const { handleImageDelete } = useDeleteProductImage({
    productId: product.id,
    slug: product.slug,
    images: product.images,
  });

  return (
    <div className="max-w-4xl mx-auto rounded-2xl shadow-md p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">
        Add Product Images :{' '}
        <span className="text-muted-foreground capitalize">{product.name}</span>
      </h1>

      <div className="flex flex-col">
        <Input
          type="file"
          id="file-input"
          multiple
          max={5}
          onChange={e => {
            const files = e.target.files;
            if (files) {
              setImages([...images, ...Array.from(files)]);
            }
          }}
          hidden
        />

        {images.length > 0 ? (
          <div className="w-full flex gap-6">
            <Button className="basis-1/2" onClick={handleImageUpload}>
              <CloudUpload className="mr-2 h-4 w-4" /> Upload images
            </Button>
            <Button className="basis-1/2" variant="outline" onClick={() => setImages([])}>
              <X className="mr-2 size-4" /> Reset selected images
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            className="mt-2"
            onClick={() => document.getElementById('file-input')?.click()}
          >
            Select Images
          </Button>
        )}
      </div>

      <ShowProductImages
        isFile
        images={images}
        title="Selected Images"
        isDeleteBtn
        onClick={removeImage}
      />

      <ShowProductImages
        isFile={false}
        images={product.images}
        title="Existing Images"
        isDeleteBtn
        onClick={handleImageDelete}
      />
    </div>
  );
};
