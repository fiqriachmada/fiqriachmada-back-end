const imageKitApi = require("../../configs/imageKitApi");
const db = require("../../models");

const worksModel = db.works;
const imagesModel = db.images;

const updateWorkByIdController = async (req, res) => {
  const { name, description, startDate, endDate } = req.body;
  const id = req.params.id;
  const fileData = req.file;

  // Validate input
  if (!id || !name) {
    return res.status(400).json({
      status: 400,
      message: "ID and Name are required",
      data: [],
    });
  }

  const transaction = await db.sequelize.transaction();

  try {
    // Update work entity
    const work = await worksModel.findByPk(id, { transaction });

    if (!work) {
      await transaction.rollback();
      return res.status(404).json({
        status: 404,
        message: "Data Not Found",
        data: [],
      });
    }

    // Get previous image if exists
    const previousImage = await imagesModel.findOne({
      where: { workId: id },
      transaction,
    });

    if (fileData) {
      // Delete previous image from ImageKit if exists
      previousImage.imageUrl &&
        (await imageKitApi.deleteFile(previousImage.id));

      const uploadResponse = await imageKitApi.upload({
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
      await imagesModel.destroy({
        where: { id: previousImage.id },
        transaction,
      });
      // Update image entity with new image
      await imagesModel.upsert(
        {
          id: uploadResponse.fileId,
          workId: id,
          imageUrl: uploadResponse.url,
        },
        { transaction }
      );
      await work.update(
        {
          name: name,
          description: description,
          imageId: uploadResponse.fileId,
          startDate,
          endDate,
        },
        { transaction }
      );
    } else {
      // Update work entity without new image
      await work.update(
        {
          name: name,
          description: description,
          startDate,
          endDate,
        },
        { transaction }
      );
    }

    await transaction.commit();

    // Get updated image data if exists
    const updatedImage = fileData
      ? await imagesModel.findByPk(work.imageId)
      : previousImage;

    res.json({
      status: 200,
      message: "Success",
      data: {
        ...work.dataValues,
        image: updatedImage ? updatedImage.dataValues : null,
      },
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      status: 500,
      message: error.message || "Internal Server Error",
      data: [{ error: error.message }],
    });
  }
};

module.exports = updateWorkByIdController;
