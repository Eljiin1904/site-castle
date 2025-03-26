#!/bin/bash

install() {

  wget -O yq https://github.com/mikefarah/yq/releases/download/v4.22.1/yq_linux_amd64
  if test $? -ne 0; then
    echo "Failed to install yq"
    return 1
  fi

  sudo chmod +x yq

}

install
