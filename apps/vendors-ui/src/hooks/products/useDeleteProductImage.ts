import toast from 'react-hot-toast';
import { IProduct } from '@/types';

import { deleteImage } from '@/services/uploads.services';
import { deleteSingleImageOfProduct } from '@/services/product.services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteProductImage = ({
  productId,
  slug,
  images,
}: {
  productId: number;
  slug: string;
  images: IProduct['images'];
}) => {
  const queryClient = useQueryClient();

  const product = queryClient.getQueryData(['product', { slug }]);

  const { mutateAsync: deleteProductImage } = useMutation({
    mutationKey: ['product', 'images', 'delete'],
    mutationFn: async ({
      productId,
      imageId,
      publicId,
    }: {
      productId: number;
      imageId: number;
      publicId: string;
    }) => {
      await deleteSingleImageOfProduct(productId, imageId);
      await deleteImage([publicId]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products', { slug: slug }],
      });
    },
  });

  const handleImageDelete = async (imageId: number) => {
    const publicId = images.find(image => image.id === imageId)?.publicId;
    if (publicId) {
      toast.promise(
        deleteProductImage({
          productId: productId,
          imageId,
          publicId,
        }),
        {
          loading: 'Deleting image...',
          success: 'Image deleted successfully',
          error: 'Error deleting image',
        },
      );
    }
  };

  return { handleImageDelete };
};
