require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { urlServer } = require('./utils/constants');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-determinant');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { apiLimiter } = require('./middlewares/limiter');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect(urlServer);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(requestLogger);
app.use(apiLimiter);

app.get('/', (req, res) => res.send('It\'s working!'));
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
