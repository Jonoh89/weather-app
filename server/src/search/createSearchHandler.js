const fetch = require("node-fetch");
const searchHandler = require("./searchHandler");
const responseFormatter = require("./responseFormatter");
const testLocations = require("./testLocations");

const apiKey = "281baf4878eca6fe3b2148e62545f139";

module.exports = function createSearchHandler () {
    return (res, req) => searchHandler({ fetch, apiKey, responseFormatter, testLocations })(res,req);
};
