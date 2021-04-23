#!/usr/bin/env bash
sudo pip3 install virtualenv &>/dev/null
virtualenv -p python3 venv &>/dev/null
. venv/bin/activate
