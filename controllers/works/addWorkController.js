const imageKitApi = require("../../configs/imageKitApi");
const db = require("../../models");

const worksModel = db.works;
const imagesModel = db.images;

const addWorkController = async (req, res) => {
  const { name, description } = req.body;
  const uuid = crypto.randomUUID();

  const fileData = req.file;
  if (fileData) {
    try {
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

      const works = await worksModel.create({
        id: uuid,
        name: name,
        description: description,
        imageId: uploadResponse.fileId || uuid,
      });
      const image = await imagesModel.create({
        id: uploadResponse.fileId || uuid,
        workId: works.id,
        url: uploadResponse.url || "null",
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
      res.json(error.message || error);
    }
  } else {
    try {
      const works = await worksModel.create({
        id: uuid,
        name: name,
        description: description,
        imageId: uuid,
      });
      const image = await imagesModel.create({
        id: uuid,
        workId: works.id || uuid,
        url: "null",
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
      res.status(500).json({ error: "Internal Server Error: " + error });
    }
  }
};

module.exports = addWorkController;
