// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require("express");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const app = express();

// Express Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies with middle ware

// SERVING A STATIC FILE FOR HOME-PAGE
app.use(express.static('../front-end/public'));

// Routes for each Resource
const tournamentsRoutes = require("./routes/tournaments.js");
const usersRoutes = require("./routes/users.js");

// Mount all resource routes
app.use("/tournaments", tournamentsRoutes);
app.use("/users", usersRoutes);

// Define a catch-all route that will server the React app's index.html file for any other routes

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../front-end/public/index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
