'use client';

import { StaffUpdateSchema, staffUpdateSchema } from '@/schemas/staff.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStaff } from '@/services/staffs.services';
import { useSession } from '@/hooks/useSession';
import toast from 'react-hot-toast';
import { IVendorStaff } from '@/types';
import { useRouter } from 'next/navigation';

export const EditStaffForm: React.FC<{ staff: IVendorStaff }> = ({ staff }) => {
  const { store } = useSession();
  const router = useRouter();

  const form = useForm<StaffUpdateSchema>({
    resolver: zodResolver(staffUpdateSchema),
    defaultValues: {
      firstName: staff.firstName,
      lastName: staff.lastName || '',
      email: staff.email,
      phoneNumber: staff.phoneNumber.toString(),
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync: updateStaffMutation, isPending } = useMutation({
    mutationKey: ['staffs', 'update', { staffId: staff.id }],
    mutationFn: (data: StaffUpdateSchema) => updateStaff(store!.id, staff.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
      queryClient.invalidateQueries({ queryKey: ['staff', { staffId: staff.id }] });
      form.reset();
      router.back();
    },
  });

  const onSubmit = (data: StaffUpdateSchema) => {
    toast.promise(updateStaffMutation(data), {
      loading: 'Updating staff...',
      success: 'Staff updated successfully',
      error: 'Failed to update staff',
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
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          Edit Staff
        </Button>
      </form>
    </Form>
  );
};
