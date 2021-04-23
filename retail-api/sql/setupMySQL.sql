DROP DATABASE IF EXISTS retail_app;
CREATE DATABASE IF NOT EXISTS retail_app;
CREATE USER IF NOT EXISTS 'retail_user'@'localhost' IDENTIFIED BY 'Password123#@!';
GRANT ALL PRIVILEGES ON `retail_app`.* TO 'retail_user'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'retail_user'@'localhost';
FLUSH PRIVILEGES;