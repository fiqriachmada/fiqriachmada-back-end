var express = require("express");
const Work = require("../../models/workModels");

var deleteWorkById = express.Router();

/* GET users listing. */
deleteWorkById.delete("/:id", async function (req, res, next) {
  console.log("req.params.id", req.params.id);
  try {
    const works = await Work.destroy({ where: { id: req.params.id } });
    const data = { data: works };
    const response = {
      status: 200,
      message: "success",
      ...data,
    };
    console.log('data', data)

    if (!response.data) {
      res.json({ data: "No Data Found" });
    } else {
      res.json(response);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error }); // Handle error
  }
});

module.exports = deleteWorkById;
