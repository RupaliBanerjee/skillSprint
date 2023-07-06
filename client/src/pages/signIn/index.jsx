import React, { useState, useEffect } from "react";

import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./signIn.css";
//import { useGetUserQuery } from "store/api";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData } from "store/userInfo/userInfoSlice";
import { fetchUserTaskMap } from "store/userTaskMap/userTaskMapSlice";
//import { addUserData } from "store";

// Creating schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const SignIn = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const userData=useSelector((state)=>state?.userInfo?.userData.user_id)

  const [backendData, setBackendData] = useState([{}]);
  const [userCredential, setUserCredentials] = useState();

  const getUserData = (id, user_id) => {
    dispatch(fetchUserData(id));
    dispatch(fetchUserTaskMap(user_id));
    navigate(`/dashboard/${user_id}`);
  };

  const authenticateUser = (userCredential) => {
    axios
      .post("/login", userCredential)
      .then((response) => {
        if (response.status === 200) {
          getUserData(response.data._id, response.data.user_id);
        }
      })
      .catch((err) => console.log("Authentication Error", err));

    //setError(null)
  };

  //const userId= useSelector((state)=>state?.global);

  // const {d̥ata} =useGetUserQuery(userId);

  // useEffect(()=>{
  //   fetch("/getUsers").then(
  //     respose=>respose.json()).then(data=>{
  //       setBackendData(data);
  //     })
  //   },[])

  //const formik =useFormik({})
  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          console.log("UserInput", values);
          // Alert the input values of the form that we filled
          // alert(JSON.stringify(values));
          setUserCredentials({ ...values });
          authenticateUser({ ...values });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
            <div className="form">
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <span>Login</span>
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
                {/* Click on submit button to submit the form */}
                <button type="submit">Login</button>
              </form>
              <br />
              <Typography sx={{ color: colors.grey[100] }}>Or</Typography>
              <Link to="/signup" color={colors.grey[100]}>
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default SignIn;
