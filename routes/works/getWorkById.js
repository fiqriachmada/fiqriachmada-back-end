var express = require("express");
const Work = require("../../models/workModels");

var getWorkById = express.Router();

/* GET users listing. */
getWorkById.get("/:id", async function (req, res, next) {
  console.log("req.params.id", req.params.id);
  try {
    const works = await Work.findByPk(req.params.id);
    const data = { data: works };
    const response = {
      status: 200,
      message: "success",
      ...data,
    };

    if (!response.data) {
      res.json({ data: "No Data Found" });
    } else {
      res.json(response);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error }); // Handle error
  }
});

module.exports = getWorkById;
