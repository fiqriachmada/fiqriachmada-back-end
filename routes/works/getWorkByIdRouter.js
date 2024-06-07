var express = require("express");

const getWorkByIdController = require("../../controllers/works/getWorkByIdController");

var getWorkByIdRouter = express.Router();

getWorkByIdRouter.get("/:id", getWorkByIdController);

module.exports = getWorkByIdRouter;
