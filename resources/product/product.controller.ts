import { Request, Response } from "express";
import { productRepo } from "./product.repo";
import { randomNumber } from "../../utils/randomNumber";

//get-query for blogs
const getAll = async (req: Request, res: Response) => {
  //console.log(req.query);
  const currentPage = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 9;
  const offset = pageSize * (currentPage - 1);
  const searchVal = req.query.q;
  try {
    if (!searchVal) {
      const blogs = await productRepo.getAll(offset, pageSize);

      return res.json(blogs);
    } else {
      const blogs = await productRepo.getAllWithSearch(
        offset,
        pageSize,
        String(searchVal)
      );
      return res.json(blogs);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
};

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const blogs = await productRepo.getProductById(Number(id));
  return res.json(blogs);
};

const getProductBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const blogs = await productRepo.getProductBySlug(slug);
  return res.json(blogs);
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      crossedPrice,
      imageUrl,
      thumbImageUrl,
      size,
      status,
      flag,
      categoryId,
      userId,
    } = req.body;

    const slug =
      name.toLowerCase().replaceAll(" ", "-") + "-" + String(randomNumber());

    const productData = {
      name,
      slug,
      price,
      description,
      imageUrl,
      categoryId,
      thumbImageUrl,
      crossedPrice,
      category: categoryId,
      user: userId,
      size,
      status,
      flag,
    };

    console.log({ productData });

    const blog = await productRepo.createProduct(productData);
    return res.json(blog);
  } catch (e) {
    if (e instanceof Error) res.status(404).send(e.message);
  }
};

export const productController = {
  getAll,
  getProductById,
  getProductBySlug,
  createProduct,
};
