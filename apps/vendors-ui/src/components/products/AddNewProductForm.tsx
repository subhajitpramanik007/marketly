'use client';

import React, { useEffect } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useForm } from 'react-hook-form';

import {
  NewProductSchema,
  PRODUCT_CATEGORYES,
  UpdateProductSchema,
} from '@/schemas/product.schemas';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { convertToSlug } from '@/lib/utils';

export function ProductForm({
  form,
  onSubmit,
  isEditing = false,
}: {
  form: ReturnType<typeof useForm<NewProductSchema | UpdateProductSchema>>;
  onSubmit: (data: NewProductSchema | UpdateProductSchema) => void;
  isEditing: boolean;
}) {
  const [tags, setTags] = React.useState<string[]>([]);

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

  //   slug transform
  useEffect(() => {
    const name = form.watch('name');
    if (name) {
      form.setValue('slug', convertToSlug(name));
    }
  }, [form.watch('name')]);

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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="capitalize w-full">
                        <SelectValue placeholder="Select a category" className="capitalize" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...PRODUCT_CATEGORYES].map(category => (
                          <SelectItem key={category} value={category} className="capitalize">
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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

        <div className="w-full flex">
          <Button type="submit" size="lg" className="mr-auto">
            Add new product
          </Button>
        </div>
      </form>
    </Form>
  );
}
