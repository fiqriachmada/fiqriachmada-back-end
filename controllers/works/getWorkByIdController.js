const db = require("../../models");

const getWorkByIdController = async (req, res) => {
  const workModel = db.works;
  const imageModel = db.images;

  const id = req.params.id;

  try {
    const works = await workModel.findByPk(id, {
      include: [
        {
          model: imageModel,
          as: "imageData",
        },
      ],
    });
    const data = { data: works.dataValues };

    const response = {
      status: 200,
      message: "success",
      data: {
        id: data.data.id,
        name: data.data.name,
        description: data.data.description,
        startDate: data.data.startDate,
        endDate: data.data.endDate,
        imageId: data.data.imageId,
        createdAt: data.data.createdAt,
        updatedAt: data.data.updatedAt,
        imageUrl: data.data.imageData[0].imageUrl || null,
        imageData:
          data.data.imageData.length > 0
            ? {
                id: data.data.imageData[0].id,
                workId: data.data.imageData[0].workId,
                imageUrl: data.data.imageData[0].imageUrl,
                createdAt: data.data.imageData[0].createdAt,
                updatedAt: data.data.imageData[0].updatedAt,
              }
            : null,
      },
    };

    if (!response.data) {
      res
        .status(404)
        .json({ status: 404, message: "Data Not Found", data: [] });
    } else {
      res.json(response);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error });
  }
};

module.exports = getWorkByIdController;
