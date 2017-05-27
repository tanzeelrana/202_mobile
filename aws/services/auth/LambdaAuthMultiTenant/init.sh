#!/bin/bash

# Read and set input options 
while getopts u:d:p:f:v: option
do
 case "${option}"
 in
 u) USER=${OPTARG};;
 d) DATE=${OPTARG};;
 p) PRODUCT=${OPTARG};;
 f) FORMAT=$OPTARG;;
 v) __VERBOSE=$OPTARG;;
 esac
done

# Set Log Level

declare -A LOG_LEVELS
LOG_LEVELS=([0]="emerg" [1]="alert" [2]="crit" [3]="err" [4]="warning" [5]="notice" [6]="info" [7]="debug")
function log () {
  local LEVEL=${1}
  shift
  if [ ${__VERBOSE} -ge ${LEVEL} ]; then
    echo "[${LOG_LEVELS[$LEVEL]}]" "$@"
  fi
}

# Run Script
log 6 "Starting init script...."

# Check if the AWS CLI is in the PATH
log 6 "Check if the AWS CLI is in the PATH...."
found=$(which aws)
if [ -z "$found" ]; then
  log 3 "Please install the AWS CLI under your PATH: http://aws.amazon.com/cli/"
  exit 1
fi

# Check if jq is in the PATH
found=$(which jq)
if [ -z "$found" ]; then
  log 3 "Please install jq under your PATH: http://stedolan.github.io/jq/"
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

#if a CLI Profile name is provided... use it.
if [[ ! -z "$CLI_PROFILE" ]]; then
  log 6 "Session CLI profile = [ $CLI_PROFILE ]"
  export AWS_DEFAULT_PROFILE=$CLI_PROFILE
fi

# Read Account ID configuration from config.json
AWS_ACCOUNT_ID=$(jq -r '.AWS_ACCOUNT_ID' config.json)
log 6 "Account ID : $AWS_ACCOUNT_ID"

# Read Bucket Name configuration from config.json
BUCKET=$(jq -r '.BUCKET' config.json)
log 6 "Bucket Name : $BUCKET"

# Create S3 Bucket
log 6 "Create S3 Bucket"
aws s3 mb s3://$BUCKET

