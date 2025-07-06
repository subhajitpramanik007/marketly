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

# Copy files of auth-service
COPY ./services/auth-service ./services/auth-service

# Install auth-service dependencies
RUN pnpm install --filter=auth-service

# Copy packages
COPY --from=marketly-packages:latest /usr/src/app/packages ./packages
COPY --from=marketly-packages:latest /usr/src/app/node_modules ./node_modules

# Build auth-service
RUN pnpm build --filter=auth-service


# --- Final Stage ---
FROM node:22-alpine3.21 AS final

WORKDIR /usr/src/app/services/auth-service

COPY --from=builder /usr/src/app/services/auth-service/dist ./dist
COPY --from=builder /usr/src/app/services/auth-service/package.json ./package.json
COPY --from=builder /usr/src/app/services/auth-service/node_modules ./node_modules

# Copy packages public files
COPY ./services/auth-service/public ./public

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

EXPOSE 5999

CMD ["node", "services/auth-service/dist/server.js"]
