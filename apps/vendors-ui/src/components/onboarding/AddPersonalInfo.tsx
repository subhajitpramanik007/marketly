'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { OnboardFormActions } from './OnboardFormActions';
import { usePersonalInfo } from '@/hooks/onborading/usePersonalInfo';
import { useOnboarding } from './OnboardingProvider';

export const AddPersonalInfo = () => {
  const { currentStep } = useOnboarding();
  const { form, onSubmit, isCompleted, handleNext, isSubmitted } = usePersonalInfo();

  return (
    <div className="space-y-4 flex flex-col w-full h-full justify-between">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <div className="flex w-full flex-col md:flex-row items-center gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormDescription>
                  This email will be used for store notifications and updates.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Phone Number</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Phone Number" {...field} />
                </FormControl>
                <FormDescription>
                  This phone number will be used for customer inquiries and support.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full justify-end">
            <Button size={'lg'} type="submit">
              Save Personal Info
            </Button>
          </div>
        </form>
      </Form>

      {isCompleted ? <OnboardFormActions key={currentStep} onNext={handleNext} /> : null}
    </div>
  );
};
