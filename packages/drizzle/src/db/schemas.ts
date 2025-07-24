import { relations } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  timestamp,
  uniqueIndex,
  serial,
  pgEnum,
  boolean,
  text,
  integer,
  index,
  decimal,
  json,
} from 'drizzle-orm/pg-core';

// Enum for user roles
export const userRoleEnum = pgEnum('user_role', ['consumer', 'vendor', 'admin']);

// Accounts Table
export const accountTable = pgTable(
  'accounts',
  {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }),
    role: userRoleEnum().notNull(),

    isOnboarded: boolean('is_onboarded').notNull().default(false),
    isVerified: boolean('is_verified').notNull().default(false),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [
    uniqueIndex('accounts_email_idx').on(table.email),
    uniqueIndex('accounts_email_role_idx').on(table.email, table.role),
  ],
);

// Sessions Table
export const sessionTable = pgTable(
  'sessions',
  {
    id: serial('id').primaryKey(),
    accountId: integer('account_id')
      .notNull()
      .references(() => accountTable.id, { onDelete: 'cascade' }),
    refreshToken: text('refresh_token').notNull(),
    role: userRoleEnum().notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    userAgent: varchar('user_agent', { length: 255 }).notNull(),
    ipAddress: varchar('ip_address', { length: 255 }).notNull(),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date()),
    revokedAt: timestamp('revoked_at'),
  },
  table => [
    uniqueIndex('sessions_refresh_token_idx').on(table.refreshToken),
    index('sessions_account_id_idx').on(table.accountId),
  ],
);

type ImageMetadata = {
  width?: number;
  height?: number;
  format?: string;
  size?: number;
  mimeType?: string;
} & Record<string, any>;

// Images Table
export const imageTable = pgTable(
  'images',
  {
    id: serial('id').primaryKey(),
    url: varchar('url', { length: 255 }).notNull(),
    publicId: varchar('file_id', { length: 255 }).notNull(),
    alt: varchar('alt', { length: 255 }),

    metadata: json('metadata').$type<ImageMetadata>().default({}),

    createdAt: timestamp('created_at').defaultNow(),
  },
  table => [uniqueIndex('images_url_idx').on(table.url)],
);

// Consumers Table
export const consumerTable = pgTable(
  'consumers',
  {
    id: serial('id').primaryKey(),
    accountId: integer('account_id')
      .notNull()
      .references(() => accountTable.id, { onDelete: 'cascade' }),
    avatarId: integer('avatar_id').references(() => imageTable.id),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull(),
    emailVerified: boolean('email_verified').notNull().default(false),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date()),
    revokedAt: timestamp('revoked_at'),
  },
  table => [
    index('consumers_account_id_idx').on(table.accountId),
    uniqueIndex('consumers_email_idx').on(table.email),
  ],
);

// Relations of consumers
export const consumerRelations = relations(consumerTable, ({ one }) => ({
  account: one(accountTable, {
    fields: [consumerTable.accountId],
    references: [accountTable.id],
  }),
  avatar: one(imageTable, {
    fields: [consumerTable.avatarId],
    references: [imageTable.id],
  }),
}));

// Enum for staff roles
export const vendorStaffRoleEnum = pgEnum('vendor_staff_roles', ['owner', 'manager', 'staff']);

// Vendor Staff Table
export const vendorStaffTable = pgTable(
  'vendor_staffs',
  {
    id: serial('id').primaryKey(),
    accountId: integer('account_id')
      .notNull()
      .references(() => accountTable.id, { onDelete: 'cascade' }),
    storeId: integer('store_id')
      .notNull()
      .references(() => vendorStoreTable.id),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull(),
    phoneNumber: varchar('phone_number', { length: 255 }),
    avatarId: integer('avatar_id').references(() => imageTable.id),

    role: vendorStaffRoleEnum().notNull(),
    addedBy: integer('added_by'),
    removedBy: integer('removed_by'),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [uniqueIndex('vendor_staffs_email_idx').on(table.email)],
);

// Relations of vendor staff
export const vendorStaffRelations = relations(vendorStaffTable, ({ one }) => ({
  account: one(accountTable, {
    fields: [vendorStaffTable.accountId],
    references: [accountTable.id],
  }),
  store: one(vendorStoreTable, {
    fields: [vendorStaffTable.storeId],
    references: [vendorStoreTable.id],
  }),
  avatar: one(imageTable, {
    fields: [vendorStaffTable.avatarId],
    references: [imageTable.id],
  }),
  addedByStaff: one(vendorStaffTable, {
    fields: [vendorStaffTable.addedBy],
    references: [vendorStaffTable.id],
  }),
  removedByStaff: one(vendorStaffTable, {
    fields: [vendorStaffTable.removedBy],
    references: [vendorStaffTable.id],
  }),
}));

// Address Table
export const addressTable = pgTable('addresses', {
  id: serial('id').primaryKey(),
  addressLine1: varchar('address_line_1', { length: 255 }).notNull(),
  addressLine2: varchar('address_line_2', { length: 255 }),
  city: varchar('city', { length: 255 }).notNull(),
  state: varchar('state', { length: 255 }).notNull(),
  zipCode: varchar('zip_code', { length: 20 }).notNull(),
  country: varchar('country', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const vendorPaymentTable = pgTable('vendor_payments', {
  id: serial('id').primaryKey(),
  paymentProvider: varchar('payment_provider', { length: 100 }),
  paymentAccountId: varchar('payment_account_id', { length: 255 }),
  isPaymentSetup: boolean('is_payment_setup').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const vendorStoreTable = pgTable(
  'vendor_stores',
  {
    id: serial('id').primaryKey(),
    createdById: integer('created_by_id')
      .notNull()
      .references(() => accountTable.id, { onDelete: 'set null' }),
    storeName: varchar('store_name', { length: 255 }).notNull(),
    storeDescription: varchar('store_description', { length: 255 }),
    storeCategory: text('store_category').notNull(),
    storeAddress: integer('store_address').references(() => addressTable.id, {
      onDelete: 'set null',
    }),
    storePhoneNumber: varchar('store_phone_number', { length: 20 }).notNull(),
    storeEmail: varchar('store_email', { length: 255 }).notNull(),
    storeLogoId: integer('store_logo_id').references(() => imageTable.id),
    storeCoverId: integer('store_cover_id').references(() => imageTable.id),
    storePaymentMethodId: integer('store_payment_method_id').references(
      () => vendorPaymentTable.id,
      { onDelete: 'set null' },
    ),

    isOnboard: boolean('is_onboard').notNull().default(false),
    isApproved: boolean('is_approved').notNull().default(false),
    isVerified: boolean('is_verified').notNull().default(false),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [
    uniqueIndex('vendor_stores_name_idx').on(table.storeName),
    uniqueIndex('vendor_stores_email_idx').on(table.storeEmail),
    index('vendor_stores_created_by_idx').on(table.createdById),
  ],
);

export const vendorStoreRelations = relations(vendorStoreTable, ({ one }) => ({
  createdBy: one(accountTable, {
    fields: [vendorStoreTable.createdById],
    references: [accountTable.id],
  }),
  storeAddress: one(addressTable, {
    fields: [vendorStoreTable.storeAddress],
    references: [addressTable.id],
  }),
  storeLogo: one(imageTable, {
    fields: [vendorStoreTable.storeLogoId],
    references: [imageTable.id],
  }),
  storeCover: one(imageTable, {
    fields: [vendorStoreTable.storeCoverId],
    references: [imageTable.id],
  }),
  storePaymentMethod: one(vendorPaymentTable, {
    fields: [vendorStoreTable.storePaymentMethodId],
    references: [vendorPaymentTable.id],
  }),
}));

export const productImageTable = pgTable(
  'product_images',
  {
    id: serial('id').primaryKey(),

    imageId: integer('image_id')
      .notNull()
      .references(() => imageTable.id, { onDelete: 'cascade' }),

    productId: integer('product_id')
      .notNull()
      .references(() => productTable.id, { onDelete: 'cascade' }),
    isPrimary: boolean('is_primary').notNull().default(false),
    order: integer('order').notNull().default(0),

    createdAt: timestamp('created_at').defaultNow(),
  },
  table => [index('product_images_product_idx').on(table.productId)],
);

export const productTable = pgTable(
  'products',
  {
    id: serial('id').primaryKey(),
    storeId: integer('store_id')
      .notNull()
      .references(() => vendorStoreTable.id, { onDelete: 'cascade' }),
    addedById: integer('added_by_id')
      .notNull()
      .references(() => accountTable.id, { onDelete: 'set null' }), // added by vendor staff id
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),

    description: varchar('description', { length: 1000 }),
    category: varchar('category', { length: 100 }),

    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    discount: decimal('discount', { precision: 5, scale: 2 }).default('0.00'),

    stock: integer('stock').notNull().default(0),
    isAvailable: boolean('is_available').notNull().default(true),

    images: json('images').$type<string[]>().default([]),
    tags: json('tags').$type<string[]>().default([]),
    isDeleted: boolean('is_deleted').notNull().default(false),

    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [
    index('products_store_id_idx').on(table.storeId),
    index('products_slug_idx').on(table.slug),
    index('products_category_idx').on(table.category),
  ],
);

export const productImageRelations = relations(productImageTable, ({ one }) => ({
  product: one(productTable, {
    fields: [productImageTable.productId],
    references: [productTable.id],
  }),
  image: one(imageTable, {
    fields: [productImageTable.imageId],
    references: [imageTable.id],
  }),
}));

export const productRelations = relations(productTable, ({ one, many }) => ({
  store: one(vendorStoreTable, {
    fields: [productTable.storeId],
    references: [vendorStoreTable.id],
  }),
  addedBy: one(vendorStaffTable, {
    fields: [productTable.addedById], // added by vendor staff id of account
    references: [vendorStaffTable.accountId],
  }),
  images: many(productImageTable),
}));

export const productRatingTable = pgTable(
  'product_ratings',
  {
    id: serial('id').primaryKey(),
    productId: integer('product_id')
      .notNull()
      .references(() => productTable.id, { onDelete: 'cascade' }),
    accountId: integer('account_id')
      .notNull()
      .references(() => accountTable.id, { onDelete: 'cascade' }),
    rating: integer('rating').notNull(),
    comment: varchar('comment', { length: 1000 }),
    imageId: integer('image_id').references(() => imageTable.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [
    index('product_ratings_product_id_idx').on(table.productId),
    index('product_ratings_account_id_idx').on(table.accountId),
  ],
);

export const productRatingRelations = relations(productRatingTable, ({ one }) => ({
  product: one(productTable, {
    fields: [productRatingTable.productId],
    references: [productTable.id],
  }),
  customer: one(consumerTable, {
    fields: [productRatingTable.accountId],
    references: [consumerTable.accountId],
  }),
  image: one(imageTable, {
    fields: [productRatingTable.imageId],
    references: [imageTable.id],
  }),
}));

export const cartTable = pgTable(
  'carts',
  {
    id: serial('id').primaryKey(),
    accountId: integer('account_id')
      .notNull()
      .references(() => accountTable.id, { onDelete: 'cascade' }),
    productId: integer('product_id')
      .notNull()
      .references(() => productTable.id, { onDelete: 'cascade' }),
    quantity: integer('quantity').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [index('carts_account_id_idx').on(table.accountId)],
);

export const cartRelations = relations(cartTable, ({ one }) => ({
  product: one(productTable, {
    fields: [cartTable.productId],
    references: [productTable.id],
  }),
  addedBy: one(consumerTable, {
    fields: [cartTable.accountId],
    references: [consumerTable.accountId],
  }),
}));

export const wishlistTable = pgTable(
  'wishlists',
  {
    id: serial('id').primaryKey(),
    accountId: integer('account_id')
      .notNull()
      .references(() => accountTable.id, { onDelete: 'cascade' }),
    productId: integer('product_id')
      .notNull()
      .references(() => productTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow(),
  },
  table => [index('wishlists_account_id_idx').on(table.accountId)],
);

export const wishlistRelations = relations(wishlistTable, ({ one }) => ({
  product: one(productTable, {
    fields: [wishlistTable.productId],
    references: [productTable.id],
  }),
  addedBy: one(consumerTable, {
    fields: [wishlistTable.accountId],
    references: [consumerTable.accountId],
  }),
}));

// Payment data table
export const paymentStatusEnum = pgEnum('payment_status', [
  'pending',
  'completed',
  'failed',
  'cancelled',
  'refunded',
]);

export const paymentTable = pgTable('payments', {
  id: serial('id').primaryKey(),

  status: paymentStatusEnum('status').notNull().default('pending'),
  method: varchar('method', { length: 100 }).notNull(),

  transactionId: varchar('transaction_id', { length: 255 }).unique(),
  provider: varchar('provider', { length: 255 }).notNull(),

  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 10 }).default('INR'),

  metadata: json('metadata').$type<Record<string, any>>().default({}),

  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Order items table
export const orderItemTable = pgTable(
  'order_items',
  {
    id: serial('id').primaryKey(),
    orderId: integer('order_id')
      .notNull()
      .references(() => orderTable.id, { onDelete: 'cascade' }),
    productId: integer('product_id')
      .notNull()
      .references(() => productTable.id, { onDelete: 'cascade' }),
    quantity: integer('quantity').notNull(),
    priceAtPurchase: decimal('price_at_purchase', { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [
    index('order_items_order_id_idx').on(table.orderId),
    index('order_items_product_id_idx').on(table.productId),
  ],
);

export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
]);

export const orderTable = pgTable(
  'orders',
  {
    id: serial('id').primaryKey(),
    accountId: integer('account_id')
      .notNull()
      .references(() => accountTable.id, { onDelete: 'cascade' }),
    paymentId: integer('payment_id').references(() => paymentTable.id, { onDelete: 'cascade' }),
    status: orderStatusEnum('status').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [index('orders_account_id_idx').on(table.accountId)],
);

export const orderItemRelations = relations(orderItemTable, ({ one }) => ({
  order: one(orderTable, {
    fields: [orderItemTable.orderId],
    references: [orderTable.id],
  }),
  product: one(productTable, {
    fields: [orderItemTable.productId],
    references: [productTable.id],
  }),
}));

export const orderRelations = relations(orderTable, ({ one, many }) => ({
  account: one(accountTable, {
    fields: [orderTable.accountId],
    references: [accountTable.id],
  }),
  payment: one(paymentTable, {
    fields: [orderTable.paymentId],
    references: [paymentTable.id],
  }),
  items: many(orderItemTable),
}));
