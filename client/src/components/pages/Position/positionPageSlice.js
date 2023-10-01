import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../../hooks/http.hook";

const initialState = {
  data: [],
  dataLoadingStatus: "idle",
};

export const fetchPositions = createAsyncThunk("positions/fetchPositions", () => {
  const { request } = useHttp();
  return request("https://localhost:3001/api/Position");
});

const positionPageSlice = createSlice({
  name: "positionPage",
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
      .addCase(fetchPositions.pending, (state) => {
        state.dataLoadingStatus = "loading";
      })
      .addCase(fetchPositions.fulfilled, (state, action) => {
        state.dataLoadingStatus = "idle";
        state.data = action.payload;
      })
      .addCase(fetchPositions.rejected, (state) => {
        state.dataLoadingStatus = "error";
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = positionPageSlice;

export default reducer;

export const { dataListFetching, dataListFetched, dataListFetchingError } = actions;
