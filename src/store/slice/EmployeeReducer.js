import { createSlice } from "@reduxjs/toolkit";
import {
  fetchEmployee,
  createEmployee,
  updateEmployee,
} from "../../config/EmployeeApi";

const initialState = {
  employee: [],
  error: null,
  status: "idle",
  pagination: {},
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employee = action.payload;
        state.pagination = {
          totalItems: action.payload.totalRecord,
        };
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employee.push(action.payload);
        state.pagination.totalItems += 1;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedEmployee = action.payload;
        const index = state.employee.findIndex(
          (employee) => employee.id === updatedEmployee.id
        );
        if (index !== -1) {
          state.employee[index] = updatedEmployee;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default employeeSlice.reducer;
