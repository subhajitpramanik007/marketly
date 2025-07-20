import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type TRegisterSchema } from '@/schemas';

import { useMutation } from '@tanstack/react-query';
import { registerService } from '@/services/auth.service';

export const useRegisterForm = () => {
  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const { mutateAsync: userRegister, isPending } = useMutation({
    mutationKey: ['register'],
    mutationFn: registerService,
    onSuccess: data => {
      toast.success('Registration successful');
    },
    onError: () => {
      toast.error('Registration failed');
    },
  });

  function onSubmit(data: TRegisterSchema) {
    userRegister(data);
  }

  return { form, onSubmit, isPending };
};
