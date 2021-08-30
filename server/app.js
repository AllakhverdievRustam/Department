const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json({ extended: true }));
app.use(cors());

const apiRoutes = require("./src/modules/routes/routes");

app.use("/", apiRoutes);

mongoose.connect(config.get('dbConfig.urlMongo'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(config.get('dbConfig.port'), () => {
  console.log('Example app on port 4000!');
});
