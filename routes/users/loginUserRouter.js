var express = require("express");

const loginUserController = require("../../controllers/users/loginUserController");

var loginUserRouter = express.Router();

loginUserRouter.post("/login", loginUserController);

module.exports = loginUserRouter;
