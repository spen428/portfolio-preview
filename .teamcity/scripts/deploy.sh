#!/bin/bash
PORTAINER_STACK_NAME="portfolio"
IMAGE_TAG="${IMAGE_TAG:-$(< image-tag.txt)}"

if [ -z "$PORTAINER_ACCESS_TOKEN" ]; then
  echo "You must export the PORTAINER_ACCESS_TOKEN environment variable."
  exit 19
fi

if [ -z "$CORS_ORIGINS" ]; then
  echo "You must export the CORS_ORIGINS environment variable."
  exit 18
fi

if [ -z "$VITE_API_URL" ]; then
  echo "You must export the VITE_API_URL environment variable."
  exit 17
fi

if [ -z "$IMAGE_TAG" ]; then
  echo "You must export the IMAGE_TAG environment variable."
  exit 16
fi

if [ -z "$PORTAINER_URL" ]; then
  echo "You must export the PORTAINER_URL environment variable."
  exit 15
fi

echo "Getting endpoints..."
endpoints="$(curl -X GET "$PORTAINER_URL/api/endpoints?excludeSnapshots=true" -H "X-API-Key: $PORTAINER_ACCESS_TOKEN")"
echo "$endpoints"
PORTAINER_ENDPOINT_ID=$(node -e "console.log(JSON.parse('$endpoints')[0].Id);")
echo "We will deploy to endpointId $PORTAINER_ENDPOINT_ID"

echo "Getting stacks..."
stacks=$(curl -X GET "$PORTAINER_URL/api/stacks" -H "X-API-Key: $PORTAINER_ACCESS_TOKEN")
echo "$stacks"

if [ "$stacks" != "[]" ]; then
  echo "Deleting stack..."
  stackId=$(node -e "console.log(JSON.parse('$stacks')[0].Id);")
  endpointId=$(node -e "console.log(JSON.parse('$stacks')[0].EndpointId);")
  status_code=$(curl -w '%{http_code}' -o body.txt -X DELETE "$PORTAINER_URL/api/stacks/$stackId?endpointId=$endpointId" \
     -H "X-API-Key: $PORTAINER_ACCESS_TOKEN")
  cat body.txt && rm body.txt
  if [ "$status_code" -ge 400 ]; then
    echo "curl returned HTTP $status_code"
    exit 3
  fi
  echo "Successfully deleted existing stack $stackId"
fi

echo "Creating stack '$PORTAINER_STACK_NAME' on endpoint $PORTAINER_ENDPOINT_ID..."

# shellcheck disable=SC2016
sed 's#${IMAGE_TAG}#'"${IMAGE_TAG}#" "$(dirname "$0")/compose.host.yml" \
  | sed 's#$VITE_API_URL#'"${VITE_API_URL}#" \
  | sed 's#$CORS_ORIGINS#'"${CORS_ORIGINS}#" > compose.yml

echo "Deploying the following docker-compose body:"
cat compose.yml

status_code=$(curl -w '%{http_code}' -o body.txt -X POST "$PORTAINER_URL/api/stacks/create/standalone/file?endpointId=$PORTAINER_ENDPOINT_ID" \
   -H "X-API-Key: $PORTAINER_ACCESS_TOKEN" \
   -F "Name=$PORTAINER_STACK_NAME" \
   -F "Env=[{\"name\":\"IMAGE_TAG\",\"value\":\"$IMAGE_TAG\"}]" \
   -F "file=@compose.yml")

rm compose.yml
cat body.txt && rm body.txt
if [ "$status_code" -ge 400 ]; then
  echo "curl returned HTTP $status_code"
  exit 4
fi

echo "Deployment complete"
