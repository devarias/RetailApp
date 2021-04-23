#!/usr/bin/env bash
function install_packages {
    npm init -y
    npm i -S react
    npm i -S @auth0/auth0-react
    npm i -S react-router-dom
    npm i -S antd
    npm i -S axios
    npm i -S react-highlight-words
    npm i -S react-scripts
    npm i -S react-dom
    npm i -S web-vitals
    sed -i '7i \\t\t"start": "react-scripts start",' package.json
    echo "Y" | npm start
}

if [ -d "./node_modules/" ]
then
    rm -rf node_modules package.json package-lock.json
    install_packages
else
    install_packages
fi
