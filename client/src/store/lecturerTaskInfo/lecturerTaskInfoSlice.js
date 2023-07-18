import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  active_assignment_list: [],
  active_project_list: [],
  pending_assesment_list: { assignment: [], project: [] },
  unAssigned_project_list: [],
  student_taskMap: [],
  error: "",
};

//AsyncThunk generates pending fulfilled and rejected action types
// export const fetchLecturerTaskData = createAsyncThunk("lecturer/fetchTaskdata", (id) => {
//   return axios.get(`/taskInfo/${id}`).then((response) => {
//     return response.data;
//     //dispatch(fetchUserSucceeded(users)) this line is not needed as auto generated actions available
//   });
// });

const lecturerTaskInfoSlice = createSlice({
  name: "lecturer_Task_Info",
  initialState,
  reducers: {
    addTaskList: (state, action) => {
      state.active_assignment_list = action.payload.active_assignment_list;
      state.active_project_list = action.payload.active_project_list;
      state.pending_assesment_list = action.payload.pending_assesment_list;
      state.unAssigned_project_list = action.payload.unAssigned_project_list;
      state.loading = false;
    },
    updateAssesmentData: (state, action) => {
      state.pending_assesment_list = action.payload;
    },
    updateActiveTaskData: (state, action) => {
      state.active_assignment_list = action.payload.active_assignment_list;
      state.active_project_list = action.payload.active_project_list;
    },
    addStudentTaskMap: (state, action) => {
      state.student_taskMap = action.payload.student_taskMap;
    },
  },
});

export default lecturerTaskInfoSlice.reducer;
export const {
  addTaskList,
  updateAssesmentData,
  updateActiveTaskData,
  addStudentTaskMap,
} = lecturerTaskInfoSlice.actions;
