const express = require("express");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3030;

app.get("/", (req, res) => res.send(`Hello World!`));

app.listen(PORT, () => console.log(`GraphQL listening on port ${PORT}!`));
