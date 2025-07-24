import { registerResendOtpService } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useResendVerificationOtp = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['resend-verification-otp'],
    mutationFn: registerResendOtpService,
    onError: error => {
      toast.error(error.message || 'Failed to resend verification OTP');
    },
  });

  function resendVerificationOtp(email: string) {
    toast.promise(mutateAsync({ email }), {
      loading: 'Resending verification OTP...',
      success: 'Verification OTP resent successfully',
      error: 'Failed to resend verification OTP',
    });
  }

  return {
    resendVerificationOtp,
    isPending,
  };
};
