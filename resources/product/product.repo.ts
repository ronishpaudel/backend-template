import { db } from "../../utils/db";
import { Prisma } from "@prisma/client";

const getAll = async (offset: number, pageSize: number) => {
  return await db.product.findMany({
    skip: offset,
    take: pageSize,
    select: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      id: true,
      name: true,
      description: true,
      price: true,
      crossedPrice: true,
      size: true,
      status: true,
      imageUrl: true,
      thumbnailUrl: true,
      flag: true,
      createdAt: true,
      updatedAt: true,
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
  return await db.product.findMany({
    skip: offset,
    take: pageSize,
    where: {
      name: {
        contains: searchVal,
      },
    },
    select: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      id: true,
      name: true,
      description: true,
      price: true,
      crossedPrice: true,
      size: true,
      status: true,
      imageUrl: true,
      thumbnailUrl: true,
      flag: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getProductById = async (id: number) => {
  return await db.product.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      id: true,
      name: true,
      description: true,
      price: true,
      crossedPrice: true,
      size: true,
      status: true,
      imageUrl: true,
      thumbnailUrl: true,
      flag: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const getProductBySlug = async (slug: string) => {
  return await db.product.findUnique({
    where: {
      slug,
    },
    select: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      id: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      crossedPrice: true,
      flag: true,
      imageUrl: true,
      thumbnailUrl: true,
      size: true,
      status: true,
      createdAt: true,
    },
  });
};

const createProduct = async (productData: Prisma.ProductCreateArgs["data"]) => {
  return await db.product.create({
    data: productData,
  });
};
export const productRepo = {
  getAll,
  getAllWithSearch,
  getProductById,
  getProductBySlug,
  createProduct,
};
