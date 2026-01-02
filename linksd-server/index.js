require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const linkRoutes = require("./routes/link");

const morgan = require("morgan");

const app = express();
const http = require("http").createServer(app);

// db connection
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// middlewares
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));

// route middlewares
app.use("/api", authRoutes);
app.use("/api", linkRoutes);

const port = process.env.PORT || 8000;

http.listen(port, () => console.log("Server running on port 8000"));
//.env file variables
// DATABASE = mongodb://localhost:27017/LinksDaily
// PORT = 8000
// JWT_SECRET = LinksDaily
// CLOUDINARY_NAME = da01buahx
// CLOUDINARY_KEY = 172638542738785
// CLOUDINARY_SECRET = 6h1JfKME4waO1wfQC9UI8tbyYUs
// SENDGRID_KEY = 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
// EMAIL_FROM = pallishree.testdev@gmail.com
// CLOUDINARY_URL=cloudinary://172638542738785:6h1JfKME4waO1wfQC9UI8tbyYUs@da01buahx
