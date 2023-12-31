import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../../hooks/http.hook";

const initialState = {
  data: [],
  dataLoadingStatus: "idle",
};

export const fetchEmployees = createAsyncThunk("employee/fetchEmployees", () => {
  const { request } = useHttp();
  return request("https://localhost:3001/api/Employee");
});

const employeePageSlice = createSlice({
  name: "employeePage",
  initialState,
  reducers: {
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
      .addCase(fetchEmployees.pending, (state) => {
        state.dataLoadingStatus = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.dataLoadingStatus = "idle";
        state.data = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.dataLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = employeePageSlice;

export default reducer;

export const { dataListFetching, dataListFetched, dataListFetchingError } = actions;
