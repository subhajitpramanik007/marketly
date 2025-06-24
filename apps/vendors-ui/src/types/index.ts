interface Image {
  id: number;
  url: string;
  fileId: string | null;
  createdAt: Date | null;
}

export interface TVendor {
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

export interface TVendorStore {
  id: number;
  createdById: number;
  storeName: string;
  storeDescription: string | null;
  storeCategory: string;
  storeEmail: string;
  createdAt: Date | null;
  storeLogo: Image | null;
}

export interface TVendorSession {
  user: TVendor;
  store: TVendorStore;
}

export interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
}
