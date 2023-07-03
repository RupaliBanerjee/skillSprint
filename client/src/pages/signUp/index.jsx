import React, { useState, useEffect } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "theme";
import Signup from "styles/SignUp.styled";
//import "./signIn.css";
// import { useGetUserQuery } from "store/api";
// import { useSelector } from "react-redux";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// Creating schema
const schema = Yup.object().shape({
  first_name: Yup.string().required("required"),
  last_name: Yup.string().required("required"),
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

  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Formik
          validationSchema={schema}
          initialValues={{
            first_name: "",
            last_name: "",
            contact_no: "",
            email: "",
            password: "",
            role: "",
          }}
          onSubmit={(values) => {
            // Alert the input values of the form that we filled
            alert(JSON.stringify(values));
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
            <Box
              className="form"
              sx={{
                minWidth: "60vh",
                marginBottom: "0",
              }}
            >
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <span>Sign up</span>
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
                <select
                  type="select"
                  name="role"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.role}
                  placeholder="Account Type"
                  className="form-control"
                >
                  <option value="student">Student</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="mentor">Mentor</option>
                </select>
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
      </Box>
    </>
  );
};

export default SignUp;
