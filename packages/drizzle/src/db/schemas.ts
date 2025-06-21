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

// Images Table
export const imageTable = pgTable(
  'images',
  {
    id: serial('id').primaryKey(),
    url: varchar('url', { length: 255 }).notNull(),
    fileId: varchar('file_id', { length: 255 }),
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

// Vendor Store Table (after staff, but circular ref supported via arrow function)
export const vendorStoreTable = pgTable(
  'vendor_stores',
  {
    id: serial('id').primaryKey(),
    createdById: integer('created_by_id')
      .notNull()
      .references(() => accountTable.id, { onDelete: 'set null' }),
    storeName: varchar('store_name', { length: 255 }).notNull(),
    storeDescription: varchar('store_description', { length: 255 }),
    storeAddress: varchar('store_address', { length: 255 }),
    storePhoneNumber: varchar('store_phone_number', { length: 255 }),
    storeEmail: varchar('store_email', { length: 255 }).notNull(),
    storeLogoId: integer('store_logo_id').references(() => imageTable.id),
    storeCoverId: integer('store_cover_id').references(() => imageTable.id),

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
