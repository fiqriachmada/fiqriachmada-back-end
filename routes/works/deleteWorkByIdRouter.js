var express = require("express");
const deleteWorkByIdController = require("../../controllers/works/deleteWorkByIdController");

var deleteWorkByIdRouter = express.Router();

deleteWorkByIdRouter.delete("/:id", deleteWorkByIdController);

module.exports = deleteWorkByIdRouter;
