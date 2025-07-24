import toast from 'react-hot-toast';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userVerifySchema, type TUserVerifySchema } from '@/schemas';

import { useMutation } from '@tanstack/react-query';
import { registerVerifyService } from '@/services/auth.service';

import { useRouter } from '@tanstack/react-router';
import { useRegistration } from '@/components/auth';

export const useVerifyUser = () => {
  const { email } = useRegistration();

  const router = useRouter();

  const form = useForm<TUserVerifySchema>({
    resolver: zodResolver(userVerifySchema),
    defaultValues: {
      email,
      otp: '',
    },
  });

  const { mutateAsync: userVerify, isPending } = useMutation({
    mutationKey: ['verify'],
    mutationFn: registerVerifyService,
    onSuccess: () => {
      toast.success('Email verified successfully');
      router.navigate({ to: '/' });
    },
    onError: () => {
      toast.error('Email verification failed');
    },
  });

  function onSubmit(data: TUserVerifySchema) {
    userVerify(data);
  }

  return {
    form,
    onSubmit,
    isPending,
  };
};
