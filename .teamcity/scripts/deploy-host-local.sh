#!/bin/bash
set -x
set -e
source "$(dirname "$0")/common.sh"

dc() {
  docker-compose --project-name "scripts" -f "$(dirname "$0")/compose.host-local.yml" "$@"
}

get_dev_dep_version() {
  local pkg="$1"
  node -e "console.log(require('../package.json').devDependencies['${pkg}'])"
}

export IMAGE_TAG="$COMMIT_HASH"
export NODE_VERSION="$(get_dev_dep_version "@types/node")"
export BACKSTOP_VERSION="$(get_dev_dep_version "backstopjs")"

dc build --no-cache \
  --build-arg NODE_VERSION="$NODE_VERSION" \
  --build-arg BACKSTOP_VERSION="$BACKSTOP_VERSION" || exit 5

if [ -z "$IMAGE_TAG" ]; then
  echo "You must export the IMAGE_TAG environment variable."
  exit 16
fi

dc up -d
