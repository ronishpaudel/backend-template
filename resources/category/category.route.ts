import express from "express";
import { categoryController } from "./category.controller";
import { verifyUser } from "../../middleware/userVerify.middleware";

export const categoryRoute = express.Router();

categoryRoute.get("/category", async (req, res) => {
  await categoryController.getAll(req, res);
});

categoryRoute.post("/create-category", verifyUser, async (req, res) => {
  await categoryController.createCategory(req, res);
});

categoryRoute.delete("/remove-category/:id", async (req, res) => {
  await categoryController.removeCategory(req, res);
});
