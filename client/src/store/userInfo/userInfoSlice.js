import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  logged_in_userId:'',
  userData: {},
  error: "",
  account_type:''
};

//AsyncThunk generates pending fulfilled and rejected action types
export const fetchUserData = createAsyncThunk("user/fetchData", (id) => {
  return axios.get(`/getUserInfo/${id}`).then((response) => {
    return response.data;
    //dispatch(fetchUserSucceeded(users)) this line is not needed as auto generated actions available
  });
});

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers:{
    reset: () => initialState,
    updateUserData:(state,action)=>{
      state.userData = {...action.payload};
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = {...action.payload};
      state.logged_in_userId=action.payload.user_id;
      state.account_type=action.payload.role;
      state.error = "";
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.loading = false;
      state.userData = {};
      state.logged_in_userId='';
      state.account_type='';
      state.error = action.error.message;
    });
  },
});


export default userInfoSlice.reducer;
export const {reset,updateUserData}=userInfoSlice.actions