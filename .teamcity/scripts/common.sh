#!/bin/bash
export COMMIT_HASH="$(git log -n 1 --pretty=format:"%h")"

copy_to_container() {
  local volume="$1"
  local src="$2"

  local container
  container=$(docker run -d -v "$volume:/data" --entrypoint /bin/sh alpine -c "sleep infinity")
  docker cp "$src/." $container:/data
  docker stop $container
}

copy_from_container() {
  copy_to_container "$1" "$3" "$2"
}

create_volumes() {
  local suffix="$1"
  export API_VOLUME="$(docker volume create portfolio-api-$suffix)"
  export WEB_VOLUME="$(docker volume create portfolio-web-$suffix)"
  export VR_VOLUME="$(docker volume create portfolio-vr-$suffix)"
}

prune_volumes_and_networks() {
  docker volume prune -f
  docker network prune -f
}
