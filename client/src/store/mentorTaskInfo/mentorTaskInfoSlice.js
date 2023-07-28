import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  loading: true,
  active_list:[],
  submitted_list:[],
  pending_list:[],
  error: "",
};


const mentorTaskInfoSlice = createSlice({
  name: "mentorTaskInfo",
  initialState,
  reducers: {
   
    updateSubmittedTaskData: (state, action) => {
      state.submitted_list = [...action.payload];
    },
    updateActiveTaskData: (state, action) => {
      state.active_list=[...action.payload]
    },
    updatePendingTaskData: (state, action) => {
      state.pending_list = [...action.payload];
    },
  },
});

export default mentorTaskInfoSlice.reducer;
export const {
    updateSubmittedTaskData,
    updateActiveTaskData,
    updatePendingTaskData
} = mentorTaskInfoSlice.actions;
