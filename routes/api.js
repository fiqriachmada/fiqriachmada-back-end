var express = require("express");

const workRouter = require("./works/workRouter");
const userRouter = require("./users/userRouter");
// const db = require('./../models/index')
var api = express();

api.use(workRouter);
api.use(userRouter);

module.exports = api;
