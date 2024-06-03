var express = require("express");
const Work = require("../models/workModels");
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
   try {
     const works = await Work.findAll();
     res.json({ works }); // Send retrieved works in the response
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: "Internal Server Error" }); // Handle error
   }
  // res.json({
  //   api: [
  //     { version: "1", description: "This is the first version of the API" },
  //   ],
  // });
});

module.exports = router;
