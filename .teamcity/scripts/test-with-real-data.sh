#!/bin/bash
set -x
set -e
source "$(dirname "$0")/common.sh"
export IMAGE_TAG="$COMMIT_HASH"

prune_volumes_and_networks
create_volumes $IMAGE_TAG
copy_to_container "$API_VOLUME" "$(dirname "$0")/../../shared/res/api" "/data"
copy_to_container "$WEB_VOLUME" "$(dirname "$0")/../../shared/res/web" "/assets"

source "$(dirname "$0")/run-tests.step.sh"

cd "$(dirname "$0")/../.." || exit 76
pwd
echo "$IMAGE_TAG" > "image-tag.txt"
mkdir new_reference
cp web/visual_regressions/bitmaps_test/*/* new_reference/
rm -fv new_reference/report.json new_reference/failed_diff*
