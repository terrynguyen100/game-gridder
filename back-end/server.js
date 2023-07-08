require('dotenv').config();

const express = require("express");
const app = express();
const BodyParser = require('body-parser');

const PORT = process.env.PORT;

// Express Configuration
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => console.log("Server listening at port 8080"));