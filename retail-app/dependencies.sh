#!/usr/bin/env bash
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
GREEN='\033[0;32m'
NC='\033[0m'
function install_packages {
    sleep 1
    echo -e "${PURPLE}Initalizing the app${NC}"
    npm init -y &>/dev/null
    echo -e "${GREEN}npm installed${NC}"
    echo -e "${BLUE}Installing react package${NC}"
    npm i -S react &>/dev/null
    echo -e "${GREEN}react package installed${NC}"
    echo -e "${BLUE}Installing @auth0/auth0-react package${NC}"
    npm i -S @auth0/auth0-react &>/dev/null
    echo -e "${GREEN}@auth0/auth0-react package installed${NC}"
    echo -e "${BLUE}Installing react-router-dom package${NC}"
    npm i -S react-router-dom &>/dev/null
    echo -e "${GREEN}react-router-dom package installed${NC}"
    echo -e "${BLUE}Installing antd package${NC}"
    npm i -S antd &>/dev/null
    echo -e "${GREEN}antd package installed${NC}"
    echo -e "${BLUE}Installing axios package${NC}"
    npm i -S axios &>/dev/null
    echo -e "${GREEN}axios package installed${NC}"
    echo -e "${BLUE}Installing react-highlight-words package${NC}"
    npm i -S react-highlight-words &>/dev/null
    echo -e "${GREEN}react-highlight-words package installed${NC}"
    echo -e "${BLUE}Installing react-scripts package${NC}"
    npm i -S react-scripts &>/dev/null
    echo -e "${GREEN}react-scripts package installed${NC}"
    echo -e "${BLUE}Installing react-dom package${NC}"
    npm i -S react-dom &>/dev/null
    echo -e "${GREEN}react-dom package installed${NC}"
    echo -e "${BLUE}Installing web-vitals package${NC}"
    npm i -S web-vitals &>/dev/null
    echo -e "${GREEN}web-vitals package installed${NC}"
    sed -i '7i \\t\t"start": "react-scripts start",' package.json
    echo -e "${GREEN}Starting the App"
    echo -e "Y" | npm start
}
echo "Checking the node packages"
if [ -d "./node_modules/" ]
then
    rm -rf node_modules package.json package-lock.json
    install_packages
else
    install_packages
fi
