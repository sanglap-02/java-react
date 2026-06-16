#!/usr/bin/env bash
# Starts the React (Vite) dev server on http://localhost:3000
set -euo pipefail
cd "$(dirname "$0")"
if [ ! -d node_modules ]; then
  echo "Installing dependencies (first run)..."
  npm install
fi
exec npm run dev
