import Razorpay from 'razorpay';
import { env } from '@marketly/config';
import crypto from 'crypto';
import { Request } from 'express';

class RazorpayService {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: env.RAZORPAY_KEY_ID,
      key_secret: env.RAZORPAY_KEY_SECRET,
    });
  }

  async createOrder(amount: number, receiptId = Date.now(), currency = 'INR', notes = {}) {
    return await this.razorpay.orders.create({
      amount,
      currency,
      receipt: 'order_rcptid_' + receiptId,
      notes,
    });
  }

  async verifyPayment(orderId: string, paymentId: string, razorpaySignature: string) {
    const sign = orderId + '|' + paymentId;

    const createdSignature = crypto
      .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    return createdSignature === razorpaySignature;
  }

  async verifyWebhook(req: Request) {
    try {
      const razorpaySignature = req.headers['x-razorpay-signature'];

      const expectedSignature = crypto
        .createHmac('sha256', env.RAZORPAY_WEBHOOK_SECRET)
        .update(JSON.stringify(req.body))
        .digest('hex');

      return razorpaySignature === expectedSignature;
    } catch (error) {
      console.error(error);
    }
  }
}

export const razorpayService = new RazorpayService();
