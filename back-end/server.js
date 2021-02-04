const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const db = require('./app/models');

var corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'connection successful' });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}.`);
});

db.sequelize.sync({ force: true })
  .then(() => {
    console.log('database dropped and re-synced');
  });
