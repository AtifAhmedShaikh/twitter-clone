const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const { hashPassword } = require("../middleware/index"); //function to hasshed password
const UserDTO = require("../DTO/user");
const JWTService = require("../services/jwtService");
const refreshTokenSchema = require("../models/Token");
const authentication = {
  async register(req, res, next) {
    try {
      // Extract user data from the request body
      const { username, email, password,profileImage,backgroundImage, bio, name } = req.body;
      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(401)
          .json({
            message: "Email already exists. Please choose a different email.",
          });
      }
      // Hash the password
      const hashedPassword = await hashPassword(password);
      // Create a new user instance
      const newUser = new User({
        name,
        username,
        email,
        password: hashedPassword,
        profileImage,
        backgroundImage,
        bio,
      });
      // Save the user to the database
      const savedUser = await newUser.save();
      const accessToken = JWTService.signAccessToken(
        { _id: savedUser._id },
        "30m"
      );
      const refreshToken = JWTService.signRefreshToken(
        { _id: savedUser._id },
        "60m"
      );
      await JWTService.storeRefreshToken(refreshToken, savedUser._id);
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
      const userDto = new UserDTO(savedUser);
      res.status(201).json({ user: userDto }); // Send a success response
    } catch (error) {
      console.log("Error has Detetcted Me !", error);
      res.status(500).json({ message: "User registration failed" }); // Send an error response
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid Email or password" });
      }
      // Compare the user's  provided password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid Email or password" });
      }
      const accessToken = JWTService.signAccessToken({ _id: user._id }, "30m");
      const refreshToken = JWTService.signRefreshToken(
        { _id: user._id },
        "60m"
      );

      await refreshTokenSchema.updateOne(
        {
          _id: user._id,
        },
        { token: refreshToken },
        { upsert: true }
      );
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
      });
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  async logout(req, res, next) {
    //    delete refresh token from Databse
    const { refreshToken } = req.cookies;
    try {
      await refreshTokenSchema.deleteOne({ token: refreshToken });
    } catch (error) {
      return next(error);
    }
    // delete cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    // 2. response
    res
      .status(200)
      .json({
        user: null,
        auth: false,
        message: "You have suuccessfully Logout ",
      });
  },
  async refresh(req, res, next) {
    const originalRefreshToken = req.cookies.refreshToken;
    let id;
    try {
      id = JWTService.verifyRefreshToken(originalRefreshToken)._id;
    } catch (e) {
      const error = {
        status: 401,
        message: "Unauthorized",
      };

      return next(error);
    }

    try {
      const match = refreshTokenSchema.findOne({
        _id: id,
        token: originalRefreshToken,
      });

      if (!match) {
        const error = {
          status: 401,
          message: "Unauthorized",
        };

        return next(error);
      }
    } catch (e) {
      return next(e);
    }

    try {
      const accessToken = JWTService.signAccessToken({ _id: id }, "30m");

      const refreshToken = JWTService.signRefreshToken({ _id: id }, "60m");

      await refreshTokenSchema.updateOne({ _id: id }, { token: refreshToken });

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
      });
    } catch (e) {
      return next(e);
    }
    const user = await User.findOne({ _id: id }).select("-password");
    return res.status(200).json({ user, auth: true });
  },
};

module.exports = authentication;
