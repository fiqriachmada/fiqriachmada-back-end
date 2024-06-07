const imageKitApi = require("../../configs/imageKitApi");
const db = require("../../models");

const updateWorkByIdController = async (req, res) => {
  const { name, description, startDate, endDate } = req.body;

  const id = req.params.id;

  const fileData = req.file;

  const workModel = db.works;
  const imageModel = db.images;

  const selectedWork = await workModel.findOne({ where: { id: id } });
  const selectedImage = await imageModel.findOne({ where: { workId: id } });

  const selectedImageUrl = selectedImage?.dataValues?.url;

  if (selectedWork) {
    if (fileData) {
      if (!selectedImage.url) {
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

        try {
          await workModel.update(
            {
              name: name,
              description: description,
              imageId: uploadResponse.fileId,
              startDate: startDate,
              endDate: endDate,
            },
            { where: { id: id } }
          );
          await imageModel.update(
            {
              id: uploadResponse.fileId,
              imageUrl: uploadResponse.url,
            },
            { where: { workId: id } }
          );

          const data = {
            id: id,
            name: name,
            imageId: uploadResponse.fileId,
            imageUrl: uploadResponse.url,
            description: description,
            startDate: startDate,
            endDate,
          };

          const response = {
            status: 200,
            message: "success",
            data: data,
          };

          if (!response.data) {
            res.status(500).json({
              status: 404,
              message: "No Data Found",
              data: [],
            });
          } else {
            res.json(response);
          }
        } catch (error) {
          res.status(500).json({ error: "Internal Server Error: " + error });
        }
      } else if (selectedImage.url !== "null" && selectedImage.id) {
        await imageKitApi.deleteFile(selectedImage.id);
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

        try {
          await workModel.update(
            {
              name: name,
              description: description,
              imageId: uploadResponse.fileId,
              startDate: startDate,
              endDate: endDate,
            },
            { where: { id: id } }
          );
          await imageModel.update(
            {
              id: uploadResponse.fileId,
              imageUrl: uploadResponse.url,
            },
            { where: { workId: id } }
          );

          const data = {
            id: id,
            name: name,

            imageId: uploadResponse.fileId,
            imageUrl:uploadResponse.url,
            description: description,
            startDate: startDate,
            endDate,
          };

          const response = {
            status: 200,
            message: "success",
            data: data,
          };

          if (!response.data) {
            res.status(500).json({
              status: 404,
              message: "No Data Found",
              data: [],
            });
          } else {
            res.json(response);
          }
        } catch (error) {
          res.status(500).json({ error: "Internal Server Error: " + error });
        }
      }
    } else {
      try {
        await workModel.update(
          {
            name: name,
            description: description,
            startDate: startDate,
            endDate: endDate,
          },
          { where: { id: id } }
        );

        const data = {
          id: id,
          ...req.body,
        };

        const response = {
          status: 200,
          message: "success",
          data: data,
        };

        res.json(response);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error: " + error });
      }
    }
  } else {
    res.status(404).json({
      status: 404,
      message: "No Data Found",
      data: [],
    });
  }
};

module.exports = updateWorkByIdController;
