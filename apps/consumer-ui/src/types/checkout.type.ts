export interface ICheckoutItem {
  id: number;
  name: string;
  price: string;
  discount: string | null;
  stock: number;
  quantity: number;
  cartItemId: number;
  totalPrice: number;
  imageUrl?: string;
}

export interface ICheckoutSummary {
  cartItems: ICheckoutItem[];
  totalPrice: string;
  discount: string;
  totalAfterDiscount: string;
  deliveryCharge: string;
  totalAfterDeliveryCharge: string;
  grandTotal: string;
}
