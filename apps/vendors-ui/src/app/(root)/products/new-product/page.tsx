'use client';

import { ProductForm } from '@/components/products/AddNewProductForm';
import { newProductSchema, NewProductSchema } from '@/schemas/product.schemas';
import { addNewProduct } from '@/services/product.services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function NewProductPage() {
  const router = useRouter();

  const form = useForm<NewProductSchema>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      price: '',
      stock: '',
      tags: [],
      isAvailable: true,
    },
  });

  const { mutate: addProduct } = useMutation({
    mutationKey: ['products', 'new'],
    mutationFn: addNewProduct,
    onSuccess: () => {
      form.reset();
      router.push('/products');
    },
  });

  function onSubmit(data: NewProductSchema) {
    addProduct(data);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">New Product</h1>
      <ProductForm isEditing={false} form={form as any} onSubmit={onSubmit as any} />
    </div>
  );
}
