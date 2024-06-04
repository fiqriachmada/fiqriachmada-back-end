var express = require("express");

const multer = require("multer");

const addWorkController = require("../../controllers/works/addWorkController");

var addWorkRouter = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

addWorkRouter.post("/", upload.single("image"), addWorkController);

module.exports = addWorkRouter;
