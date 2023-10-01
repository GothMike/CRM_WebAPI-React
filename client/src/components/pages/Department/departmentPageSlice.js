import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../../hooks/http.hook";
import { useEffect, useCallback, useState } from "react";
import { useDispatch } from "react-redux";

const initialState = {
  data: [],
  dataLoadingStatus: "idle",
  actionWindow: false,
};

export const fetchDepartments = createAsyncThunk("departments/fetchDepartments", () => {
  const { request } = useHttp();
  return request("https://localhost:3001/api/Department");
});

// export const updateDepartment = createAsyncThunk(
//   "departments/updateDepartment",
//   async (department) => {
//     const { request } = useHttp();
//     // Здесь отправьте запрос на сервер для обновления данных в БД, например, через PUT или PATCH
//     const updatedDepartment = await request(
//       `https://localhost:3001/api/Department/${department.id}`,
//       "PUT",
//       JSON.stringify(department)
//     );
//     return updatedDepartment;
//   }
// );

export const onDelete =
  ((id, entityName) => {
    const { request } = useHttp();
    const dispatch = useDispatch();

    request(`https://localhost:3001/api/${entityName}/${id}`, "DELETE")
      .then((data) => console.log(data, "Deleted"))
      .then(dispatch(departmentDeleted(id)))
      .catch((err) => console.log(err));
  },
  []);

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
    departmentedUpdated: (state, action) => {
      const updatedData = state.data.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
      state.data = updatedData;
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
      // .addCase(updateDepartment.fulfilled, (state, action) => {
      //   // Здесь обновите данные в состоянии вашего хранилища, например:
      //   const updatedData = state.data.map((item) => {
      //     if (item.id === action.payload.id) {
      //       return action.payload; // Заменить старые данные обновленными данными
      //     }
      //     return item;
      //   });
      //   state.data = updatedData;
      // })
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
  toogleActionMenu,
  departmentedUpdated,
} = actions;
