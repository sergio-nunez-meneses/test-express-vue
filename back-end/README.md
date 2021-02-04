# Test Express.js and Vue.js

For database connection:

- Change directory to ```app``` and run these lines in your terminal:

  ```
  mkdir config
  cd config
  touch config.json
  ```

- Enter your database informations:

  ```js
  {
    "development": {
      "username": "",
      "password": "",
      "database": "database_development",
      "host": "127.0.0.1",
      "port": "", // optional
      "dialect": "mysql"
    },
    "test": {
      "username": "",
      "password": "",
      "database": "database_test",
      "host": "127.0.0.1",
      "port": "", // optional
      "dialect": "mysql"
    },
    "production": {
      "username": "",
      "password": "",
      "database": "database_production",
      "host": "127.0.0.1",
      "port": "", // optional
      "dialect": "mysql"
    }
  }
  ```
