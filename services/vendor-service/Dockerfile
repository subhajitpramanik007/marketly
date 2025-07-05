# --- Base Stage ---
FROM node:22-alpine3.21 AS base

WORKDIR /usr/src/app

RUN npm install -g pnpm

# --- Builder Stage ---
FROM base AS builder

# Copy independent files 
COPY pnpm-lock.yaml package.json ./

# Install only root dependencies
RUN pnpm install

# Copy files 
COPY pnpm-workspace.yaml tsconfig.base.json turbo.json ./
# Copy files of vendor-service
COPY ./services/vendor-service ./services/vendor-service

# Install vendor-service dependencies
RUN pnpm install --filter=vendor-service

# Copy packages
COPY --from=marketly-packages:latest /usr/src/app/packages ./packages
COPY --from=marketly-packages:latest /usr/src/app/node_modules ./node_modules

# Build vendor-service
RUN pnpm build --filter=vendor-service

# --- Final Stage ---
FROM node:22-alpine3.21 AS final

WORKDIR /usr/src/app/services/vendor-service

# Copy files of vendor-service
COPY --from=builder /usr/src/app/services/vendor-service/dist ./dist
COPY --from=builder /usr/src/app/services/vendor-service/package.json ./
COPY --from=builder /usr/src/app/services/vendor-service/node_modules ./node_modules

WORKDIR /usr/src/app

# Copy root files
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

EXPOSE 6002

CMD ["node", "./services/vendor-service/dist/server.js"]