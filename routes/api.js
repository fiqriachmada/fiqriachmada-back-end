var express = require("express");

const workRouter = require("./works/workRouter");
// const db = require('./../models/index')
var api = express();

api.use(workRouter);

module.exports = api;
