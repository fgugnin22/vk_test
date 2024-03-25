import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../types";

const ROOT_API_URL = process.env.ROOT_API_URL;

export const getAllProducts = createAsyncThunk<Product[], void>(
  "products/get-all",
  async (): Promise<Product[]> => {
    try {
      const res = await fetch(`${ROOT_API_URL}/products/getAll`);

      const products: Product[] = await res.json();

      return products;
    } catch (error) {
      return [];
    }
  }
);

export const getProductById = createAsyncThunk<Product | null, string | number>(
  "products/get-by-id",
  async (productId): Promise<Product | null> => {
    try {
      const res = await fetch(`${ROOT_API_URL}/products/get?id=${productId}`);

      const product: Product = await res.json();

      return product;
    } catch (error) {
      return null;
    }
  }
);

export const addProduct = createAsyncThunk<Product | null, Product>(
  "products/add",
  async (product: Product): Promise<Product | null> => {
    try {
      const res = await fetch(`${ROOT_API_URL}/products/add`, {
        method: "POST",
        body: JSON.stringify(product)
      });

      const createdProduct: Product = await res.json();

      return createdProduct;
    } catch (error) {
      return null;
    }
  }
);

export const editProduct = createAsyncThunk<Product | null, Product>(
  "products/edit",
  async (product: Product): Promise<Product | null> => {
    try {
      const res = await fetch(`${ROOT_API_URL}/products/edit`, {
        method: "POST",
        body: JSON.stringify(product)
      });

      const editedProduct: Product = await res.json();

      return editedProduct;
    } catch (error) {
      return null;
    }
  }
);

export type DeleteProductResult = {
  isDeleted: boolean;
  deletedId?: number;
};

export const deleteProduct = createAsyncThunk<DeleteProductResult, number>(
  "products/delete",
  async (productId: number): Promise<DeleteProductResult> => {
    try {
      const res = await fetch(
        `${ROOT_API_URL}/products/delete?id=${productId}`,
        {
          method: "DELETE"
        }
      );

      const data: DeleteProductResult = await res.json();

      return data;
    } catch (error) {
      return { isDeleted: false, deletedId: productId };
    }
  }
);
