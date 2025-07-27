export interface ICart {
  id: number;
  quantity: number;
  productId: number;
}

export interface ICartWithProduct extends Omit<ICart, 'productId'> {
  product: {
    id: number;
    name: string;
    slug: string;
    price: string;
    discount: string | null;
    description: string | null;
    category: string;
    tags: string[];
    stock: number;
    imageUrl: string | null;
    storeName: string;
    storeId: number;
  };
}
