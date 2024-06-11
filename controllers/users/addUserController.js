const imageKitApi = require("../../configs/imageKitApi");
const db = require("../../models");
const bcrypt = require("bcrypt");

const usersModel = db.users;
const imagesModel = db.images;

const addUserController = async (req, res) => {
  // const { name, description } = req.body;

  const { username, email, password } = req.body;

  const uuid = crypto.randomUUID();

  const fileData = req.file;

  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const data = {
    id: uuid,
    username: username,
    email: email,
    password: hashedPassword,
  };

  const usernameCount = await usersModel.count({ where: { username } });
  const emailCount = await usersModel.count({ where: { email } });

  const usernameTaken = usernameCount > 0;
  const emailTaken = emailCount > 0;

  if (usernameTaken) {
    return res.status(400).json({ message: "Username already taken" });
  } else if (emailTaken) {
    return res.status(400).json({ message: "Email already taken" });
  } else if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email and password are required" });
  } else if (!username) {
    return res.status(400).json({ message: "Username is required" });
  } else if (username.length < 6) {
    return res
      .status(400)
      .json({ message: "Username must be at least 6 characters" });
  } else if (!email) {
    return res.status(400).json({ message: "E-mail is required" });
  } else if (!email.includes("@")) {
    return res.status(400).json({ message: "Email must contain @" });
  } else if (!password) {
    return res.status(400).json({ message: "Password is required" });
  } else if (
    !/^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
  ) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters and contain at least one special character",
    });
  } else if (fileData) {
    try {
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

      const users = await usersModel.create({
        ...data,
        imageId: uploadResponse.fileId || uuid,
      });
      const image = await imagesModel.create({
        id: uploadResponse.fileId || uuid,
        workId: users.id,
        url: uploadResponse.url || "null",
      });
      const data = { data: { ...users.dataValues, ...image.dataValues } };
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
      res.json(error.message || error);
    }
  } else {
    try {
      const users = await usersModel.create({
        ...data,
        imageId: uuid,
      });
      const image = await imagesModel.create({
        id: uuid,
        workId: users.id || uuid,
        url: "null",
      });
      const responseData = {
        data: { ...users.dataValues, ...image.dataValues },
      };
      const response = {
        status: 200,
        message: "success",
        ...responseData,
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

module.exports = addUserController;
