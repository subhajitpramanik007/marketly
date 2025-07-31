import toast from 'react-hot-toast';
import { useSession } from '../auth';

import { useRazorpay } from 'react-razorpay';
import { useRouter } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkoutService, type RazorpayPaymentVerifiactionData } from '@/services/checkout.service';

export const useCheckoutPayment = () => {
  const { openRazorpaywindow } = useRazorpayWindow();

  return useMutation({
    mutationKey: ['checkout', 'payment'],
    mutationFn: () => checkoutService.processPayment(),
    onSuccess: data => {
      const { razorpayPayment } = data.data;
      if (!razorpayPayment) {
        toast.error('Payment failed');
      }

      openRazorpaywindow({
        ...razorpayPayment,
      });
    },
    onError: err => {
      toast.error('Payment failed, please try later');
      console.error(err);
    },
  });
};
export const useCheckoutPaymentVerify = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['checkout', 'payment', 'verify'],
    mutationFn: (data: RazorpayPaymentVerifiactionData) => checkoutService.verifyPayment(data),
    onSuccess: () => {
      toast.success('Payment successful');

      // invalidate queries
      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey[0] === 'products';
        },
      });

      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey[0] === 'cart';
        },
      });

      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey[0] === 'orders';
        },
      });

      setTimeout(() => {
        toast.success('Order placed successfully');
        router.navigate({ to: '/orders' });
      }, 2000);
    },
    onError: () => {
      toast.error('Payment failed');

      setTimeout(() => {
        router.navigate({ to: '/cart' });
      }, 2000);
    },
  });
};

const useRazorpayWindow = () => {
  const { user } = useSession();
  const { mutate: verifyPayment } = useCheckoutPaymentVerify();
  const { Razorpay } = useRazorpay();

  async function openRazorpaywindow(data: { amount: number; currency: string; orderId: string }) {
    try {
      if (!import.meta.env.VITE_RAZORPAY_KEY) {
        toast.error('Payment failed, please contact with support team');
      }

      const razorpayInstance = new Razorpay({
        amount: data.amount,
        currency: data.currency as any,
        order_id: data.orderId,
        key: import.meta.env.VITE_RAZORPAY_KEY!,
        name: 'Marketly',
        description: 'Payment for your order',
        handler: async (res: any) =>
          verifyPayment({
            razorpay_order_id: res.razorpay_order_id,
            razorpay_payment_id: res.razorpay_payment_id,
            razorpay_signature: res.razorpay_signature,
          }),
        prefill: {
          name: user?.firstName + ' ' + user?.lastName,
          email: user?.email,
          contact: '9999999999',
        },
      });

      razorpayInstance.open();
    } catch (error: any) {
      toast.error(error.massage ?? 'Payment not work');
      console.error(error);
    }
  }

  return {
    openRazorpaywindow,
  };
};
