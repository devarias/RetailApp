#!/usr/bin/env bash
start () {
    cd retail-app || exit
    if [[ $option -eq 1 ]]
    then
        DATABASE_URL=mysql://retail_user:Password123#@\!@localhost/retail_app ../retail-api/./main.py &>/dev/null & ./dependencies.sh
    else
        DATABASE_URL=mysql://retail_user:Password123#@\!@localhost/retail_app ../retail-api/./main.py &>/dev/null & npm start
    fi
}

printf "If this is your first time.
Install the app and it will run automatically,
otherwise you can start the app.

Select the option to start
1. Install the app
2. Start the app    "
read -r option
if [[ $option -eq 1 ]]
then
    pip3 install -r retail-api/requirements.txt &>/dev/null
    echo "Please provide the password to access to mysql"
    mysql -uroot -hlocalhost -p < retail-api/sql/setupMySQL.sql
    mysql -uretail_user -hlocalhost -pPassword123#@! &>/dev/null < retail-api/sql/retailDatabase.sql
    start "${option}"
else
    start "${option}"
fi
