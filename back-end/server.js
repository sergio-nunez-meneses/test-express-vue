const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const db = require('./app/models');
const thingRoutes = require('./app/routes/thingRoute');

var corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/things', thingRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'connection successful' });
});

db.sequelize.sync({ force: true })
  .then(async function() {
    const thing = await db.Thing.create({
      id: 1,
      title: 'Thing #1',
      description: 'This is my first Thing.',
      published: false,
    });

    if (!thing) {
      console.error('An error occurred while creating your Thing');
      return;
    }

    console.log('Database re-synced: Thing created successfully');
  });

app.listen(port, () => {
  console.log(`server is running on port ${port}.`);
});
