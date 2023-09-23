import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [
    {
      name: "Выберите фильтр",
    },
    {
      name: "От А до Я",
    },
    { name: "От Я до А" },
  ],
  activeFilter: "default",
};

const dataFilterSlice = createSlice({
  name: "dataFilter",
  initialState,
  reducers: {
    setSelectedOption: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

const { actions, reducer } = dataFilterSlice;

export default reducer;
export const { setSelectedOption } = actions;
