var express = require("express");
const Work = require("../../models/workModels");
const multer = require("multer");
const imageKitApi = require("../../configs/imageKit");
const Image = require("../../models/imageModels");

var addWork = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

addWork.post("/", upload.single("image"), async function (req, res, next) {
  const { name, description } = req.body;
  const uuid = crypto.randomUUID();

  const fileData = req.file;

  const uploadResponse = await imageKitApi.upload({
    file: fileData.buffer,
    fileName: req.file.originalname,
    folder: "personal-website",
    extensions: [
      {
        name: "google-auto-tagging",
        maxTags: 5,
        minConfidence: 95,
      },
    ],
  });

  try {
    const works = await Work.create({
      id: uuid,
      name: name,
      description: description,
      imageId: uploadResponse.fileId,
    });
    const image = await Image.create({
      id: uploadResponse.fileId,
      // workId: works.id,
      url: uploadResponse.url,
    });
    const data = { data: { ...works.dataValues, ...image.dataValues } };
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

module.exports = addWork;
