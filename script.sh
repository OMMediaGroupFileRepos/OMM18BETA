#!/bin/bash

output=$(git log --oneline origin..)

if [[ -z "$output" ]]; then
  echo "0"
else
  echo "$output"
fi
