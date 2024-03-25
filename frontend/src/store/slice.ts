import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type RootState = {
  modal: {
    isOpen: boolean;
    details: {} | null;
  };
};

const initialState: RootState = {
  modal: {
    isOpen: false,
    details: {}
  }
};

export const slice = createSlice({
  name: "state",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<any>) => {
      state.modal.isOpen = true;
      state.modal.details = action.payload;
    },
    closeModal: (state) => {
      state.modal.details = null;
      state.modal.isOpen = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = slice.actions;

export default slice.reducer;
