'use client';

import * as React from 'react';
import { vendorRegistrationEmailSchema, TVendorRegistrationEmail } from '@/schemas/auth.schemas';
import { useForm } from 'react-hook-form';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const EmailRegistrationForm: React.FC<{
  isLoading?: boolean;
  error?: string;
  onSubmit: (data: TVendorRegistrationEmail) => void;
}> = ({ onSubmit, isLoading, error }) => {
  const form = useForm<TVendorRegistrationEmail>({
    resolver: zodResolver(vendorRegistrationEmailSchema),
    defaultValues: {
      email: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormDescription>You will receive otp to verify your email</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <p className="text-destructive text-sm py-2 px-3 bg-destructive/30">{error}</p>}

        <Button type="submit" className="w-full" disabled={isLoading}>
          Continue
        </Button>
      </form>
    </Form>
  );
};
