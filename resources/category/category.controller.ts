import { NextFunction, Request, Response } from "express";
import { categoryRepo } from "./category.repo";

const getAll = async (req: Request, res: Response) => {
  //console.log(req.query);
  const currentPage = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 9;
  const offset = pageSize * (currentPage - 1);
  const searchVal = req.query.q;
  try {
    if (!searchVal) {
      const blogs = await categoryRepo.getAll(offset, pageSize);

      return res.json(blogs);
    } else {
      const blogs = await categoryRepo.getAllWithSearch(
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

const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const categoryData = {
      name,
    };

    console.log({ categoryData });

    const blog = await categoryRepo.createCategory(categoryData);
    return res.json(blog);
  } catch (e) {
    if (e instanceof Error) res.status(404).send(e.message);
  }
};

const removeCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await categoryRepo.removeCategory(Number(id));
    return res.json(blog);
  } catch (e) {
    if (e instanceof Error) res.status(404).send(e.message);
  }
};

export const categoryController = { getAll, createCategory, removeCategory };
