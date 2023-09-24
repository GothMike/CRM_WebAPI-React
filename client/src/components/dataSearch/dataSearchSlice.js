import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  term: "",
};

const dataSearchSlice = createSlice({
  name: "dataSearch",
  initialState,
  reducers: {
    searchEnteredData: (state, action) => {
      state.term = action.payload;
    },
  },
});

const { actions, reducer } = dataSearchSlice;

export default reducer;
export const { searchEnteredData } = actions;
