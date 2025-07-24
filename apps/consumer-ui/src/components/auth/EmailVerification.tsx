import * as React from 'react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { useVerifyUser } from '@/hooks/auth/useVerifyUser';
import { useResendVerificationOtp } from '@/hooks/auth/useResendVerificationOtp';
import { Link } from '@tanstack/react-router';
import { useRegistration } from './RegistrationProvider';

export const EmailVerification: React.FC = () => {
  const { form, isPending, onSubmit } = useVerifyUser();
  const { resendVerificationOtp, isPending: isResendingOtp } = useResendVerificationOtp();
  const { email } = useRegistration();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Skip Button for Email Verification */}
        <div className="flex w-full items-center justify-center">
          <Button type="button" variant={'link'} asChild>
            <Link to="/">Skip Email Verification</Link>
          </Button>
        </div>

        {/* Or */}
        <div className="flex w-full items-center">
          <div className="w-full h-[1px] bg-gray-300" />
          <span className="text-gray-500 px-2">Or</span>
          <div className="w-full h-[1px] bg-gray-300" />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex w-full items-center justify-between">
                <FormLabel>Email*</FormLabel>
                <Button
                  type="button"
                  variant={'link'}
                  onClick={() => resendVerificationOtp(email)}
                  disabled={isResendingOtp}
                  className="p-0"
                >
                  Resend OTP
                </Button>
              </div>
              <FormControl>
                <Input placeholder="Email" {...field} />
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
              <FormLabel className="pb-2">OTP*</FormLabel>
              <FormControl>
                <Input placeholder="OTP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending || isResendingOtp}>
          <Spinner isLoading={isPending} />
          Verify Email
        </Button>
      </form>
    </Form>
  );
};
