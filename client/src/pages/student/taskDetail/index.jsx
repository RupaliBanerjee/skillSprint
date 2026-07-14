import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import { tokens } from "../../../theme";
// import { createUseStyles } from "react-jss";
import styles from "./styles.css";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import PDF_FileUpload from "../../../components/PDF_FileUpload";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import PDFView from "../../../components/PDFView";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import Tooltip from "@mui/material/Tooltip";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import AddScore_Dialogue from "components/AddScore_Dialogue";
import DialogWithTitle from "common/DialogWithTitle";
import ScoreCard from "components/ScoreCard";
import SliderWithInputField from "components/SliderWithInputField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ACCOUNT_TYPES } from "constants";
import Paper from "@mui/material/Paper";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DataGrid } from "@mui/x-data-grid";

// const useStyles = createUseStyles({
//   title: {
//     fontSize: "14px",
//   },
// });

const TaskDetail = (props) => {
  //const classses = useStyles({ ...props });
  const {
    taskData,
    activeTask,
    updateTaskData,
    updateTaskDataStudent,
    navigateBack,
    setShowScoreDetail,
  } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { project_type, taskType, task_key } = useParams();

  const accountType = useSelector((state) => state?.userInfo.userData.role);

  const [showFileUpload_dialog, setShowFileUpload_dialog] = useState(false);
  const [showFilePreview_dialog, setShowFilePreview_dialog] = useState(false);
  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const [newScoreDetail, setNewScoreDetail] = useState([]);
  const [pdfFileData, setPdfFileData] = useState(null);

  /* --- New state for PROJECT sub-task grid --- */
  const [selectedSubTask, setSelectedSubTask] = useState(null);
  const [showSubTaskScoreDialog, setShowSubTaskScoreDialog] = useState(false);
  const [showSubTaskUploadDialog, setShowSubTaskUploadDialog] = useState(false);
  const [subTaskNewScore, setSubTaskNewScore] = useState([]);

  /* For all button show hide top bar */
  const [showUploadBtn, setShowUploadBtn] = useState(false);
  const [showPreviewBtn, setShowPreviewBtn] = useState(false);
  const [showEnrollBtn, setShowEnrollBtn] = useState(false);
  const [showScoreBtn, setShowScoreBtn] = useState(false);

  /* For button showhide bottom bar */
  const [showSolutionDownload, setShowSolutionDownload] = useState(false);
  const [showAddScore, setShowAddScore] = useState(false);
  const [showStudentSubmission, setShowStudentSubmissionBtn] = useState(false);
  const [showTrackProgressBtn, setShowTrackProgressBtn] = useState(false);
  const [showStudentDetailBtn, setShowStudentDetailBtn] = useState(false);

  const dispatch = useDispatch();
  const currentURL = window.location.href.split("http://localhost:3006")[1];

  useEffect(() => {
    if (taskData?.score?.length) {
      setNewScoreDetail([...taskData?.score]);
    }
    if (taskData?.pdf_file || taskData?.task_detail?.pdf_file) {
      setPdfFileData(
        taskData.pdf_file ? taskData.pdf_file : taskData?.task_detail.pdf_file,
      );
    }
    /* For Top bar button visibility */
    if (
      accountType === ACCOUNT_TYPES.STUDENT &&
      (taskData?.task_detail?.active || activeTask)
    ) {
      setShowUploadBtn(true);
    }
    if (accountType === ACCOUNT_TYPES.STUDENT && !activeTask) {
      setShowEnrollBtn(true);
    }
    if (taskData?.totalScore > 0 || taskData?.studentTaskMap?.totalScore > 0) {
      setShowScoreBtn(true);
    }
    if (taskData?.pdf_file !== "") {
      setShowPreviewBtn(true);
    }

    /* For Bottom bar button visibility */
    if (
      accountType === ACCOUNT_TYPES.LECTURER &&
      (currentURL === "/evaluate/mainPage" ||
        currentURL === "/evaluate/secondaryPage") &&
      taskData?.studentTaskMap[0].totalScore === 0
    ) {
      setShowAddScore(true);
    }

    if (
      ((Array.isArray(taskData?.studentTaskMap) &&
        taskData.studentTaskMap.every(
          (taskMap) => taskMap.solution_zip !== "",
        )) ||
        (taskData?.solution_zip && taskData.solution_zip !== "")) &&
      accountType === ACCOUNT_TYPES.LECTURER
    ) {
      setShowSolutionDownload(true);
    }
    if (
      accountType === ACCOUNT_TYPES.MENTOR &&
      (project_type === "SUBMITTED" || task_key === taskData.key)
    ) {
      setShowStudentSubmissionBtn(true);
    }
    if (accountType === ACCOUNT_TYPES.MENTOR && project_type === "ACTIVE") {
      setShowTrackProgressBtn(true);
    }
    if (
      accountType === ACCOUNT_TYPES.LECTURER &&
      (taskType === "active_assignments" || taskType === "active_projects")
    ) {
      setShowStudentDetailBtn(true);
    }
  }, [taskData]);

  const showDialog = (type) => {
    if (type === "upload") {
      setShowFileUpload_dialog(!showFileUpload_dialog);
    } else {
      setShowFilePreview_dialog(!showFilePreview_dialog);
    }
  };
  const closeDialog = () => {
    setShowFileUpload_dialog(false);
    setShowScoreDialog(false);
  };

  const saveScoreChanges = () => {
    let totalScoreValue = 0;
    newScoreDetail.forEach((score) => {
      totalScoreValue += score["weightage"];
    });
    const newTaskData = {
      ...taskData,
      ["score"]: newScoreDetail,
      ["totalScore"]: totalScoreValue,
    };
    updateTaskData(newTaskData);
  };

  /* update solution zip and student comments */
  const saveStudentSubmission = (student_comment, repo_link) => {
    const newTaskData = {
      ...taskData,
      ["solution_zip"]: repo_link,
      task_detail: {
        ...taskData.task_detail,
        comments: {
          ...taskData.task_detail.comments,
          student: student_comment,
        },
        active: false,
      },
    };
    updateTaskDataStudent(newTaskData);
    navigateBack();
  };

  /* Download Solution Zip for evaluation */
  const downloadSolution = () => {
    window.open(`${taskData.solution_zip}`);
  };

  /* For project subtask grid */
  const filteredSubTasks = (taskData?.task_detail?.subTaskInfo || []).filter(
    (subTask) => taskData?.subtask_id?.includes(subTask.task_id),
  );

  const subTaskRows = filteredSubTasks.map((subTask) => ({
    id: subTask.task_id,
    ...subTask,
  }));

  const allSubTaskScoresAdded =
    filteredSubTasks.length > 0 &&
    filteredSubTasks.every(
      (subTask) =>
        subTask.task_score?.length > 0 &&
        subTask.task_score.every((score) => score.weightage > 0),
    );

  const allSubTaskSolutionsCompleted =
    filteredSubTasks.length > 0 &&
    filteredSubTasks.every(
      (subTask) => subTask.task_repo && subTask.task_repo !== "",
    );

  const closeSubTaskDialogs = () => {
    setShowSubTaskScoreDialog(false);
    setShowSubTaskUploadDialog(false);
    setSelectedSubTask(null);
    setSubTaskNewScore([]);
  };

  const handleUpdateSubTaskScore = (subTask) => {
    setSelectedSubTask(subTask);
    setSubTaskNewScore(subTask.task_score || []);
    setShowSubTaskScoreDialog(true);
  };

  const handleViewSubTaskSolution = (subTask) => {
    if (subTask.task_repo && subTask.task_repo !== "") {
      window.open(subTask.task_repo, "_blank", "noopener,noreferrer");
    }
  };

  const handleSubTaskSolutionAction = (subTask) => {
    setSelectedSubTask(subTask);
    setShowSubTaskUploadDialog(true);
  };

  const saveSubTaskScore = () => {
    if (!selectedSubTask) return;
    // subTaskNewScore is a CategorySchema[]: [{ name, weightage }, ...]
    const updatedSubTaskInfo = taskData.task_detail.subTaskInfo.map(
      (subTask) =>
        subTask.task_id === selectedSubTask.task_id
          ? { ...subTask, task_score: subTaskNewScore }
          : subTask,
    );
    const newTaskData = {
      ...taskData,
      task_detail: {
        ...taskData.task_detail,
        subTaskInfo: updatedSubTaskInfo,
      },
    };
    updateTaskData(newTaskData);
    closeSubTaskDialogs();
  };

  const saveSubTaskSolution = (student_comment, repo_link) => {
    if (!selectedSubTask) return;
    const updatedSubTaskInfo = taskData.task_detail.subTaskInfo.map(
      (subTask) =>
        subTask.task_id === selectedSubTask.task_id
          ? {
              ...subTask,
              task_repo: repo_link,
            }
          : subTask,
    );
    const newTaskData = {
      ...taskData,
      task_detail: {
        ...taskData.task_detail,
        subTaskInfo: updatedSubTaskInfo,
      },
    };
    updateTaskDataStudent(newTaskData);
    closeSubTaskDialogs();
  };

  const handleSubmitProjectEvaluation = () => {
    const newTaskData = {
      ...taskData,
      evaluationSubmitted: true,
    };
    updateTaskData(newTaskData);
  };

  const handleSubmitProjectSolution = () => {
    const newTaskData = {
      ...taskData,
      submitted: true,
      task_detail: {
        ...taskData.task_detail,
        active: false,
      },
    };
    updateTaskDataStudent(newTaskData);
    navigateBack();
  };

  const lecturerSubTaskColumns = [
    { field: "task_id", headerName: "ID", width: 90 },
    { field: "task_label", headerName: "Title", width: 200 },
    { field: "task_detail", headerName: "Description", flex: 1, minWidth: 220 },
    {
      field: "evaluate",
      headerName: "Evaluate",
      width: 280,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box display="flex" gap="0.5em">
          <Button
            size="small"
            variant="contained"
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
            }}
            onClick={() => handleUpdateSubTaskScore(params.row)}
          >
            Update Score
          </Button>
          <Button
            size="small"
            variant="outlined"
            disabled={!params.row.solution_link}
            onClick={() => handleViewSubTaskSolution(params.row)}
          >
            View Solution
          </Button>
        </Box>
      ),
    },
  ];

  const studentSubTaskColumns = [
    { field: "task_id", headerName: "ID", width: 90 },
    { field: "task_label", headerName: "Title", width: 200 },
    { field: "task_detail", headerName: "Description", flex: 1, minWidth: 220 },
    {
      field: "solution",
      headerName: "Solution",
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          size="small"
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          }}
          startIcon={
            params.row.solution_uploaded ? (
              <EditOutlinedIcon />
            ) : (
              <FileUploadOutlinedIcon />
            )
          }
          onClick={() => handleSubTaskSolutionAction(params.row)}
        >
          {params.row.solution_uploaded ? "Edit" : "Upload"}
        </Button>
      ),
    },
  ];

  return (
    <>
      <Paper
        elevation={3}
        sx={{ border: `4px solid ${colors.primary[500]}`, marginTop: "20px" }}
      >
        {!showFilePreview_dialog && (
          <Box width="100%" sx={{ minWidth: "60rem" }} p="10px">
            <Box display="flex" flexDirection={"column"}>
              <Box display="flex" justifyContent="space-between">
                <Typography
                  variant="h4"
                  margin={"10px 0 10px 0"}
                  paddingBottom="10px"
                  borderBottom={`2px solid ${colors.grey[200]}`}
                  sx={{ color: colors.grey[200] }}
                  className={styles.label}
                >
                  {activeTask ? taskData.task_detail.title : taskData.title}
                </Typography>
                {/* Show top bar actions */}
                <Box display="flex" justifyContent="flex-end">
                  {showUploadBtn && (
                    <Tooltip title="Upload Solution">
                      <IconButton
                        type="button"
                        onClick={() => showDialog("upload")}
                      >
                        <FileUploadOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {showPreviewBtn && (
                    <Tooltip title="preview PDF">
                      <IconButton
                        type="button"
                        onClick={() => showDialog("preview")}
                      >
                        <PictureAsPdfOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {showEnrollBtn && (
                    <Tooltip title="Enroll Now">
                      <IconButton type="button">
                        <InputOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {showScoreBtn && (
                    <Tooltip title="View Score">
                      <IconButton type="button" onClick={setShowScoreDetail}>
                        <ReviewsOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>

              <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                {activeTask ? taskData.task_detail.summary : taskData.summary}
              </Typography>
              <Typography
                variant="h4"
                margin={"10px 0 10px 0"}
                paddingBottom="10px"
                borderBottom={`2px solid ${colors.grey[200]}`}
                sx={{ color: colors.grey[200] }}
                className={styles.label}
              >
                Description
              </Typography>
              <Typography
                borderBottom={`1px solid ${colors.primary[500]}`}
                marginBottom={"10px"}
              >
                Deliverables :{" "}
              </Typography>
              <Typography>
                {activeTask
                  ? taskData.task_detail.comments.publisher
                  : taskData.comments.publisher}
              </Typography>
              {taskData?.task_detail?.subTaskInfo?.length > 0 && (
                <Box mt="2em">
                  <Typography variant="h6">Sub-tasks:</Typography>
                  <Box mt="1em">
                    <Box sx={{ width: "100%" }}>
                      <DataGrid
                        autoHeight
                        rows={subTaskRows}
                        columns={
                          accountType === ACCOUNT_TYPES.LECTURER
                            ? lecturerSubTaskColumns
                            : studentSubTaskColumns
                        }
                        disableRowSelectionOnClick
                        hideFooterSelectedRowCount
                        pageSizeOptions={[5, 10, 25]}
                        initialState={{
                          pagination: { paginationModel: { pageSize: 5 } },
                        }}
                      />
                    </Box>
                    <Box display="flex" justifyContent="flex-end" mt="1em">
                      {accountType === ACCOUNT_TYPES.LECTURER &&
                        allSubTaskScoresAdded && (
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: colors.blueAccent[700],
                              color: colors.grey[100],
                            }}
                            onClick={handleSubmitProjectEvaluation}
                          >
                            Submit
                          </Button>
                        )}
                      {accountType === ACCOUNT_TYPES.STUDENT &&
                        allSubTaskSolutionsCompleted && (
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: colors.blueAccent[700],
                              color: colors.grey[100],
                            }}
                            onClick={handleSubmitProjectSolution}
                          >
                            Submit
                          </Button>
                        )}
                    </Box>
                  </Box>
                </Box>
              )}
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box display={"flex"} gap={"2em"} marginTop={"20px"}>
                  <Typography
                    variant="h5"
                    sx={{ color: colors.greenAccent[500] }}
                  >
                    From :{" "}
                    {activeTask
                      ? taskData.task_detail.start_date
                      : taskData.start_date}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ color: colors.greenAccent[500] }}
                  >
                    To:{" "}
                    {activeTask
                      ? taskData.task_detail.end_date
                      : taskData.end_date}
                  </Typography>
                </Box>
              </Box>
              {/* Button Container Div  for solution and add score*/}
              <Box display={"flex"} justifyContent={"flex-end"}>
                {showSolutionDownload && (
                  <Tooltip title="Download Solution Zip">
                    <Button
                      sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        borderRadius: "4px",
                        mr: "0.5rem",
                      }}
                      endIcon={<FileDownloadOutlinedIcon />}
                      onClick={downloadSolution}
                    >
                      Solution
                    </Button>
                  </Tooltip>
                )}

                {showAddScore && (
                  <Tooltip title="Start Evaluation">
                    <Button
                      sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        borderRadius: "4px",
                        mr: "0.5rem",
                      }}
                      endIcon={<AppRegistrationOutlinedIcon />}
                      onClick={() => {
                        setShowScoreDialog(true);
                      }}
                      data-testid="add-score-btn"
                    >
                      Add Score
                    </Button>
                  </Tooltip>
                )}
                {showStudentSubmission && (
                  <Tooltip title="Show submission details">
                    <Button
                      sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        borderRadius: "4px",
                        mr: "0.5rem",
                      }}
                      endIcon={<AppRegistrationOutlinedIcon />}
                      onClick={() => {
                        if (currentURL !== " /mentor/dashboard") {
                          navigate(
                            `/mentor/studentSubmission/${taskData?.key}`,
                          );
                        }
                      }}
                    >
                      View Submission
                    </Button>
                  </Tooltip>
                )}
                {showTrackProgressBtn && (
                  <Tooltip title="Show subtask details">
                    <Button
                      sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        borderRadius: "4px",
                        mr: "0.5rem",
                      }}
                      endIcon={<AppRegistrationOutlinedIcon />}
                      onClick={() => {
                        navigate(`/studentTaskDetail/${taskData?.key}`);
                      }}
                    >
                      Track Progress
                    </Button>
                  </Tooltip>
                )}
                {showStudentDetailBtn && (
                  <Tooltip title="Show subtask details">
                    <Button
                      sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        borderRadius: "4px",
                        mr: "0.5rem",
                      }}
                      endIcon={<AppRegistrationOutlinedIcon />}
                      onClick={() => {
                        navigate(
                          `/lecturer/studentTaskDetail/${taskData?.task_type}/${taskData?.key}`,
                        );
                      }}
                    >
                      Student Detail
                    </Button>
                  </Tooltip>
                )}
              </Box>
            </Box>
          </Box>
        )}
        {showFileUpload_dialog && (
          <PDF_FileUpload
            open={showFileUpload_dialog}
            closeDialog={closeDialog}
            saveStudentSubmission={saveStudentSubmission}
          />
        )}
        {showScoreDialog && (
          // <AddScore_Dialogue open={showScoreDialog} scoreDetail={taskData.score} closeDialog={closeDialog}/>
          <DialogWithTitle
            oncloseDialog={closeDialog}
            openDialog={showScoreDialog}
            title="Add Score"
            showActionButton={true}
            saveScoreChanges={saveScoreChanges}
          >
            <SliderWithInputField
              newScoreDetail={newScoreDetail}
              setNewScoreDetail={setNewScoreDetail}
            />
          </DialogWithTitle>
        )}
        {showFilePreview_dialog && (
          <PDFView
            open={showFilePreview_dialog}
            closeDialog={closeDialog}
            pdfFileData={pdfFileData}
          />
        )}
        {/* PROJECT sub-task: score dialog (Lecturer) */}
        {showSubTaskScoreDialog && (
          <DialogWithTitle
            oncloseDialog={closeSubTaskDialogs}
            openDialog={showSubTaskScoreDialog}
            title={`Add Score - ${selectedSubTask?.task_label || ""}`}
            showActionButton={true}
            saveScoreChanges={saveSubTaskScore}
          >
            <SliderWithInputField
              newScoreDetail={subTaskNewScore}
              setNewScoreDetail={setSubTaskNewScore}
            />
          </DialogWithTitle>
        )}

        {/* PROJECT sub-task: upload/edit solution dialog (Student) */}
        {showSubTaskUploadDialog && (
          <PDF_FileUpload
            open={showSubTaskUploadDialog}
            closeDialog={closeSubTaskDialogs}
            saveStudentSubmission={saveSubTaskSolution}
          />
        )}
      </Paper>
    </>
  );
};

export default TaskDetail;
