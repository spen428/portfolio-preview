#!/bin/bash
set -x
set -e
source "$(dirname "$0")/common.sh"
export IMAGE_TAG="$COMMIT_HASH-test"

prune_volumes_and_networks
create_volumes $IMAGE_TAG
copy_to_container "$API_VOLUME" "$(dirname "$0")/../../api/res/dummy"

source "$(dirname "$0")/run-tests.step.sh"

docker image rm "portfolio-web:$IMAGE_TAG" "portfolio-api:$IMAGE_TAG"
docker volume rm -f "$API_VOLUME" "$WEB_VOLUME"
