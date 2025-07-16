export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  discount: string;
  description: string;
  category: string;
  tags: string[];
  stock: number;
  createdAt: Date;
  imageUrl: string | null;
  storeName: string;
  storeId: number;
  isInWishlist: number | null;
  cart: {
    exists: number;
    quantity: number;
  } | null;
}

export interface ProductsResponseMetaData {
  noOfProducts: string;
  noOfPages: number;
  currentPage: number;
  limit: number;
}

export interface ProductsResponseData {
  products: Product[];
  meta: ProductsResponseMetaData;
}
