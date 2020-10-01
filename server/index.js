const path = require('path');
const express = require('express');
const app = express();

const { logger } = require('./startup/logging');
require('./startup/config')();
require('./startup/mongodb')();
require('./startup/routes')(app);

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
