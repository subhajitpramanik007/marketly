export const loadRazorpayScript = async () => {
  return new Promise<void>(resolve => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve();
    };
    document.body.appendChild(script);
  });
};
