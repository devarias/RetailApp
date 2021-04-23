#!/usr/bin/env bash
start () {
    cd retail-app || exit
    DATABASE_URL=mysql://retail_user:Password123#@\!@localhost/retail_app ../retail-api/./main.py &>/dev/null & ./dependencies.sh && fg
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
    mysql -uroot -hlocalhost -p < sudo retail-api/sql/setupMySQL.sql
    mysql -uretail_user -hlocalhost -pPassword123#@! &>/dev/null < sudo retail-api/sql/retailDatabase.sql
    start
else
    start
fi
