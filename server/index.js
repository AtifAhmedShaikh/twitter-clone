const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const { PORT, appPath } = require("./config/index");
const cors = require("cors");
const router = require("./routes/index");
const { appMiddleware } = require("./middleware/index");
const connectDatabase = require("./database/index");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const corsConfiguration={
  origin: [appPath],//Allow over  frontend App
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies)
}
app.use(cors(corsConfiguration));
connectDatabase(); //connect the MongoDB Atlas Database
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(appMiddleware); //add the middleware
app.use(router); //use the Router
app.listen(PORT, () => {
  console.log(`My Twitter Clone app listening on port ${PORT}`);
});
