#!/bin/bash

echo " >> Setting up..."

ls

# Install dependencies
pnpm install

echo " ✅ Dependencies installed."

echo " ℹ️ Drizzle setup..."
# Drizzle setup
cd packages/drizzle
pnpm db:generate
pnpm db:migrate
pnpm db:push
cd ../

echo "Drizzle setup done."


echo ">> Building packages..."
# Build packages
pnpm build --filter=./packages/*

echo ">> Building services..."
# Build services
pnpm build --filter=./services/*

echo ">> Building apps..."
# Build apps
pnpm build --filter=./apps/*

# echo " 🔥 Apps built done."

echo " ✅ Done."