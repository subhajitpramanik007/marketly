export interface IProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  tags: string[];
  isAvailable: boolean;
  stock: number;
  createdAt: Date;
}
