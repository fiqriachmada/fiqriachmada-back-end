var express = require("express");

const multer = require("multer");

const updateWorkByIdController = require("../../controllers/works/updateWorkByIdController");

var updateWorkByIdRouter = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

updateWorkByIdRouter.put(
  "/:id",
  upload.single("image"),
  updateWorkByIdController
);

module.exports = updateWorkByIdRouter;
