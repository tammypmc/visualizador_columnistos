#!/bin/bash -e

npm set progress=true

cd /usr/src/app && npm install

npm run build

exec "$@"

