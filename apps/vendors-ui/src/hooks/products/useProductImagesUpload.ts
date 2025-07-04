'use client';

import * as React from 'react';
import toast from 'react-hot-toast';

import { updateImagesOfProduct } from '@/services/product.services';
import { multipleImagesUpload } from '@/services/uploads.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useProductImagesUpload = ({
  productId,
  slug,
}: {
  productId: number;
  slug: string;
}) => {
  const [images, setImages] = React.useState<File[]>([]);

  const removeImage = (index: number) => {
    console.log(index);
    setImages(images.filter((_, i) => i !== index));
  };

  const queryClient = useQueryClient();

  const { mutateAsync: uploadProductImages } = useMutation({
    mutationKey: ['product', 'images', 'upload'],
    mutationFn: async (fromData: FormData) => {
      const uploadRes = await multipleImagesUpload(fromData);
      const imageIds = uploadRes.data.imagesData.map(image => image.id);
      await updateImagesOfProduct(productId, { imageIds });
    },
    onSuccess: () => {
      setImages([]);
      queryClient.invalidateQueries({
        queryKey: ['products', { slug }],
      });
    },
  });

  function handleImageUpload() {
    if (images.length === 0) {
      toast.error('Select images first');
      return;
    }

    const formData = new FormData();

    images.forEach(image => {
      formData.append('files', image);
    });
    formData.append('folder', 'products');

    toast.promise(uploadProductImages(formData), {
      loading: 'Uploading images...',
      success: 'Images uploaded successfully',
      error: 'Error uploading images',
    });
  }

  return {
    images,
    setImages,
    removeImage,
    handleImageUpload,
  };
};
