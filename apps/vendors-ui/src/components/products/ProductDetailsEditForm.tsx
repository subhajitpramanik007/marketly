'use client';

import React from 'react';
import { IProduct } from '@/types';
import { useForm } from 'react-hook-form';
import { updateProductSchema, UpdateProductSchema } from '@/schemas/product.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Edit2, X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '@/services/product.services';
import { usePathname, useRouter } from 'next/navigation';

export const ProductDetailsEditForm: React.FC<{
  product: IProduct;
}> = ({ product }) => {
  const [tags, setTags] = React.useState<string[]>(product.tags ? product.tags : []);

  function handleKeyDownOfTags(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();

      form.clearErrors('tags');
      const tag = event.currentTarget.value;
      const otherTags = form.getValues('tags');
      const tagExists = otherTags?.includes(tag);

      if (tagExists) {
        form.setError('tags', { type: 'manual', message: 'Tag already exists' });
        return;
      }
      const allTags = [...(otherTags || []), tag];
      form.setValue('tags', allTags);
      setTags(allTags);
      event.currentTarget.value = '';
    }
  }

  function handleRemoveTag(tag: string) {
    const currentTags = [...(form.getValues('tags') || [])].filter(t => t !== tag);
    setTags(tags => currentTags);
    form.setValue('tags', currentTags);
  }

  const form = useForm<UpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      stock: product.stock.toString(),
      category: product.category as any,
      tags: product.tags,
      isAvailable: product.isAvailable,
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const { mutate: updateProductDetails, isPending } = useMutation({
    mutationKey: ['products', 'update', { id: product.id }],
    mutationFn: (data: UpdateProductSchema) => updateProduct(product.id, data),
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey[0] === 'products';
        },
      });
      router.push(pathname);
    },
  });

  function onSubmit(data: UpdateProductSchema) {
    updateProductDetails(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Shoes" {...field} />
                </FormControl>
                <FormDescription>Enter your product name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="shoes" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Shoes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row w-full gap-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input className="capitalize" placeholder="Shoes" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input placeholder="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Shoes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <>
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input type="text" onKeyDown={handleKeyDownOfTags} placeholder="Add a tag" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-wrap gap-2 mt-2">
              {tags?.map(tag => (
                <Badge key={tag} className="capitalize">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)}>
                    <X className="size-4 ml-2" />
                  </button>
                </Badge>
              ))}
            </div>
          </>

          <FormField
            control={form.control}
            name="isAvailable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormLabel>Is Available</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.replace(pathname)}
            size="lg"
            disabled={isPending}
          >
            <X className="mr-2 size-4" />
            Cancel Update
          </Button>
          <Button
            type="submit"
            size="lg"
            className="mr-auto"
            disabled={isPending || !form.formState.isDirty}
          >
            <Edit className="mr-2 size-4" />
            Update Product Details
          </Button>
        </div>
      </form>
    </Form>
  );
};
