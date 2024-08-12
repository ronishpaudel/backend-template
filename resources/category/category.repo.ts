import { Prisma } from "@prisma/client";
import { db } from "../../utils/db";

const getAll = async (offset: number, pageSize: number) => {
  return await db.category.findMany({
    skip: offset,
    take: pageSize,
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getAllWithSearch = async (
  offset: number,
  pageSize: number,
  searchVal: string
) => {
  return await db.category.findMany({
    skip: offset,
    take: pageSize,
    where: {
      name: {
        contains: searchVal,
      },
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const createCategory = async (
  categoryData: Prisma.CategoryCreateArgs["data"]
) => {
  return await db.category.create({
    data: categoryData,
  });
};

const removeCategory = async (id: number) => {
  return await db.category.delete({
    where: {
      id: id,
    },
  });
};
export const categoryRepo = {
  getAll,
  getAllWithSearch,
  createCategory,
  removeCategory,
};
