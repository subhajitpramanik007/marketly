'use client';

import { StaffSchema, staffSchema } from '@/schemas/staff.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createStaff } from '@/services/staffs.services';
import { useSession } from '@/hooks/useSession';
import toast from 'react-hot-toast';

export const CreateStaffForm: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { store } = useSession();
  const form = useForm<StaffSchema>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync: createStaffMutation, isPending } = useMutation({
    mutationKey: ['staffs', 'create'],
    mutationFn: (data: StaffSchema) => createStaff(store!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
      form.reset();
      onClose();
    },
  });

  const onSubmit = (data: StaffSchema) => {
    toast.promise(createStaffMutation(data), {
      loading: 'Creating staff...',
      success: 'Staff created successfully',
      error: 'Failed to create staff',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
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
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          Add New Staff
        </Button>
      </form>
    </Form>
  );
};
