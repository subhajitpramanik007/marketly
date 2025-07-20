import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type TLoginSchema } from '@/schemas';

import { useMutation } from '@tanstack/react-query';
import { loginService } from '@/services/auth.service';

export const useLoginForm = () => {
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync: userLogin, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginService,
    onSuccess: data => {
      toast.success('Login successful');
    },
    onError: () => {
      toast.error('Login failed');
    },
  });

  function onSubmit(data: TLoginSchema) {
    userLogin(data);
  }

  return { form, onSubmit, isPending };
};
