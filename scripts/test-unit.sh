#!/usr/bin/env bash
set -e

OPTIONS=(
  # Run in band causes tests to run serially and fixes an error when tests are
  # run on CircleCI: https://github.com/facebook/jest/issues/8769
  --runInBand
)

jest --testMatch='<rootDir>/test/unit/**/*.ts' "${OPTIONS[@]}" "${@}"
