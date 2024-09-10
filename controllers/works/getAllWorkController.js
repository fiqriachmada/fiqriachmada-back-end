const db = require("../../models");

const getAllWorkController = async (req, res) => {
  const workModel = db.works;
  const imageModel = db.images;
  try {
    const works = await workModel.findAll({
      include: [{ model: imageModel, as: "imageData", required: false }],
    });
    // const data = {
    //   data: works.map((work) => {
    //     return {
    //       id: work.id,
    //       name: work.name,
    //       description: work.description,
    //       startDate: work.startDate,
    //       endDate: work.endDate,
    //       imageId: work.imageId,
    //       createdAt: work.createdAt,
    //       updatedAt: work.updatedAt,
    //       imageUrl: work.imageData[0].imageUrl || null,
    //       imageData:
    //         work.imageData.length > 0
    //           ? {
    //               id: work.imageData[0].id,
    //               workId: work.imageData[0].workId,
    //               imageUrl: work.imageData[0].imageUrl,
    //               createdAt: work.imageData[0].createdAt,
    //               updatedAt: work.imageData[0].updatedAt,
    //             }
    //           : null,
    //     };
    //   }),
    // };

    // const sortingData = JSON.stringify(
    //   data.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    // );
    const response = {
      status: 200,
      message: "success",
      // data: sortingData.length > 0 ? JSON.parse(sortingData) : [],
      data: works,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error: " + error });
  }
};

module.exports = getAllWorkController;
