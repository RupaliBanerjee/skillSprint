import React, { useState,useEffect } from "react";

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
import { useDispatch } from "react-redux";

// const useStyles = createUseStyles({
//   title: {
//     fontSize: "14px",
//   },
// });

const TaskDetail = (props) => {
  //const classses = useStyles({ ...props });
  const { taskData, activeTask ,updateTaskData} = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log("Check Task_detail for students", taskData);
  const [showFileUpload_dialog, setShowFileUpload_dialog] = useState(false);
  const [showFilePreview_dialog, setShowFilePreview_dialog] = useState(false);
  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const [newScoreDetail, setNewScoreDetail] = useState([]);

  const dispatch=useDispatch();

  useEffect(() => {
    if(taskData?.score?.length){
      setNewScoreDetail([...taskData?.score]);
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

  
  const saveScoreChanges=()=>{
    let totalScoreValue=0
    newScoreDetail.forEach((score)=>{
      totalScoreValue+=score["weightage"]
    })
    const newTaskData={...taskData,["score"]:newScoreDetail,["totalScore"]:totalScoreValue};
    updateTaskData(newTaskData);
  }

  return (
    <>
      {!showFilePreview_dialog && (
        <Box border={`4px solid ${colors.primary[500]}`} marginTop="20px">
          <Box width="100%" p="10px">
            <Box display={"flex"} justifyContent={"space-between"}>
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
                    <Tooltip title="Upload Solution">
                      <IconButton
                        type="button"
                        onClick={() => showDialog("upload")}
                      >
                        <FileUploadOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="preview PDF">
                      <IconButton
                        type="button"
                        onClick={() => showDialog("preview")}
                      >
                        <PictureAsPdfOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Enroll Now">
                      <IconButton type="button">
                        <InputOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Score">
                      <IconButton type="button">
                        <ReviewsOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <Typography
                  variant="h5"
                  sx={{ color: colors.greenAccent[500] }}
                >
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
                  Tech Stack
                </Typography>
                <Typography>
                  {activeTask
                    ? taskData.task_detail.comments.publisher
                    : taskData.comments.publisher}
                </Typography>
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
                <Box display={"flex"} justifyContent={"flex-end"} >
                    <Tooltip title="Download Solution Zip">
                      <Box borderRadius="4px" mr={2}>
                        <Button
                          sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                          }}
                          endIcon={<FileDownloadOutlinedIcon />}
                        >
                          Solution
                        </Button>
                      </Box>
                    </Tooltip>
                    <Tooltip title="Start Evaluation">
                      <Box borderRadius="4px">
                        <Button
                          sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                          }}
                          endIcon={<AppRegistrationOutlinedIcon />}
                          onClick={() => {
                            setShowScoreDialog(true);
                          }}
                        >
                          Add Score
                        </Button>
                      </Box>
                    </Tooltip>
                  </Box>
              </Box>
            </Box>
          </Box>
          {showFileUpload_dialog && (
            <PDF_FileUpload
              open={showFileUpload_dialog}
              closeDialog={closeDialog}
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
              <SliderWithInputField newScoreDetail={newScoreDetail} setNewScoreDetail={setNewScoreDetail}/>
            </DialogWithTitle>
          )}
        </Box>
      )}

      {showFilePreview_dialog && (
        <PDFView open={showFilePreview_dialog} closeDialog={closeDialog} />
      )}
    </>
  );
};

export default TaskDetail;
