var express = require("express");

const workRouter = require("./works/getAllWork");
const workRouterById = require("./works/getWorkById");
const deleteWorkById = require("./works/deleteWorkById");
const addWork = require("./works/addWork");
var api = express();

api.use("/work", workRouter);
api.use("/work", workRouterById);
api.use("/work", deleteWorkById);
api.use("/work", addWork);

module.exports = api;
