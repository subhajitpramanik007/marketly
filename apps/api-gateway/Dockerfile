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

# Copy files of api-gateway
COPY ./apps/api-gateway ./apps/api-gateway

# Install api-gateway dependencies
RUN pnpm install --filter=api-gateway

# Copy packages
COPY --from=marketly-packages:latest /usr/src/app/packages ./packages
COPY --from=marketly-packages:latest /usr/src/app/node_modules ./node_modules

# Build api-gateway
RUN pnpm build --filter=api-gateway


# --- Final Stage ---
FROM node:22-alpine3.21 AS final

WORKDIR /usr/src/app/apps/api-gateway

# Copy files
COPY --from=builder /usr/src/app/apps/api-gateway/dist ./dist
COPY --from=builder /usr/src/app/apps/api-gateway/package.json ./package.json
COPY --from=builder /usr/src/app/apps/api-gateway/node_modules ./node_modules

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

EXPOSE 8080

CMD ["node", "./apps/api-gateway/dist/app.js"]
