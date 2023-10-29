const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { accessTokenSecretKey } = require("../config/index");
const fetchCurrentUser = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    res.status(401).json({
      message: "your are not authenticated !",
      valid: req.cookies.accessToken,
    });
  }
  try {
    const data = jwt.verify(token, accessTokenSecretKey);
    if (!data) {
      return res.status(500).json({ error: data });
    }
    req.userId = data._id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Crendientials !" });
  }
};
// Define a function to hash a password
const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // Number of salt rounds (higher is better but slower)
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

const appMiddleware = (req, res, next) => {
  next();
};
module.exports = { hashPassword, appMiddleware, fetchCurrentUser };
