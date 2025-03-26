lasttag.sh#!/bin/bash

version() {
  LAST_TAG=$(.github/scripts/lasttag.sh)
  Z_VERSION=$(echo "$LAST_TAG" | cut -d '.' -f 3)
  Y_VERSION=$(echo "$LAST_TAG" | cut -d '.' -f 2)
  X_VERSION=$(echo "$LAST_TAG" | cut -d '.' -f 1)
  INC_Z=$((Z_VERSION + 1))
  CONTROL_VER="$X_VERSION.$Y_VERSION.$INC_Z"
  echo "$CONTROL_VER"
}

version
