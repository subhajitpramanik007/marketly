import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type TLoginSchema } from '@/schemas';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginService } from '@/services/auth.service';
import { useRouter } from '@tanstack/react-router';

export const useLoginForm = () => {
  const router = useRouter();

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync: userLogin, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginService,
    onSuccess: async () => {
      toast.success('Login successful');
      form.reset();
      queryClient.clear();

      router.navigate({ to: '/', reloadDocument: true });
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
