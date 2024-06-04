var express = require("express");

const workRouter = require("./works/workRouter");
var api = express();

api.use(workRouter);

module.exports = api;
