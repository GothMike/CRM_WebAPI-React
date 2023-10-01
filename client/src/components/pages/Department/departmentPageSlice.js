import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../../hooks/http.hook";

const initialState = {
  data: [],
  dataLoadingStatus: "",
  dataCreateStatus: "",
  dataUpdateStatus: "",
  actionWindow: false,
};

export const fetchDepartments = createAsyncThunk("departments/fetchDepartments", () => {
  const { request } = useHttp();
  return request("https://localhost:3001/api/Department");
});

export const createDepartment = createAsyncThunk(
  "departments/createDepartment",
  async (newDepartment, { dispatch }) => {
    const { request } = useHttp();
    const response = await request(
      "https://localhost:3001/api/Department",
      "POST",
      JSON.stringify(newDepartment)
    );
    console.log(response, "Успешно отправлено");
    dispatch(fetchDepartments());
    return response;
  }
);

export const updateDepartment = createAsyncThunk(
  "departments/updateDepartment",
  async ({ id, newDepartment }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const response = await request(
        `https://localhost:3001/api/Department/${id}`,
        "PUT",
        JSON.stringify(newDepartment)
      );
      console.log(response, "Успешно отправлено");
      dispatch(fetchDepartments());
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const departmentPageSlice = createSlice({
  name: "departmentPage",
  initialState,
  reducers: {
    departmentDeleted: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    toogleActionMenu: (state) => {
      state.actionWindow = !state.actionWindow;
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
      .addCase(createDepartment.pending, (state) => {
        state.dataCreateStatus = "loading";
      })
      .addCase(createDepartment.fulfilled, (state) => {
        state.dataCreateStatus = "idle";
      })
      .addCase(createDepartment.rejected, (state) => {
        state.dataCreateStatus = "error";
      })
      .addCase(updateDepartment.pending, (state) => {
        state.dataUpdateStatus = "loading"; //
      })
      .addCase(updateDepartment.fulfilled, (state) => {
        state.dataUpdateStatus = "idle"; //
      })
      .addCase(updateDepartment.rejected, (state) => {
        state.dataUpdateStatus = "error"; //
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
  departmentDeleted,
  toogleActionMenu,
} = actions;
