var express = require("express");

const multer = require("multer");

const addUserController = require("../../controllers/users/addUserController");

var addUserRouter = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

addUserRouter.post("/", upload.single("image"), addUserController);

module.exports = addUserRouter;
