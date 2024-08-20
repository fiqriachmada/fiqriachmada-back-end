const imageKitApi = require("../../configs/imageKitApi");
const db = require("../../models");
const crypto = require("crypto");

const worksModel = db.works;
const imagesModel = db.images;

const addWorkController = async (req, res) => {
  const { name, description } = req.body;
  const uuid = crypto.randomUUID();
  const fileData = req.file;

  // Validasi input
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    let uploadResponse = { fileId: null, url: null };

    if (fileData) {
      // Upload the file if it exists
      uploadResponse = await imageKitApi.upload({
        file: fileData.buffer,
        fileName: fileData.originalname,
        folder: "personal-website",
        extensions: [
          {
            name: "google-auto-tagging",
            maxTags: 5,
            minConfidence: 95,
          },
        ],
      });

      // Create the image entry
      await imagesModel.create({
        id: uploadResponse.fileId,
        workId: uuid,
        imageUrl: uploadResponse.url,
      });
    } else {
      // Create a placeholder image entry if no file is provided
      await imagesModel.create({
        id: uuid, // You can use the work ID or some other identifier here
        workId: uuid,
        imageUrl: null, // No URL since no image is provided
      });
    }

    // Create the work entry with imageId set to the appropriate value
    const works = await worksModel.create({
      id: uuid,
      name: name,
      description: description,
      imageId: fileData ? uploadResponse.fileId : uuid, // Set to uuid if no file
    });

    res.json({
      status: 200,
      message: "success",
      data: { ...works.dataValues },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error.message });
  }
};

module.exports = addWorkController;
