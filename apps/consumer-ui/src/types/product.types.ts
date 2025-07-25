import type { IImage } from './image.types';

export interface IProduct {
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
  isInWishlist: boolean;
  cart: {
    exists: number;
    quantity: number;
  } | null;
}

export interface IProductImage extends IImage {
  isPrimary?: boolean;
  order: number;
  metadata: {
    width?: number;
    height?: number;
    format?: string;
    size?: number;
    mimeType?: string;
  };
  rating: number | null;
  noOfRatings: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface ISingleProduct extends Omit<IProduct, 'imageUrl' | 'storeName' | 'storeId'> {
  store: {
    id: number;
    storeName: string;
    isVerified: boolean;
    storeLogo: string | null;
  };
  ratings: number | null;
  noOfRatings: number | null;
  images: IProductImage[];
}

export interface IProductsResponseMetaData {
  noOfProducts: string;
  noOfPages: number;
  currentPage: number;
  limit: number;
}
