# Ecommerce — Back-end Assignment
- Node.js + Express RESTFUL API backed by MySQL/MariaDB (via mysql2/promise).
- Front-end: https://github.com/xinhanlim/workoutDroplist-FE

## Features:
- Full `CRUD` functionality for `shopping cart` & `users`
- `Automated calculation` of `currency` when items quantity changes in cart
- Responsive UI for mobile web view
- User authentication with JWT-based login 

## Tech Stack:
- Frontend: React, Wouter, Jotai, Axios, Formik, Yup

- Backend: Node.js, Express, `Mysql2/Promise` , JWT, bcrypt, CORS, Stripe

- Dev & Build: Vite, Nodemon

## Getting Started:
1) Clone & install
```bash
git clone https://github.com/<you>/reactBEProject.git
cd reactBEProject
```
2) Environment variables
```bash
DB_HOST =localhost/127.0.0.1
DB_USER =root
DB_PASSWORD =mariadb
DB_NAME =ecommerce
PORT =3000
JWT_SECRET = <your_JWT_secret
STRIPE_SECRET_KEY = <your_stripe_key>
STRIPE_PUBLISHABLE_KEY = <your_stripe_key>
```

3) Create the database & import schema
```bash

# Allow execution permission to .sh file 
`chmod +x ./runmysql.sh`

# Create DB (ignore if exists)
mysql -u root -pmariadb -h 127.0.0.1 --ssl=0 -ecommerce  # "CREATE DATABASE IF NOT EXISTS ecommerce;"

# Import tables
mysql -u root -pmariadb -h 127.0.0.1 --ssl=0 ecommerce < schema.sql

# Import data
mysql -u root -pmariadb -h 127.0.0.1 --ssl=0 ecommerce < data.sql

```

Quick-check: (inside the mysql shell)

```bash
./runmysql.sh;
USE ecommerce;
SHOW TABLES;
SELECT * FROM products LIMIT 5;
```

4) Run Commands:
nodemon












``` bash
###  Using codespace
To login into the database, use `mysql -u root -pmariadb -h 127.0.0.1 --ssl=0`

## Allow execution permission to .sh file
`chmod +x ./runmysql.sh`

## Starting Up
nodemon index.js
```









### Environment Variables
Create a .env file (example below). Never commit secrets.
