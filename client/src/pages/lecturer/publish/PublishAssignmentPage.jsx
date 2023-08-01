import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  TextField,
  Stack,
  Paper,
  Chip,
} from "@mui/material";
import { tokens } from "theme";
import Header from "components/Header";
import { Formik, Field, FieldArray } from "formik";
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
import DynamicList from "components/DynamicList";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { styled } from "@mui/material/styles";
import { MuiChipsInput } from "mui-chips-input";
import { ACCOUNT_TYPES } from "constants";
import DialogWithTitle from "common/DialogWithTitle";
import AddSubTask from "pages/mentor/addSubTask";

const PublishAssignmentPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [showSubTaskDialog, setShowSubTaskDialog] = useState(false);
  const [taskId, setTaskId] = useState();
  const [subTaskData, setSubTaskData] = useState([]);
  const [formDetails, setFormDetails] = useState();
  /* Add and Delete assesment criteria */
  const [criteriaList, setCriteriaList] = useState([
    "accuracy",
    "code quality",
    "documentation",
    "basic functionality",
  ]);
  let oldTaskKeys = null;

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const userID = useSelector((state) => state?.userInfo?.userData.user_id);
  const accountType = useSelector((state) => state?.userInfo.userData.role);

  const updateTaskDetailDB = async (taskData) => {
    try {
      const response = await axios.post("/lecturer/addNewTask/assignment", {
        taskDetail: taskData,
      });

      if (response.status === 200) {
        if (accountType === ACCOUNT_TYPES.LECTURER) {
          navigate("/lecturer/dashboard");
        } else {
          navigate("/mentor/dashboard");
        }
      }
    } catch (error) {
      console.log("Check for Errors in taskDetail DB update", error);
    }
  };

  const oncloseDialog = () => {
    setShowSubTaskDialog(false);
  };

  const setSubTaskInfo = (subTaskInfo) => {
    setSubTaskData([...subTaskInfo]);
  };

  const handleFormSubmit = (values) => {
    const allFormControlValues = values;
    setTaskId(
      allFormControlValues.subject_key.concat(
        allFormControlValues.assignment_id
      )
    );
    if (accountType === ACCOUNT_TYPES.LECTURER) {
      const TaskDetailNewRecord = {
        key: allFormControlValues.subject_key.concat(
          allFormControlValues.assignment_id
        ),
        publisher_id: userID,
        assigner_id: "",
        title: allFormControlValues.title,
        summary: allFormControlValues.summary,
        comments: {
          publisher: allFormControlValues.comments,
          assigner: "",
          student: "",
        },
        pdf_file: pdfFile,
        start_date: startDate,
        end_date: endDate,
        task_type: "ASSIGNMENT",
        active: false,
        assesment_criteria: [...criteriaList],
      };
      updateTaskDetailDB(TaskDetailNewRecord);
    } else {
      setShowSubTaskDialog(true);
      setFormDetails({ ...allFormControlValues });
    }
  };

  //   const [startDateTouched, setStartDateTouched] = useState(false);
  //   const [endDateTouched, setEndDateTouched] = useState(false);

  const getAllTaskIds = async () => {
    try {
      const taskIdList = await axios.get("/lecturer/getAllTaskId");
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

  useEffect(() => {
    if (subTaskData.length > 0) {
      const TaskDetailNewRecord = {
        key: formDetails.subject_key.concat(formDetails.assignment_id),
        publisher_id: "2117280001",
        assigner_id: userID,
        title: formDetails.title,
        summary: formDetails.summary,
        comments: {
          publisher: formDetails.comments,
          assigner: "",
          student: "",
        },
        pdf_file: pdfFile,
        start_date: startDate,
        end_date: endDate,
        task_type: "ASSIGNMENT",
        active: false,
        assesment_criteria: [...criteriaList],
        subTaskInfo: [...subTaskData],
      };
      updateTaskDetailDB(TaskDetailNewRecord);
    }
  }, [subTaskData]);

  const duplicateIdCheck = (value) =>
    oldTaskKeys ? oldTaskKeys?.indexOf(value) === -1 : true;

  /* Validation for publish Task */
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

  const onFileUpload = (e) => {
    console.log("File Info", e);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPdfFile(reader.result);
    };
    reader.onerror = (error) => {
      console.log("FileUpload Error:", error);
    };
  };

  //const handleCriteriaChange = (chipValue, chipIndex) => {};
  const handleAddChip = (chipValue, chipIndex) => {
    setCriteriaList((prevState) => [...prevState, chipValue]);
    //console.log("New chip add action" ,chipValue,chipIndex)
  };
  const deleteChip = (chipValue, chipIndex) => {
    const newCriteriaList = criteriaList;
    newCriteriaList.splice(chipIndex, 1);
    setCriteriaList([...newCriteriaList]);
  };

  return (
    <Box m="0px 20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={
            accountType === ACCOUNT_TYPES.MENTOR
              ? "Publish New Project"
              : "Publish New Assignment"
          }
          subtitle={
            accountType === ACCOUNT_TYPES.MENTOR
              ? "Add Project details"
              : "Add Assignment details"
          }
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
            criteria: [
              "accuracy",
              "code quality",
              "documentation",
              "basic functionality",
            ],
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
              <Box display="flex" justifyContent="end" mb={2}>
                <Button type="submit" color="secondary" variant="contained">
                  Save
                </Button>
              </Box>
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
                  label={
                    accountType === ACCOUNT_TYPES.MENTOR
                      ? "Project Id"
                      : "Assignment Id"
                  }
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
                    onChange={(newValue) =>
                      setEndDate(newValue.format("YYYY/MM/DD"))
                    }
                    slotProps={{
                      textField: {
                        variant: "filled",
                        error: touched.end_date && !!errors.end_date,
                        helperText: touched.end_date && errors.end_date,
                      },
                    }}
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
                  label={!!touched.pdf_file ? "pdf file upload" : ""}
                  name="pdf_file"
                  sx={{ gridColumn: "span 2" }}
                  onChange={onFileUpload}
                />
                <Box sx={{ gridColumn: "span 4" }}>
                  <Typography sx={{ display: "block", margin: "0.5rem 0" }}>
                    Assesment Criteria
                  </Typography>
                  <FieldArray
                    fullWidth
                    variant="filled"
                    name="criteria"
                    label="Assesment Criteria"
                    render={(arrayHelpers) => (
                      <>
                        <MuiChipsInput
                          value={criteriaList}
                          onAddChip={handleAddChip}
                          onDeleteChip={deleteChip}
                        />
                        {/* <input  label="Assesment Criteria"/> */}
                      </>
                    )}
                  />
                </Box>
              </Box>
            </form>
          )}
        </Formik>
        {showSubTaskDialog && (
          <DialogWithTitle
            oncloseDialog={oncloseDialog}
            openDialog={showSubTaskDialog}
            title="Add Subtask Details"
            showActionButton={false}
            dialogWidth={"100vh"}
          >
            <AddSubTask setSubTaskInfo={setSubTaskInfo} task_id={taskId} />
          </DialogWithTitle>
        )}
      </Box>
    </Box>
  );
};

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default PublishAssignmentPage;
