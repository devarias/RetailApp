#!/usr/bin/env bash
sudo printf "Wait we are setting the virtual enviroment for you
this could take some seconds...\\n"
sudo pip3 install virtualenv &>/dev/null
virtualenv -p python3 venv &>/dev/null
. venv/bin/activate
