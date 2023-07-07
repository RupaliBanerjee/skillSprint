import React, { useState } from "react";

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

// const useStyles = createUseStyles({
//   title: {
//     fontSize: "14px",
//   },
// });

const TaskDetail = (props) => {
  //const classses = useStyles({ ...props });
  const { taskData, activeTask } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [showFileUpload_dialog, setShowFileUpload_dialog] = useState(false);
  const [showFilePreview_dialog, setShowFilePreview_dialog] = useState(false);

  const showDialog = (type) => {
    if (type === "upload") {
      setShowFileUpload_dialog(!showFileUpload_dialog);
    } else {
      setShowFilePreview_dialog(!showFilePreview_dialog);
    }
  };
  const closeDialog = () => {
    setShowFileUpload_dialog(false);
  };

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
            </Box>
          </Box>
          {showFileUpload_dialog && (
            <PDF_FileUpload
              open={showFileUpload_dialog}
              closeDialog={closeDialog}
            />
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
