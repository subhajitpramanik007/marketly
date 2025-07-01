'use client';

import { IProduct } from '@/types';
import * as React from 'react';

export const AddProductImages: React.FC<{ product: IProduct }> = ({ product }) => {
  const [images, setImages] = React.useState<File[]>([]);

  return (
    <div className="max-w-4xl mx-auto rounded-2xl shadow-md p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product Images</h1>

      <input
        type="file"
        multiple
        max={5}
        onChange={e => {
          const files = e.target.files;
          if (files) {
            setImages([...images, ...Array.from(files)]);
          }
        }}
      />

      <div className="grid grid-cols-2 gap-2 mt-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Image ${index + 1}`}
            className="w-auto"
          />
        ))}
      </div>
    </div>
  );
};
