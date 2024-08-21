const imageKitApi = require("../../configs/imageKitApi");
const db = require("../../models");

const worksModel = db.works;
const imagesModel = db.images;

const deleteWorkByIdController = async (req, res) => {
  const id = req.params.id;

  // Validate input
  if (!id) {
    return res.status(400).json({
      status: 400,
      message: "ID is required",
      data: [],
    });
  }

  const transaction = await db.sequelize.transaction();

  try {
    // Find the work record
    const work = await worksModel.findByPk(id, { transaction });

    if (!work) {
      await transaction.rollback();
      return res.status(404).json({
        status: 404,
        message: "Data Not Found",
        data: [],
      });
    }

    // Find the associated image if exists
    const image = await imagesModel.findOne({
      where: { workId: id },
      transaction,
    });

    if (image.imageUrl) {
      // Delete the image from ImageKit
      await imageKitApi.deleteFile(image.id);
    }
    // Remove the image record from the database
    await imagesModel.destroy({
      where: { id: image.id },
      transaction,
    });

    // Delete the work record
    await worksModel.destroy({
      where: { id: id },
      transaction,
    });

    await transaction.commit();

    res.json({
      status: 200,
      message: "Success",
      data: [],
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      status: 500,
      message: error.message || "Internal Server Error",
      data: [error.message],
    });
  }
};

module.exports = deleteWorkByIdController;
