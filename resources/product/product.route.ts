import express from "express";
import { productController } from "./product.controller";

const productRoute = express.Router();

productRoute.get("/products", async (req, res) => {
  await productController.getAll(req, res);
});

productRoute.get("/products/:id", async (req, res) => {
  await productController.getProductById(req, res);
});

productRoute.get("/products/:slug", async (req, res) => {
  await productController.getProductBySlug(req, res);
});

productRoute.post("/create-product", async (req, res) => {
  await productController.createProduct(req, res);
});
export { productRoute };
