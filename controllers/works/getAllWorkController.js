const imageModel = require("../../models/imageModels");
const workModel = require("../../models/workModels");

const getAllWorkController = async (req, res) => {
  try {
    const works = await workModel.findAll({
      include: [{ model: imageModel, as: "imageData", required: false }],
    });
    const data = { data: works.map((work) => work) };

    const sortingData = JSON.stringify(
      data.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    );
    const response = {
      status: 200,
      message: "success",
      data: sortingData.length > 0 ? JSON.parse(sortingData) : [],
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error }); // Handle error
  }
};

module.exports = getAllWorkController;
