#!/usr/bin/env bash
start () {
    cd retail-app
    DATABASE_URL=mysql://retail_user:Password123#@\!@localhost/retail_app ../retail-api/./main.py &>/dev/null & ./dependencies.sh && fg
}
printf "If this is your first time.
Install the app and it will run automatically,
otherwise you can start the app.\n\nSelect the option to start
\n1. Install the app\n2. Start the app\t"
read option
if [ $option -eq 1 ]
then
    cat retail-api/sql/setupMySQL.sql | sudo mysql -uroot -hlocalhost -p
    cat retail-api/sql/retailDatabase.sql | sudo mysql -uretail_user -hlocalhost -pPassword123#@! &>/dev/null
    start
else
    start
fi
