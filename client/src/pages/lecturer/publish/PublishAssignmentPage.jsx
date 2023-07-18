import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  TextField,
} from "@mui/material";
import { tokens } from "theme";
import Header from "components/Header";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

const PublishAssignmentPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate=useNavigate()

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  let oldTaskKeys = null;

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const userID=useSelector((state)=>state?.userInfo?.userData.user_id);

  const updateTaskDetailDB=async(taskData)=>{
    try{
        const response=await axios.post("/addNewTask/assignment",{taskDetail:taskData});
        console.log("Check response")
        if(response.status==200){
            navigate("/lecturer/dashboard")
        }
    }catch(error){
        console.log("Check for Errors in taskDetail DB update",error)
    }
    
  }
    
  const handleFormSubmit = (values) => {
    const allFormControlValues=values;
    console.log("Check the form field Values",allFormControlValues)
    const fileData=Buffer.from(pdfFile,'base64');
    const TaskDetailNewRecord={
        key:allFormControlValues.subject_key.concat(allFormControlValues.assignment_id),
        publisher_id:userID,
        assigner_id:"",
        title:allFormControlValues.title,
        summary:allFormControlValues.summary,
        comments:{
            publisher:allFormControlValues.comments,
            assigner:"",
            student:""
        },
        pdf_file:fileData,
        start_date:startDate,
        end_date:endDate,
        task_type:"ASSIGNMENT",
        active:false
    }
    updateTaskDetailDB(TaskDetailNewRecord)
  };
 
  //   const [startDateTouched, setStartDateTouched] = useState(false);
  //   const [endDateTouched, setEndDateTouched] = useState(false);

  const getAllTaskIds = async () => {
    try {
      const taskIdList = await axios.get("/getAllTaskId");
      oldTaskKeys = taskIdList.data.map((data) => {
        const idValues = data.split("").slice(3, data.length).join("");
        return idValues;
      });
    } catch (err) {
      console.log("get TAsk Ids error", err);
    }
  };

  useEffect(() => {
    getAllTaskIds();
  }, []);

  const duplicateIdCheck = (value) => oldTaskKeys? oldTaskKeys?.indexOf(value) === -1 :true;

  /* Validation for publisg Task */
  const publishTaskSchema = yup.object().shape({
    title: yup.string().required("required"),
    summary: yup.string().required("required"),
    subject_key: yup.string().required("required"),
    assignment_id: yup
      .string()
      .required("required")
      .test("Unique", "Ids need te be unique", (value) => {
        return duplicateIdCheck(value);
      }),
    comments: yup.string().required("required"),
  });
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  const onFileUpload = (e) => {
    console.log("File Info", e);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log("Check reader value", reader.result);
      setPdfFile(reader.result);
    };
    reader.onerror = (error) => {
      console.log("FileUpload Error:", error);
    };
  };

  return (
    <Box m="5px 20px">
      {/* HEADER */}
      <Box
        display="flex"
        mb={"10px"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Header
          title="Publish New Assignment"
          subtitle="Add Assignment details"
        />
      </Box>
      <Box flex="1 1 100%" maxHeight="75vh" overflow={"auto"}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={{
            title: "",
            summary: "",
            subject_key: "",
            assignment_id: "",
            comments: "",
            start_date: null,
            end_date: null,
            pdf_file: null,
          }}
          validationSchema={publishTaskSchema}
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
                gap="15px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="textarea"
                  label="Summary"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.summary}
                  name="summary"
                  error={!!touched.summary && !!errors.summary}
                  helperText={touched.summary && errors.summary}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Subject key"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.subject_key}
                  name="subject_key"
                  error={!!touched.subject_key && !!errors.subject_key}
                  helperText={touched.subject_key && errors.subject_key}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Assignment Id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.assignment_id}
                  name="assignment_id"
                  error={!!touched.assignment_id && !!errors.assignment_id}
                  helperText={touched.assignment_id && errors.assignment_id}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="textarea"
                  label="Comments"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.comments}
                  name="comments"
                  error={!!touched.comments && !!errors.comments}
                  helperText={touched.comments && errors.comments}
                  sx={{ gridColumn: "span 4" }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disablePast
                    label="Start Date"
                    format="YYYY/MM/DD"
                    minDate={dayjs().add(5, "day")}
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue.format("YYYY/MM/DD"));
                      //await setStartDateTouched(true);
                      //onBlur();
                    }}
                    slotProps={{
                      textField: {
                        variant: "filled",
                        error: touched.start_date && !!errors.start_date,
                        helperText: touched.start_date && errors.start_date,
                      },
                    }}
                    sx={{ gridColumn: "span 2" }}
                  />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disablePast
                    label="End Date"
                    format="YYYY/MM/DD"
                    value={endDate}
                    minDate={
                      startDate !== null
                        ? dayjs(startDate).add(1, "day")
                        : dayjs().add(1, "day")
                    }
                    maxDate={dayjs().add(50, "day")}
                    onChange={(newValue) => setEndDate(newValue.format("YYYY/MM/DD"))}
                    slotProps={{
                      textField: {
                        variant: "filled",
                        error: touched.end_date && !!errors.end_date,
                        helperText: touched.end_date && errors.end_date,
                      },
                    }}
                    sx={{ gridColumn: "span 2" }}
                  />
                </LocalizationProvider>
                {/* <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address 2"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address2}
                  name="address2"
                  error={!!touched.address2 && !!errors.address2}
                  helperText={touched.address2 && errors.address2}
                  sx={{ gridColumn: "span 4" }}
                /> */}
                <TextField
                  type="file"
                  fullWidth
                  variant="filled"
                  label={!!touched.pdf_file ? "pdf file upload" :""}
                  name="pdf_file"
                  sx={{ gridColumn: "span 4", gridRow: "span 2" }}
                  onChange={onFileUpload}
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
    </Box>
  );
};

export default PublishAssignmentPage;
