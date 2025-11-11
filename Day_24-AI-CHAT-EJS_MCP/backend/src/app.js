
const express = require('express');

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

module.exports = app;
