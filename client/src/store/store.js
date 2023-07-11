import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./userInfo/userInfoSlice";
import userTaskMapReducer from "./userTaskMap/userTaskMapSlice";
import userTaskDetailReducer from './userTaskDetail/userTaskDetailSlice';
import lecturer_Task_InfoReducer from './lecturerTaskInfo/lecturerTaskInfoSlice';

const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    userTaskMap:userTaskMapReducer,
    userTaskDetail:userTaskDetailReducer,
    lecturer_Task_Info:lecturer_Task_InfoReducer,
  },
});

export default store;
