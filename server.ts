import express from "express";
import { db } from "./utils/db";
import cors from "cors";
import { userRoute } from "./resources/users";
import { productRoute } from "./resources/product";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(productRoute);
app.use(express.urlencoded({ extended: true }));

// app.use(async (req, res, next) => {
//   await libsql.sync();
//   next();
// });

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
