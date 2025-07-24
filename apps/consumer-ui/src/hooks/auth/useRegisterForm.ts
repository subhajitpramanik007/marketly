import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type TRegisterSchema } from '@/schemas';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerService } from '@/services/auth.service';
import { useRegistration } from '@/components/auth/RegistrationProvider';

export const useRegisterForm = () => {
  const { setEmail, setIsDoneRegistration } = useRegistration();

  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const queryClient = useQueryClient();

  const { mutateAsync: userRegister, isPending } = useMutation({
    mutationKey: ['register'],
    mutationFn: registerService,
    onSuccess: () => {
      toast.success('Registration successful');
      setIsDoneRegistration(true);
      form.reset();

      queryClient.invalidateQueries({ queryKey: ['session', 'me'] });
    },
    onError: error => {
      toast.error(error.message || 'Registration failed');
    },
  });

  function onSubmit(data: TRegisterSchema) {
    userRegister(data);
    setEmail(data.email);
  }

  return { form, onSubmit, isPending };
};
