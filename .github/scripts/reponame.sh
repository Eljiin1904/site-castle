#!/bin/bash
CLEAN_SSH_REPO="$(git remote get-url --push origin | sed -e 's#git@\(.*\)\.git#\1#g')"
echo "${GITHUB_REPO:-$CLEAN_SSH_REPO}" | cut -d '/' -f 2
