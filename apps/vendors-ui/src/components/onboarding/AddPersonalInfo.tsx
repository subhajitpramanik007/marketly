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
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema, TPersonalInfoSchema } from '@/schemas/onboarding.schama';
import { useOnboarding } from './OnboardingProvider';

export const AddPersonalInfo = () => {
  const { currentStep, setCurrentStep, setCompletedStep } = useOnboarding();

  const form = useForm<TPersonalInfoSchema>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    },
  });

  const onSubmit = (data: TPersonalInfoSchema) => {
    console.log('Form submitted:', data);
    setCurrentStep(currentStep + 1);
    setCompletedStep(currentStep + 1);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col w-full h-full justify-between"
      >
        <div className="space-y-4">
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
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormDescription>
                  This phone number will be used for customer inquiries and support.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep(currentStep - 1)}
            className="w-full md:w-auto "
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous step
            <span className="sr-only">Go to previous step</span>
          </Button>
          {/* Skip */}
          <Button
            type="button"
            variant="link"
            onClick={() => {
              setCurrentStep(currentStep + 1);
              setCompletedStep(currentStep + 1);
            }}
            className="w-full md:w-auto mr-4"
          >
            Skip
            <span className="sr-only">Skip this step</span>
          </Button>
          <Button type="submit" className="w-full md:w-auto justify-end" size="lg">
            Continue to next step
            <span className="sr-only">Continue to next step</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};
