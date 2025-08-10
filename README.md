# mysql-codespace-devcontainer

## Using codespace
To login into the database, use `mysql -u root -pmariadb -h 127.0.0.1`

## Allow execution permission to .sh file
`chmod +x ./runmysql.sh`

## Starting Up
nodemon index.js

### Environment Variables
Create a .env file (example below). Never commit secrets.

```bash
DB_HOST =localhost
DB_USER =root
DB_PASSWORD =mariadb
DB_NAME =ecommerce
PORT =3000
JWT_SECRET = c517a2e4d3fa112b63d47f495d8d9ebe
STRIPE_SECRET_KEY = sk_test_51RlTnrC0S3zOx85LSu3l7oapVMJ2aYjCGmsSrX3vRvo1TKVUA6ah9KgMrnhogcfBhJdq6OgPy0kXwHPyvWDplw6G00N8CxyTL3
STRIPE_PUBLISHABLE_KEY = pk_test_51RlTnrC0S3zOx85LuooxiaBd10bRayttcHdIjtOi373rbNneQWgRPBoWzBqG0tE8oMyKYCUSC6SmsvVjNtESZvIM00EvZgFOPC
