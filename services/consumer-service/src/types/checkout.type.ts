export interface ICheckoutItem {
  id: number;
  name: string;
  price: string;
  discount: string | null;
  stock: number;
  quantity: number;
  cartItemId: number;
  totalPrice: string;
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

export interface ICart {
  id: number;
  productId: number;
  quantity: number;
}
