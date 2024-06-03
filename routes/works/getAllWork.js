var express = require("express");
const Work = require("../../models/workModels");
const Image = require("../../models/imageModels");

var getAllWork = express.Router();

/* GET users listing. */
getAllWork.get("/", async function (req, res, next) {
  try {
    const works = await Work.findAll({
      // where: { imageId: imageId },
      include: [{ model: Image, as: "imageData", required: false }],
    });
    const data = { data: works.map((work) => work) };
    const response = {
      status: 200,
      message: "success",
      ...data,
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error }); // Handle error
  }
});

module.exports = getAllWork;
