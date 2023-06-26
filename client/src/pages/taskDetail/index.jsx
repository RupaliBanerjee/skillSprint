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
import { tokens } from "../../theme";
// import { createUseStyles } from "react-jss";
import styles from "./styles.css";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import PDF_FileUpload from "../../components/PDF_FileUpload";

// const useStyles = createUseStyles({
//   title: {
//     fontSize: "14px",
//   },
// });

const TaskDetail = (props) => {
  //const classses = useStyles({ ...props });
  const taskData = props.taskData;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [showFileUpload_dialog, setShowFileUpload_dialog] = useState(false);

  const showDialog = () => {
    setShowFileUpload_dialog(!showFileUpload_dialog);
  };
  const closeDialog = () => {
    setShowFileUpload_dialog(false);
  };

  return (
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
                {taskData.title}
              </Typography>
              <IconButton type="button" onClick={showDialog}>
                <FileUploadOutlinedIcon />
              </IconButton>
            </Box>

            <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
              {taskData.summary}
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
            <Typography>{taskData.techStack}</Typography>
            <Box display={"flex"} gap={"2em"} marginTop={"20px"}>
              <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                From : {taskData.startDate}
              </Typography>
              <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
                To: {taskData.endDate}
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
  );
};

export default TaskDetail;
