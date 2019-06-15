const path = require('path');
const express = require('express');
const app = express();

const distDir = '../../dist/';
app.use(express.static(path.join(__dirname, distDir)))
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, distDir + '/index.html'));
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API router
app.use('/api/', require('../routes'));

module.exports = app;