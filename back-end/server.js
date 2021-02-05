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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/api/things', thingRoutes);

db.sequelize.sync({ force: true })
  .then(async function() {
    const description = (i) => {
      var j = i % 10;
      var k = i % 100;

      if (j === 1 && k !== 11) {
        return i + 'st';
      }
      if (j === 2 && k !== 12) {
        return i + 'nd';
      }
      if (j === 3 && k !== 13) {
        return i + 'rd';
      }
      return i + 'th';
    }

    for (let i = 0; i < 20; i++) {
      let thing = await db.Thing.create({
        id: i + 1,
        title: `Thing #${i + 1}`,
        description: `This is my ${description(i + 1)} thing.`,
        published: Math.random() >= 0.6 ? true : false
      });

      if (!thing) {
        console.error(`An error occurred while creating your Thing #${i + 1}`);
        return;
      }

      console.log(`Database re-synced: Thing #${i + 1} created successfully`);
    }
  });

app.listen(port, () => {
  console.log(`server is running on port ${port}.`);
});

app.get('/', (req, res) => {
  res.json({ message: 'connection successful' });
});
