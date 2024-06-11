var express = require("express");
const getAllWorkController = require("../../controllers/works/getAllWorkController");

var getAllWorkRouter = express.Router();

getAllWorkRouter.get("/", getAllWorkController);

module.exports = getAllWorkRouter;
