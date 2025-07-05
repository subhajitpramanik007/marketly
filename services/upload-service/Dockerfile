# --- Base Stage ---
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
COPY ./services/upload-service ./services/upload-service

# Install upload-service dependencies
RUN pnpm install --filter=upload-service

# Copy packages
COPY --from=marketly-packages:latest /usr/src/app/packages ./packages
# Copy node_modules from marketly-packages not overwritten if file not exists then copy
COPY --from=marketly-packages:latest /usr/src/app/node_modules ./node_modules

# Build upload-service
RUN pnpm build --filter=upload-service

# --- Final Stage ---
FROM node:22-alpine3.21 AS final

WORKDIR /usr/src/app/services/upload-service

COPY --from=builder /usr/src/app/services/upload-service/dist ./dist
COPY --from=builder /usr/src/app/services/upload-service/node_modules ./node_modules
COPY --from=builder /usr/src/app/services/upload-service/package.json ./

WORKDIR /usr/src/app

# Copy files
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./


EXPOSE 7000

CMD ["node", "./services/upload-service/dist/app.js"]