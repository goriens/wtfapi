const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./Utils/Error");
const user = require("./Routes/userRoutes");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
const app = express();
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api", user);

app.use(errorMiddleware);
module.exports = app;
