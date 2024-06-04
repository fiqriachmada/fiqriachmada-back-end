const imageModel = require("../../models/imageModels");
const workModel = require("../../models/workModels");

const getWorkByIdController = async (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  try {
    const works = await workModel.findByPk(id, {
      include: [
        {
          model: imageModel,
          as: "imageData",
        },
      ],
    });
    const data = { data: works };
    const response = {
      status: 200,
      message: "success",
      ...data,
    };

    if (!response.data) {
      res
        .status(404)
        .json({ status: 404, message: "Data Not Found", data: [] });
    } else {
      res.json(response);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error }); // Handle error
  }
};

module.exports = getWorkByIdController;
