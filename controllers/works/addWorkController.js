const imageKitApi = require("../../configs/imageKitApi");
const db = require("../../models");
const crypto = require("crypto");

const worksModel = db.works;
const imagesModel = db.images;

// const addWorkController = async (req, res) => {
//   const { name, description } = req.body;
//   const uuid = crypto.randomUUID();
//   const fileData = req.file;

//   try {
//     let uploadResponse = { fileId: uuid, url: null };

//     if (fileData) {
//       uploadResponse = await imageKitApi.upload({
//         file: fileData.buffer,
//         fileName: fileData.originalname,
//         folder: "personal-website",
//         extensions: [
//           {
//             name: "google-auto-tagging",
//             maxTags: 5,
//             minConfidence: 95,
//           },
//         ],
//       });
//     }

//     const works = await worksModel.create({
//       id: uuid,
//       name: name,
//       description: description,
//       imageId: uploadResponse.fileId,
//     });

//     const image = await imagesModel.create({
//       id: uploadResponse.fileId,
//       workId: works.id,
//       imageUrl: uploadResponse.url,
//     });

//     res.json({
//       status: 200,
//       message: "success",
//       data: { ...works.dataValues, ...image.dataValues },
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error: " + error.message });
//   }
// };

const addWorkController = async (req, res) => {
  const { name, description } = req.body;
  const uuid = crypto.randomUUID();
  const fileData = req.file;

  // Validasi input
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    let uploadResponse = { fileId: uuid, url: null };

    if (fileData) {
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

      // Membuat entitas gambar jika ada gambar yang diupload
      await imagesModel.create({
        id: uploadResponse.fileId,
        workId: uuid,
        imageUrl: uploadResponse.url,
      });
    }

    const works = await worksModel.create({
      id: uuid,
      name: name,
      description: description,
      imageId: fileData ? uploadResponse.fileId : null, // Tetapkan null jika tidak ada gambar
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
