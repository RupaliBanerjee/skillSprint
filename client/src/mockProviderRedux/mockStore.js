import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userInfoReducer from "store/userInfo/userInfoSlice";
import userTaskMapReducer from "store/userTaskMap/userTaskMapSlice"
import userTaskDetailReducer from 'store/userTaskDetail/userTaskDetailSlice';
import lecturer_Task_InfoReducer from 'store/lecturerTaskInfo/lecturerTaskInfoSlice';
import mentorTaskInfoReducer from 'store/mentorTaskInfo/mentorTaskInfoSlice';

const rootReducer = combineReducers({
    userInfo: userInfoReducer,
    userTaskMap:userTaskMapReducer,
    userTaskDetail:userTaskDetailReducer,
    lecturer_Task_Info:lecturer_Task_InfoReducer,
    mentorTaskInfo:mentorTaskInfoReducer
})

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}