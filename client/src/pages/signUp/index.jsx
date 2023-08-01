import React, { useState, useEffect } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  Select,
  Typography,
  useTheme,
  MenuItem,
} from "@mui/material";
import { tokens } from "theme";
import Signup from "styles/SignUp.styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";



import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "store/userInfo/userInfoSlice";
import { fetchUserTaskMap } from "store/userTaskMap/userTaskMapSlice";
import { ACCOUNT_TYPES } from "constants";

//import "./signIn.css";
// import { useGetUserQuery } from "store/api";
// import { useSelector } from "react-redux";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// Creating schema
const schema = Yup.object().shape({
  first_name: Yup.string().required("required"),
  last_name: Yup.string().required("required"),
  k_number: Yup.string().required("K number is not valid"),
  contact_no: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
  role: Yup.string().required("required"),
});

const SignUp = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accountType = useSelector((state) => state?.userInfo.userData.role);
  const userData=useSelector((state)=>state?.userInfo?.userData.user_id);

  const getUserData = (id, user_id,account_type) => {
    dispatch(fetchUserData(user_id));
    if(account_type===ACCOUNT_TYPES.STUDENT){
      dispatch(fetchUserTaskMap(user_id)).unwrap();
    }  
    const url =
    account_type === ACCOUNT_TYPES.STUDENT
        ? `/dashboard/${user_id}`
        : account_type ===ACCOUNT_TYPES.LECTURER ? "/lecturer/dashboard":"/mentor/dashboard";
    navigate(url);
  };

  const createNewUser=async(userInfo)=>{
    try{
      const response=await axios.post("/createNewUser",userInfo);
      if(response.status===200){
        getUserData(response.data._id, response.data.user_id,response.data.accountType);
      }
    }catch(err){
      console.log("New User Sign up error",err)
    }
  }

  const handleFormSubmit = (values) => {
    const allFormValues=values;
    const userInfo={
      first_name:allFormValues.first_name,
      last_name:allFormValues.last_name,
      email:allFormValues.email,
      password:allFormValues.password,
      address_1:"",
      address_2:"",
      contact_no:allFormValues.contact_no,
      role:allFormValues.role,
      user_id:allFormValues.k_number
    }
    createNewUser(userInfo)
  };

  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{
          first_name: "",
          last_name: "",
          k_number: "",
          contact_no: "",
          email: "",
          password: "",
          role: "",
        }}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Box
            className="signup"
            sx={{
              minWidth: "60vh",
              minHeight:"50vh",
              marginBottom: "0",
            }}
          >
            {/* Passing handleSubmit parameter tohtml form onSubmit property */}
            <form noValidate onSubmit={handleSubmit}>
              <Typography variant="h3" marginBottom="1rem">Sign up</Typography>
              <Box display={"flex"} justifyContent={"center"} gap={1}>
                {/* First Name */}
                <input
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.first_name}
                  placeholder="First Name"
                  className="form-control inp_text"
                  id="first_name"
                />
                {/* Last Name */}
                <input
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.last_name}
                  placeholder="Last Name"
                  className="form-control inp_text"
                  id="last_name"
                />
              </Box>
              {/* If validation is not passed show errors */}
              <p className="error">
                {errors.first_name && touched.first_name && errors.first_name}
              </p>
              {/* K number */}
              <input
                type="text"
                name="k_number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.k_number}
                placeholder="Enter valid K Number"
                className="form-control inp_text"
                id="k_number"
              />
              {/* If validation is not passed show errors */}
              <p className="error">
                {errors.k_number && touched.k_number && errors.k_number}
              </p>
              {/* Contact Number */}
              <input
                type="text"
                name="contact_no"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contact_no}
                placeholder="Contact Number"
                className="form-control inp_text"
                id="last_name"
              />
              {/* If validation is not passed show errors */}
              <p className="error">
                {errors.last_name && touched.last_name && errors.last_name}
              </p>
              {/* Email ID */}
              {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Enter email id / username"
                className="form-control inp_text"
                id="email"
              />
              {/* If validation is not passed show errors */}
              <p className="error">
                {errors.email && touched.email && errors.email}
              </p>
              {/* Password */}
              {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Enter password"
                className="form-control"
              />
              {/* If validation is not passed show errors */}
              <p className="error">
                {errors.password && touched.password && errors.password}
              </p>
              {/* Acoount Type */}
              <Select
                labelId="account_type_id"
                fullWidth
                displayEmpty
                name="role"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.role}
                placeholder="Account Type"
                className="form-control"
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <Typography sx={{ float: "left", marginTop: "5px" }}>
                        Account Type
                      </Typography>
                    );
                  }

                  return (
                    <Typography sx={{ float: "left", marginTop: "5px" }}>
                      {selected}
                    </Typography>
                  );
                }}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="lecturer">Lecturer</MenuItem>
                <MenuItem value="mentor">Mentor</MenuItem>
              </Select>
              <p className="error">
                {errors.role && touched.role && errors.role}
              </p>
              {/* Click on submit button to submit the form */}
              <Button
                type="submit"
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                }}
              >
                Submit
              </Button>
            </form>
            <br />
            <Typography sx={{ color: colors.grey[100] }}>Or</Typography>
            <Link to="/" color={colors.grey[100]}>
              Already have an account
            </Link>
          </Box>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
