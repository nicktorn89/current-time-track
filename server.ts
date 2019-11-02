require('dotenv/config');
import express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/controllers/index');
const request = require('request-promise');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(router);

const server = app.listen(3001);
console.log('---- Server was started on port 3001 ----');
server.timeout = 900000;

let requestCount = 0;

setInterval(() => {
  request('http://localhost:3001/api/task')
    .then((data: any) => {
      requestCount += 1;

      console.log('Request count is -', requestCount, 'Data: ', data);
    })
    .catch((err: any) => {
      console.error(err);

      requestCount = 0;
    });
}, 5000);
