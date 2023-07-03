import { configureStore } from "@reduxjs/toolkit";
import userInfoReducer from "./userInfo/userInfoSlice";

const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
  },
});

export default store;
