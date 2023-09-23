import { createSlice } from "@reduxjs/toolkit";

const searchPanelSlice = createSlice({
  name: "searchPanel",
  initialState: false,
  reducers: {
    toogleSidebar: (state) => !state,
    setStatusSidebar: (state, action) => action.payload,
  },
});

const { actions, reducer } = searchPanelSlice;

export default reducer;

export const { toogleSidebar, setStatusSidebar } = actions;
