'use strict';

const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.API_PORT || 8888;

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('*', express.static(path.join(__dirname, 'dist')));

app.listen(PORT, () => {
  console.log(`frontend listening on ${PORT}`);
});
