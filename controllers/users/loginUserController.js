const db = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUserController = async (req, res) => {
  const { username, email, password } = req.body;

  const usersModel = db.users;
  const imageModel = db.images;

  const secretKey = process.env.JWT_SECRET_KEY;

  let user;

  if ((!username || !email) && !password) {
    return res
      .status(400)
      .json({ message: "Username or email, and password are required" });
  } else if (username) {
    user = await usersModel.findOne({ where: { username } });
  } else if (email) {
    user = await usersModel.findOne({ where: { email } });
  }

  if (!user) {
    return res
      .status(401)
      .json({ message: "Invalid username or email or password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res
      .status(401)
      .json({ message: "Invalid username or email or password" });
  }
  const token = jwt.sign(
    {
      id: user.id,
    },
    secretKey,
    { expiresIn: "1h" }
  );
  try {
    const response = {
      status: res.statusCode,
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        token: "Bearer " + token,
      },
    };

    res.json(response);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error: " + error });
  }
};

module.exports = loginUserController;
