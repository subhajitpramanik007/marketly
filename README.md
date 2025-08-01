# Marketly

Marketly is a marketplace where you can buy and sell products. It is a platform where you can buy and sell products. Vendors can manage own product, orders, sales, earnings, inventory, and much more. Customers can buy products from vendors.

## Tech Stack

- **Frontend**
  - Next.js
  - React
  - Vite
  - Typescript
  - Tailwind CSS
  - Shadcn UI
  - Zod
  - React Hook Form
  - React Query
  - Tanstack Router
  - Zustand
  - Axios
- **Backend**
  - Node.js
  - Express JS
  - Typescript
  - Drizzle ORM
  - PostgreSQL
  - Multer
  - Cloudinary
  - Razorpay
  - Nodemailer
- **Project Management**
  - PNPM
  - Git
  - Github
  - Turbo Repo
  - Prettier
  - ESLint
  - Husky
  - Docker

## Features:

### Vendors UI

- Create a vendor account
- Add a store, store name, store description, store category
- Complete the onboarding process
- Manage roles and permissions - Owner, Manager, Staff
- Add a product, product name, product description, product price, product quantity, product image
- Add images to your products
- View your orders
- View your sales
- View your earnings
- View your inventory
- Manage your store

### Consumers UI

- Create a consumer account
- Profile
- Search for products
- Add products to your wishlist
- Add products to your cart
- Checkout your cart
- Checkout your order and payment with Razorpay
- View your orders

### Admin UI

- Admin dashboard
- View all vendors - Accept or reject vendors

### API Gateway

- API Gateway for all the services
- Swagger documentation for all the services
- API documentation for all the services

### Services

#### Auth service

- Authentication and authorization
- Endpoint for the services
  - **Consumer endpoint**
    - Consumer registration `POST /auth/register`
    - Consumer verification `POST /auth/register/verify`
    - Consumer resend otp `POST /auth/register/resend-otp`
    - Consumer login `POST /auth/login`
    - Consumer logout `POST /auth/logout`
    - Consumer Refresh token `POST /auth/sessions/refresh`
  - **Vendor endpoint**
    - Vendor registration `POST /auth/vendors/register`
    - Vendor verification `POST /auth/vendors/register/verify`
    - Vendor resend otp `POST /auth/vendors/register/resend-otp`
    - Vendor login `POST /auth/vendors/login`
    - Vendor logout `POST /auth/vendors/logout`
    - Vendor Refresh token `POST /auth/sessions/refresh`

#### Consumer service:

- Consumer Endpoint for the services `/api/consumers`
  - **Me Endpoint**
    - Get consumer `GET /me`
  - **Wishlist Endpoint**
    - Add to wishlist `POST /wishlists`
    - Toggle wishlist `POST /wishlists/toggle/:productId`
    - Get wishlist `GET /wishlists`
  - **Cart Endpoint**
    - Add to cart `POST /carts`
    - Get cart `GET /carts`
    - Get cart item count `GET /carts/count`
    - Update cart item quantity `PUT /carts/:cartItemId`
    - Delete cart item `DELETE /carts/:cartItemId`
    - Clear cart `DELETE /carts/clear`
  - **Order Endpoint**
    - Get order `GET /orders`
    - Get order details `GET /orders/:orderId`
    - Cancel order `POST /orders/:orderId/cancel`
  - **Checkout Endpoint**
    - Get checkout summary `POST /checkout/summary`
    - Create checkout session `POST /checkout/process-payment`
    - Verify payment `POST /checkout/verify-payment`
    - Cancel checkout session `POST /checkout/cancel`
    - Webhook for Razorpay `POST /checkout/webhook`
    -

#### Vendor service:

- Vendor Endpoint for the services `/api/vendors`
  - **Me Endpoint**
    - Get vendor `GET /me`
  - **Onboarding Endpoint**
    - Vendor store onboarding `POST /onboarding`
    - Check store name availability `POST /onboarding/check-store-name`
    - Add store address `POST /onboarding/:vendorId/address`
    - Get vendor onboarding status `GET /onboarding/status`
  - **Profile Endpoint**
    - Get profile `GET /profile`
    - Update profile `PATCH /profile`
    - Delete profile `DELETE /profile`
    - Upload profile image `POST /profile/logo`
    - Upload cover image `POST /profile/banner`
  - **Staff Endpoint**
    - Get staff `GET /:storeId/staffs`
    - Create staff `POST /:storeId/staffs` - Only Owner can access
    - Get staff details `GET /:storeId/staffs/:staffId` - Only owner can access
    - Update staff details `PATCH /:storeId/staffs/:staffId` - Only owner can access
    - Delete staff `DELETE /:storeId/staffs/:staffId` - Only owner can access
    - Change or add Avatar `POST /:storeId/staffs/:staffId/avatar`
    - Change staff permission `PATCH /:storeId/staffs/:staffId/permission` - Only owner can access

#### Product service:

- Product Endpoint for the services `/api/products`
  - **Product Endpoint** (For public access)
    - Get all products `GET /`
    - Get products by category `GET /category/:category`
    - Get products by search `GET /search`
    - Get products by tags `GET /tags`
    - Get product by slug `GET /:slug`
  - **Product Endpoint** (For vendor access)
    - Get all products of vendor `GET /me`
    - Add new product `POST /`
    - Get product details `GET /:slug/details`
    - Update product `PATCH /:productId`
    - Delete product `DELETE /:productId`
    - Toggle product status `PATCH /:productId/status`
    - Add or update product images `POST /:productId/images`
    - Image show as primary `PATCH /:productId/images/:imgId/is-primary`
    - Change image order `PATCH /:productId/images/:imgId/order/:order`
    - Delete image of product `DELETE /:productId/images/:imgId`
    - Delete all images of product `DELETE /:productId/images`

#### Upload service:

- Upload Image Endpoint for the services `/api/uploads`
  - **Upload Endpoint** (For vendor access)
    - Upload single image `POST /`
    - Upload multiple images `POST /multiple`
    - Delete image `DELETE /:imageId`

## Directory Tree Structure

All the services are structured in a tree structure with the following structure:

```
.
├── .husky
├── apps
│   ├── api-gateway
│   ├── consumer-ui
│   ├── vendors-ui
│   └── vendor-ui
├── packages
│   ├── drizzle
│   ├── config (contains env variables)
│   ├── http (contains error handler middleware)
│   ├── lib (contains utils)
│   └── logger (contains logger)
├── services
│   ├── admin-service
│   ├── auth-service
│   ├── consumer-service
│   ├── products-service
│   ├── upload-service
│   └── vendor-service
├── scripts
│   ├── clean.sh
│   └── setup.sh
├── docker-compose.yml
├── tsconfig.json
├── turbo.json
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── README.md
```

## Api Endpoints Summary

| Endpoint       | Method | Description       |
| -------------- | ------ | ----------------- |
| /api/health    | GET    | Healthcheck       |
| /api/auth      | POST   | Auth Endpoint     |
| /api/consumers | POST   | Consumer Endpoint |
| /api/vendors   | POST   | Vendor Endpoint   |
| /api/products  | POST   | Product Endpoint  |
| /api/uploads   | POST   | Upload Endpoint   |

## View the services

You can deploy the services using docker.

**Clone the repository**

```bash
git clone https://github.com/subhajitpramanik007/marketly.git
```

**Install dependencies**

```bash
cd marketly

pnpm install
```

<!-- env variables -->

**Create .env file**

copy the .env.example file to .env

```bash
cp .env.example .env
```

You can add empty values to the .env file.
You can find the list of environment variables in the [env](./packages/config/src/env.ts) file.

**Run the services**

- **Run Locally**

```bash
# You can run the services locally using turbo.

pnpm dev
```

- **Run using Docker**

```bash
# You can run the services using docker. You can find the docker-compose file in the root directory.

docker-compose up -d
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

Happy Coding!
