const express = require("express");
const app = express();
const logger = require("./src/logger");
const createSearchHandler = require("./src/search/createSearchHandler");
const port = 4000;

app.use(logger);
app.get("/api/search", createSearchHandler());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
