# Test Express.js and Vue.js

REST API built in Express.js and CRUD application with Vue.js, based on this [Bezkoder tutorial](https://bezkoder.com/vue-js-node-js-express-mysql-crud-example/), for pedagogical purposes only.

### Back-end

Installed dependencies:

```
npm install nodemon express sequelize mysql2 express-async-handler cors body-parser joi fs --save
```

Database and models have been created using [Sequelize CLI](https://www.npmjs.com/package/sequelize-cli).

For database connection, inside the ```back-end``` directory, change directory to ```app``` and run the following lines:

```
mkdir config
cd config
touch config.json
```

Then, edit the ```config.json``` file with your database information:

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

### Front-end

Base project has been created using [Vue CLI](https://cli.vuejs.org/) as follows:

```
vue create front-end
```

Installed dependencies are:

```
npm install vue-router axios --save
```
