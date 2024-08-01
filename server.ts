import Express from "express";
import { db, libsql } from "./utils/db";
const app = Express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use(async (req, res, next) => {
//   await libsql.sync();
//   next();
// });

app.get("/products", async (req, res) => {
  try {
    const products = await db.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products");
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const product = await db.product.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Error fetching product");
  }
});

app.listen(3001, () => {
  console.log("Server is running on port http://localhost:3001");
});
