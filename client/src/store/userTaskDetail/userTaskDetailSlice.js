import {createSlice} from '@reduxjs/toolkit';


const initialState={
   active_Task:[],
   submitted_Task:[],
   unAssigned_Task:[],
}
const userTaskDetailSlice=createSlice({
    name:'taskDetail',
    initialState,
    reducers:{
        updateTask:(state,action)=>{
           state.active_Task=action.payload.active_Task
           state.submitted_Task=action.payload.submitted_Task
           state.unAssigned_Task=action.payload.unAssigned_Task
        },
        addTask:(state,action)=>{
            state.unAssigned_Task.push(action.payload)
        }
    }
})

export default userTaskDetailSlice.reducer;
export const {updateTask,addTask}=userTaskDetailSlice.actions