// import dotenv from 'dotenv'
const jwt = require("jsonwebtoken");

// dotenv.config()

const secretKey = process.env.SECRET_KEY;

async function authenticateTokenJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "User not found" });
  }

  await jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid User" });
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = authenticateTokenJWT;
