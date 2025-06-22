'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addStoreOnboardingSchema,
  StoreCategory,
  TAddStoreOnboardingSchema,
} from '@/schemas/onboarding.schama';
import { Textarea } from '../ui/textarea';
import { useOnboarding } from './OnboardingProvider';
import { OnboardFormActions } from './OnboardFormActions';

export const AddStoreInfo: React.FC = () => {
  const { currentStep, setCurrentStep, setCompletedStep } = useOnboarding();

  const form = useForm<TAddStoreOnboardingSchema>({
    resolver: zodResolver(addStoreOnboardingSchema),
    defaultValues: {
      storeName: '',
      description: '',
      category: 'automotive',
    },
  });

  const onSubmit = (data: TAddStoreOnboardingSchema) => {
    console.log('Form submitted:', data);

    setCurrentStep(currentStep + 1);
    setCompletedStep(currentStep);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col w-full h-full justify-between"
      >
        <div className="flex flex-col w-full gap-4">
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Store Name" />
                </FormControl>
                <FormDescription>
                  The name of your store should be unique and descriptive.
                </FormDescription>
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
                  <Textarea {...field} placeholder="Store Description" />
                </FormControl>
                <FormDescription>A brief description of your store (optional).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex justify-between">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full max-w-lg">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {StoreCategory.options.map((option, idx) => (
                        <SelectItem key={idx} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <OnboardFormActions
          onPrevious={() => setCurrentStep(currentStep - 1)}
          onSkip={() => {
            setCurrentStep(currentStep + 1);
            setCompletedStep(currentStep + 1);
          }}
          isShowPrevious={false}
          isShowSkip={false}
        />
      </form>
    </Form>
  );
};
