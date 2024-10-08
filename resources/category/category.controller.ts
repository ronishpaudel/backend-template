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
      const category = await categoryRepo.getAll(offset, pageSize);

      return res.json(category);
    } else {
      const category = await categoryRepo.getAllWithSearch(
        offset,
        pageSize,
        String(searchVal)
      );
      return res.json(category);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
};

const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const { id: userId } = req.authUser;
    console.log({ userId, nameincategory: name });
    const categoryData = {
      name,
      userId,
    };

    console.log({ categoryData });

    const category = await categoryRepo.createCategory(categoryData);
    return res.json(category);
  } catch (e) {
    if (e instanceof Error) res.status(404).send(e.message);
  }
};

const removeCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await categoryRepo.removeCategory(Number(id));
    return res.json(category);
  } catch (e) {
    if (e instanceof Error) res.status(404).send(e.message);
  }
};

export const categoryController = { getAll, createCategory, removeCategory };
