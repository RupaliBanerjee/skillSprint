import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./userInfo/userInfoSlice";
import userTaskMapReducer from "./userTaskMap/userTaskMapSlice"
import userTaskDetailReducer from './userTaskDetail/userTaskDetailSlice'

const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    userTaskMap:userTaskMapReducer,
    userTaskDetail:userTaskDetailReducer,
  },
});

export default store;
