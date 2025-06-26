'use client';

import * as React from 'react';
import {
  TVendorRegistrationEmailVerification,
  vendorRegistrationEmailVerificationSchema,
} from '@/schemas/auth.schemas';
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
import { useMutation } from '@tanstack/react-query';
import { resendRegistrationOtp } from '@/services/auth.services';

export const VerifyEmailRegistrationForm: React.FC<{
  isLoading: boolean;
  email: string;
  error?: string;
  onSubmit: (data: TVendorRegistrationEmailVerification) => void;
}> = ({ onSubmit, email, error, isLoading }) => {
  const form = useForm<TVendorRegistrationEmailVerification>({
    resolver: zodResolver(vendorRegistrationEmailVerificationSchema),
    defaultValues: {
      email: email ?? '',
      otp: '',
      password: '',
    },
  });

  const resendOtpMutation = useMutation({
    mutationKey: ['register', 'resend-otp'],
    mutationFn: resendRegistrationOtp,
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OTP</FormLabel>
              <FormControl>
                <Input placeholder="OTP" type="text" {...field} />
              </FormControl>
              <div className="inline-flex items-center w-full justify-between gap-2">
                <FormDescription>Enter the OTP sent to your email</FormDescription>
                <Button
                  type="button"
                  variant="link"
                  disabled={resendOtpMutation.isPending}
                  onClick={() => resendOtpMutation.mutate({ email })}
                >
                  Resend OTP
                </Button>
              </div>
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

        {error ||
          (resendOtpMutation.error && (
            <p className="text-destructive text-sm py-2 px-3 bg-destructive/30 rounded-md">
              {error || resendOtpMutation.error?.message}
            </p>
          ))}

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || resendOtpMutation.isPending}
        >
          Continue
        </Button>
      </form>
    </Form>
  );
};
