import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../../hooks/http.hook";

const initialState = {
  data: [],
  dataLoadingStatus: "idle",
};

export const fetchDepartments = createAsyncThunk("departments/fetchDepartments", () => {
  const { request } = useHttp();
  return request("https://localhost:3001/api/Department");
});

const departmentPageSlice = createSlice({
  name: "departmentPage",
  initialState,
  reducers: {
    departmentCreated: (state, action) => {
      state.data.push(action.payload);
    },
    departmentDeleted: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    dataListFetching: (state) => {
      state.dataLoadingStatus = "loading";
    },
    dataListFetched: (state, action) => {
      state.dataLoadingStatus = "idle";
      state.data = action.payload;
    },
    dataListFetchingError: (state) => {
      state.dataLoadingStatus = "error";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.dataLoadingStatus = "loading";
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.dataLoadingStatus = "idle";
        state.data = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state) => {
        state.dataLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = departmentPageSlice;

export default reducer;

export const {
  dataListFetching,
  dataListFetched,
  dataListFetchingError,
  departmentCreated,
  departmentDeleted,
} = actions;
