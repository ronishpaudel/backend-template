import express from "express";
import cors from "cors";
import { db } from "./utils/db";
import { userRoute } from "./resources/users";
import { productRoute } from "./resources/product";
import { uploadImages } from "./middleware/multerMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoute);
app.use(productRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use the custom middleware for multiple image uploads
app.post("/upload", uploadImages, (req, res) => {
  try {
    res.json({
      message: "Images uploaded successfully",
      files: req.files,
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).send("Error uploading images");
  }
});

app.listen(3002, () => {
  console.log("Server is running on port http://localhost:3002");
});

export { app };
