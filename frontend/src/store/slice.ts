import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../types";
import {
  DeleteProductResult,
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById
} from "./thunks";

export type RootState = {
  searchString: string;
  modal: {
    isOpen: boolean;
    details: Product | null;
    operation: "EDIT" | "ADD";
  };
  isLoading: boolean;
  products: Product[];
};

const initialState: RootState = {
  searchString: "",
  modal: {
    isOpen: false,
    details: null,
    operation: "ADD"
  },
  isLoading: false,
  products: []
};

export const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        product: RootState["modal"]["details"];
        operation: RootState["modal"]["operation"];
      }>
    ) => {
      state.modal.isOpen = true;
      state.modal.details = action.payload.product;
      state.modal.operation = action.payload.operation;
    },
    closeModal: (state) => {
      state.modal.details = null;
      state.modal.isOpen = false;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.isLoading = false;
          state.products = action.payload;
        }
      )
      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getProductById.fulfilled,
        (state, action: PayloadAction<Product | null>) => {
          state.isLoading = false;

          const newProduct = action.payload;

          const index = state.products.findIndex(
            (product) => product.id === newProduct?.id
          );

          if (newProduct === null) {
            return;
          }

          if (index >= 0) {
            state.products[index] = newProduct;
          } else {
            state.products.push(newProduct);
          }
        }
      )
      .addCase(getProductById.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product | null>) => {
          state.isLoading = false;

          const newProduct = action.payload;

          if (newProduct === null) {
            return;
          }

          state.products.push(newProduct);
        }
      )
      .addCase(addProduct.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        editProduct.fulfilled,
        (state, action: PayloadAction<Product | null>) => {
          state.isLoading = false;

          const newProduct = action.payload;

          if (newProduct === null) {
            return;
          }

          const index = state.products.findIndex(
            (product) => product.id === newProduct?.id
          );

          if (index >= 0) {
            state.products[index] = newProduct;
          } else {
            state.products.push(newProduct);
          }
        }
      )
      .addCase(editProduct.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<DeleteProductResult>) => {
          state.isLoading = false;

          if (action.payload.deletedId !== undefined) {
            state.products = state.products.filter(
              (product) => product.id !== action.payload.deletedId
            );
          }
        }
      )
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoading = false;
      })
});

export const { openModal, closeModal } = slice.actions;

export default slice.reducer;
