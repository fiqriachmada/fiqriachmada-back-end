const imageKitApi = require("../../configs/imageKitApi");
const db = require("../../models");

const deleteWorkByIdController = async (req, res) => {
  const { id } = req.params;

  const workModel = db.works;
  const imageModel = db.images;

  const selectedImage = await imageModel.findOne({ where: { workId: id } });

  const selectedImageId = selectedImage?.dataValues?.id;

  const selectedImageUrl = selectedImage?.dataValues?.url;

  if (!selectedImageId) {
    res.status(404).json({
      status: 404,
      message: "Data Not Found",
      data: [],
    });

    // } else if (selectedImageUrl === "null") {
    //   try {
    //     await workModel.destroy({ where: { id: id } });
    //     await imageModel.destroy({ where: { workId: id } });
    //     const data = { data: selectedImage };
    //     const response = {
    //       status: 200,
    //       message: "success",
    //       ...data,
    //     };

    //     res.json(response);
    //   } catch (error) {
    //     res
    //       .status(500)
    //       .json({ error: "Internal Server Error: " + error.message || error });
    //   }
  } else if (selectedImageUrl) {
    try {
      await imageKitApi.deleteFile(selectedImageId);
      await workModel.destroy({ where: { id: id } });
      await imageModel.destroy({ where: { workId: id } });
      const data = { data: selectedImage };
      const response = {
        status: 200,
        message: "success",
        ...data,
      };

      res.json(response);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error: " + error.message || error });
    }
  } else {
    try {
      await workModel.destroy({ where: { id: id } });
      await imageModel.destroy({ where: { workId: id } });
      const data = { data: selectedImage };

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

module.exports = deleteWorkByIdController;
