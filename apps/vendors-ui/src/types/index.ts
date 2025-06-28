interface Image {
  id: number;
  url: string;
  fileId: string | null;
  createdAt: Date | null;
}

export interface IVendor {
  id: number;
  email: string;
  role: 'owner' | 'manager' | 'staff';
  createdAt: Date | null;
  accountId: number;
  avatar: Image | null;
  firstName: string;
  lastName: string | null;
  storeId: number;
}

export interface IVendorStore {
  id: number;
  createdById: number;
  storeName: string;
  storeDescription: string | null;
  storeCategory: string;
  storeEmail: string;
  createdAt: Date | null;
  storeLogo: Image | null;
}

export interface IVendorSession {
  user: IVendor;
  store: IVendorStore;
}

export interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
}

// Product Images
export interface IProductImage {
  id: number;
  url: string;
  alt: string;
  fileId: string | null;
  createdAt: Date | null;
}

// product types
export interface IProduct {
  id: number;
  storeId: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: string;
  discount: string;
  stock: number;
  isAvailable: boolean;
  images: IProductImage[];
  tags: string[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  addedBy: Omit<IVendor, 'storeId' | 'avatar'>;
}
