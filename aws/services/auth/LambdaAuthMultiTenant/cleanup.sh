#!/bin/bash
echo "Starting cleanup."

# Check if jq is in the PATH
found=$(which jq)
if [ -z "$found" ]; then
  echo "Please install jq under your PATH: http://stedolan.github.io/jq/"
  exit 1
fi

# Ensure config.json exists
if [ ! -f config.json ]; then
	echo "config.json not found!"
	exit 1
fi

# Get config parmaters
echo "Loading config parameters"
REGION=$(jq -r '.REGION' config.json)
if [  -z "$REGION"  ]; then
	echo "config.json: REGION value is required, but missing!"
	exit 1
fi
