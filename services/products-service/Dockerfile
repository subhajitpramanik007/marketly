# --- Base stage ---
FROM node:22-alpine3.21 AS base

WORKDIR /usr/src/app

RUN npm install -g pnpm

# --- Builder Stage ---
FROM base AS builder

# Copy files
COPY pnpm-lock.yaml package.json ./

# Install only root dependencies
RUN pnpm install

# Copy files
COPY pnpm-workspace.yaml tsconfig.base.json turbo.json ./

# Copy files of products-service
COPY ./services/products-service ./services/products-service

# Install products-service dependencies
RUN pnpm install --filter=products-service

# Copy packages
COPY --from=marketly-packages:latest /usr/src/app/packages ./packages
COPY --from=marketly-packages:latest /usr/src/app/node_modules ./node_modules

# Build products-service
RUN pnpm build --filter=products-service


# --- Final Stage ---
FROM node:22-alpine3.21 AS final

WORKDIR /usr/src/app/services/products-service

COPY --from=builder /usr/src/app/services/products-service/dist ./dist
COPY --from=builder /usr/src/app/services/products-service/package.json ./package.json
COPY --from=builder /usr/src/app/services/products-service/node_modules ./node_modules

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

EXPOSE 6004

CMD ["node", "services/products-service/dist/server.js"]
