#!/bin/sh

set -eu

env_file=".vercel/.env.development.local"

if [ ! -f "$env_file" ]; then
  echo "Development environment is missing. Run: vercel pull --yes --environment=development" >&2
  exit 1
fi

set -a
. "./$env_file"
set +a

exec vercel dev "$@"
