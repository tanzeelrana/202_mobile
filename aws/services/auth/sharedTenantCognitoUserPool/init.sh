#!/bin/bash

# Check if the AWS CLI is in the PATH
found=$(which aws)
if [ -z "$found" ]; then
  echo "Please install the AWS CLI under your PATH: http://aws.amazon.com/cli/"
  exit 1
fi

# Check if jq is in the PATH
found=$(which jq)
if [ -z "$found" ]; then
  echo "Please install jq under your PATH: http://stedolan.github.io/jq/"
  exit 1
fi

# Read other configuration from config.json
AWS_ACCOUNT_ID=$(jq -r '.AWS_ACCOUNT_ID' config.json)
CLI_PROFILE=$(jq -r '.CLI_PROFILE // empty' config.json)
REGION=$(jq -r '.REGION' config.json)
BUCKET=$(jq -r '.BUCKET' config.json)
MAX_AGE=$(jq -r '.MAX_AGE' config.json)
DDB_TABLE=$(jq -r '.DDB_TABLE' config.json)
IDENTITY_POOL_NAME=$(jq -r '.IDENTITY_POOL_NAME' config.json)
DEVELOPER_PROVIDER_NAME=$(jq -r '.DEVELOPER_PROVIDER_NAME' config.json)
USER_POOL_NAME=$(jq -r '.USER_POOL_NAME' config.json)

#if a CLI Profile name is provided... use it.
if [[ ! -z "$CLI_PROFILE" ]]; then
  echo "setting session CLI profile to $CLI_PROFILE"
  export AWS_DEFAULT_PROFILE=$CLI_PROFILE
fi

echo "user pool name is : $USER_POOL_NAME"