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
    const thingDescriptions = [
      'This is my first thing.',
      'This is my second thing.',
      'This is my third thing.'
    ];

    for (let i = 0; i < thingDescriptions.length; i++) {
      let thing = await db.Thing.create({
        id: i + 1,
        title: `Thing #${i + 1}`,
        description: thingDescriptions[i],
        published: Math.random() >= 0.7 ? true : false
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
