#!/bin/bash

echo "Cleaning Turbo cache and build artifacts..."

ls

# Remove Turbo's internal cache
rm -rf ../.turbo

echo "Turbo cache cleaned."

# node_modules
rm -rf ../node_modules
rm -rf ../pnpm-lock.yaml

echo "node_modules cleaned."

# Clean inside apps/* if using a monorepo
find ../apps -type d \( -name .turbo -o -name .next -o -name node_modules -o -name dist -o -name build -o -name out \) -exec rm -rf {} +

echo "Apps cleaned."

# Clean inside packages/* if using a monorepo
find ../packages -type d \( -name .turbo -o -name node_modules -o -name dist -o -name build -o -name out \) -exec rm -rf {} +

echo "Packages cleaned."

# Clean inside services/* if using a monorepo
find ../services -type d \( -name .turbo -o -name node_modules -o -name dist -o -name build -o -name out \) -exec rm -rf {} +

echo "Services cleaned."

echo "Clean complete."
