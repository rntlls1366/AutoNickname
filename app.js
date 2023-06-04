const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const mainRouter = require('./route/main');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3005);

app.use('/', mainRouter)

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
