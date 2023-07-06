import React, { useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { assignmentData } from "../../data/mockData";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles.css";


const TaskList = (props) => {
  //let navigate = useNavigate();
  const taskData = props.data;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //Truncate String
  const truncate = (str) => {
    return str.length > 400 ? str.substring(0, 250) + "..." : str;
  };
  
  return (
    <Box overflow="auto" height={"55vh"}>
      {taskData.map((assignment, i) => (
        <Box
          key={`${assignment.id}-${i}`}
          display="grid"
          gridTemplateColumns={"2fr 0.5fr 0.5fr"}
          flex={1}
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          p="15px"
        >
          <Box>
            <Typography
              color={colors.greenAccent[500]}
              variant="h5"
              fontWeight="600"
              marginBottom={"15px"}
            >
              {assignment.task_detail.title}
            </Typography>
            <Typography color={colors.greenAccent[500]}>
              {truncate(assignment.task_detail.summary)}
            </Typography>
          </Box>
          <Box color={colors.grey[100]}>{assignment.startDate}</Box>
          <Box borderRadius="4px">
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
              }}
              onClick={() => {
                props.viewTaskDetail(assignment);
              }}
              endIcon={<SendIcon />}
            >
              View
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TaskList;
