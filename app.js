const express = require('express');
const mongoose = require('mongoose');

const { urlServer } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect(urlServer);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
