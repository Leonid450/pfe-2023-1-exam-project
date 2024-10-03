const http = require('http');
// ============================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./dbMongo/mongoose');
const router = require('./router');
const controller = require('./socketInit');
const multerHandlerError = require('./handlerError/multerHandler');
const handlerError = require('./handlerError/handler');
const { DEV_FILES_PATH, PROD_FILES_PATH } = require('./constants');
const env = process.env.NODE_ENV || 'development';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  '/public',
  express.static(env === 'production' ? PROD_FILES_PATH : DEV_FILES_PATH)
);
app.use(router);

app.use(multerHandlerError);
app.use(handlerError);

const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`)
);
controller.createConnection(server);
