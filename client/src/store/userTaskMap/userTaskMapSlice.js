import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  active_task:[],
  submitted_task:[],
  error: "",
  
};

//AsyncThunk generates pending fulfilled and rejected action types
export const fetchUserTaskMap = createAsyncThunk("user/fetchTaskMap", (id) => {
  return axios.get(`/taskMap/${id}`).then((response) => {
    return response.data;
    //dispatch(fetchUserSucceeded(users)) this line is not needed as auto generated actions available
  });
});

const getAllTask=(taskData)=>{
    const activeTask=[];
    const submittedTask=[];
    taskData.map((task)=>{
      if(task.totalScore===0){
        activeTask.push(task)
      }else{
        submittedTask.push(task)
      }
    });
    return {
      'active_task': activeTask,
      'submitted_task':submittedTask
    }
  }

const userTaskMapSlice = createSlice({
  name: "userTaskMap",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserTaskMap.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserTaskMap.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      if(action.payload.length){
       const taskCategory=getAllTask(action.payload);
       state.active_task=taskCategory.active_task;
       state.submitted_task=taskCategory.submitted_task;
       }
    });
    builder.addCase(fetchUserTaskMap.rejected, (state, action) => {
      state.loading = false;
      state.userData = {};
      state.logged_in_userId='';
      state.account_type='';
      state.error = action.error.message;
    });
  },
});


export default userTaskMapSlice.reducer;