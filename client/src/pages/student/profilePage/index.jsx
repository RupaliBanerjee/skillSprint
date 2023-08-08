import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../common/Header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { updateUserData } from "store/userInfo/userInfoSlice";

const ProfilePage = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const userData = useSelector((state) => state.userInfo.userData);
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleFormSubmit = async(values) => {
   try{
    const updatedProfileData={...userData,...values}
    
    const response=await axios.post("/updateProfile/data",{profileData:updatedProfileData})
    if(response.status===200){
      dispatch(updateUserData({...updatedProfileData}))
      navigate("/lecturer/dashboard");
    }
   }catch(err){
    console.log("Profile update error",err)
   }
  };

  return (
    <Box m="20px">
      <Header title="USER DATA" subtitle="Profile Information" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          contact_no: userData.contact_no,
          address_1:userData.address_1,
          address_2:userData.address_2
        }}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.first_name}
                name="first_name"
                error={!!touched.first_name && !!errors.first_name}
                helperText={touched.first_name && errors.first_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name}
                name="last_name"
                error={!!touched.last_name && !!errors.last_name}
                helperText={touched.last_name && errors.last_name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact_no}
                name="contact_no"
                error={!!touched.contact_no && !!errors.contact_no}
                helperText={touched.contact_no && errors.contact_no}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address_1}
                name="address_1"
                error={!!touched.address_1 && !!errors.address_1}
                helperText={touched.address_1 && errors.address_1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address_2}
                name="address_2"
                error={!!touched.address_2 && !!errors.address_2}
                helperText={touched.address_2 && errors.address_2}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Save
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact_no: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address_1: yup.string().required("required"),
  address_2: yup.string().required("required"),
});
const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  contact_no: "",
  address_1: "",
  address_2: "",
};

export default ProfilePage;
