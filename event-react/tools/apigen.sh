#!/bin/bash

if [ -z "$ZIGZAG_SERVER_ROOT" ]; then
  echo ''
  echo 'Please SET environment ZIGZAG_SERVER_ROOT to zigzag-server repository path.'
  echo '        Usage) export ZIGZAG_SERVER_ROOT=/xxx/yyyy; npm run apigen'
  echo '               ZIGZAG_SERVER_ROOT=/xxx/yyyy npm run apigen'
  echo '               set ZIGZAG_SERVER_ROOT variables to your terminal load scripts, `~/.zshrc` or `~/.bash_profile` '
  echo ''
  exit 2
fi

APP_DIR=src
API_DIR=$APP_DIR/api
SCRIPT_DIR=`dirname "${BASH_SOURCE[0]}"`
CURRENT=`pwd`
SERVICE=api2
TYPE_FILENAME=$API_DIR/types.ts

./node_modules/.bin/ts-node --project tools/tsconfig.json $SCRIPT_DIR/apigen.ts
if [ $? -ne 0 ]; then
  exit 0;
fi
echo "  ✔ "$API_DIR/index.ts was generated.

(cd $ZIGZAG_SERVER_ROOT/services/$SERVICE ; ./node_modules/.bin/ts-node --transpile-only ./tools/generate_graphql_introspection.ts $CURRENT/$SERVICE-tmp.json)
./node_modules/.bin/apollo codegen:generate $TYPE_FILENAME --queries=$APP_DIR/**/*.graphql \
  --no-addTypename --passthroughCustomScalars --localSchemaFile $SERVICE-tmp.json --target typescript --outputFlat
./node_modules/.bin/ts-node --project tools/tsconfig.json $SCRIPT_DIR/apigen-type-convert $TYPE_FILENAME
rm $CURRENT/$SERVICE-tmp.json
echo "  ✔ "$TYPE_FILENAME was generated.
