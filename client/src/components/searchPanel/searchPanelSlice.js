import { createSlice } from "@reduxjs/toolkit";

const searchPanelSlice = createSlice({
  name: "searchPanel",
  initialState: false,
  reducers: {
    toogleSidebar: (state) => !state,
  },
});

const { actions, reducer } = searchPanelSlice;

export default reducer;

export const { toogleSidebar } = actions;
