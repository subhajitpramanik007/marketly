'use client';

import * as React from 'react';
import { vendorLoginSchema, TVendorLogin } from '@/schemas/auth.schemas';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '@/services/auth.services';
import { useRouter } from 'next/navigation';
import { useLocalStore } from '@/hooks/useLocalStore';

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const { setItem } = useLocalStore();

  const form = useForm<TVendorLogin>({
    resolver: zodResolver(vendorLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const queryClient = useQueryClient();

  const {
    isPending,
    mutate: loginMutation,
    isError,
    error,
  } = useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: () => {
      form.reset();
      setItem('session', {
        isAuthenticated: true,
        lastRefreshedAt: Date.now(),
      });

      queryClient.invalidateQueries({ queryKey: ['session'] });

      router.push('/');
    },
  });

  const onSubmit = (data: TVendorLogin) => {
    loginMutation(data);
  };

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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isError && (
          <p className="text-destructive text-sm py-2 px-3 bg-destructive/30 rounded-md">
            {error?.message}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          Login
        </Button>
      </form>
    </Form>
  );
};
