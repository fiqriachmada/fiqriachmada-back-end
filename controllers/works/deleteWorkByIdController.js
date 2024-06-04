const imageKitApi = require("../../configs/imageKitApi");
const imageModel = require("../../models/imageModels");
const workModel = require("../../models/workModels");

const deleteWorkByIdController = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  const selectedImage = await imageModel.findOne({ where: { workId: id } });
  console.log("selectedImage", selectedImage);
  const selectedImageId = selectedImage?.dataValues?.id;
  console.log("selectedImageId", selectedImageId);
  const selectedImageUrl = selectedImage?.dataValues?.url;
  if (!selectedImageId) {
    res.status(404).json({
      status: 404,
      message: "Data Not Found",
      data: [],
    });
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
        .json({ error: "Internal Server Error: " + error.message || error }); // Handle error
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
      res.status(500).json({ error: "Internal Server Error: " + error }); // Handle error
    }
  }
};

module.exports = deleteWorkByIdController;
