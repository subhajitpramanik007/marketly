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
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '@/components/ui/input';
import { Check, Loader2 } from 'lucide-react';

import { StoreCategory } from '@/schemas/onboarding.schama';
import { useOnboarding } from './OnboardingProvider';
import { OnboardFormActions } from './OnboardFormActions';
import { useStoreInfo } from '@/hooks/onborading/useStoreInfo';
import { FormError } from '../FormError';

export const AddStoreInfo: React.FC = () => {
  const { currentStep } = useOnboarding();
  const {
    form,
    handleNext,
    isCompleted,
    isPending,
    onSubmit,
    isCheckingName,
    isNameAvailable,
    error,
  } = useStoreInfo();

  return (
    <div className="space-y-6 flex flex-col w-full h-full justify-between">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col w-full gap-4">
            <FormField
              control={form.control}
              name="storeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name *</FormLabel>
                  <FormControl>
                    <div className="w-full relative">
                      <Input {...field} placeholder="Store Name" />

                      {isNameAvailable && !isCheckingName && (
                        <Check className="absolute size-4 text-emerald-500 right-2 top-1/2 -translate-y-1/2" />
                      )}
                    </div>
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
                <FormItem>
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

            <FormError error={error?.message} />
          </div>

          <div className="flex w-full justify-end">
            <Button type="submit" disabled={isNameAvailable === false || isCheckingName}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save and continue
            </Button>
          </div>
        </form>
      </Form>

      {isCompleted ? <OnboardFormActions key={currentStep} onNext={handleNext} /> : null}
    </div>
  );
};
