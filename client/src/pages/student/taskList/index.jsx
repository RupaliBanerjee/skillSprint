import React, { useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { assignmentData } from "../../../data/mockData";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { ACCOUNT_TYPES } from "constants";

const TaskList = (props) => {
  //let navigate = useNavigate();
  const taskData = props.data;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const account_Type = useSelector((state) => state.userInfo.account_type);

  //Truncate String
  const truncate = (str) => {
    return str.length > 400 ? str.substring(0, 250) + "..." : str;
  };

  return (
    <Box overflow="auto" height={"55vh"}>
      {taskData?.map((assignment, i) => (
        <Box
          key={`${assignment.id}-${i}`}
          display="grid"
          gridTemplateColumns={"2fr 0.5fr 0.5fr"}
          flex={1}
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          p="15px"
          data-testid={`${
            assignment.type
              ? assignment.task_type
              : assignment.task_detail.task_type
          }-${assignment.task_id ? assignment.task_id : assignment.key}`}
        >
          <Box>
            <Typography
              color={colors.greenAccent[500]}
              variant="h5"
              fontWeight="600"
              marginBottom={"15px"}
            >
              {assignment.task_detail
                ? assignment.task_detail.title
                : assignment.title}
            </Typography>
            <Typography color={colors.greenAccent[500]}>
              {truncate(
                assignment.task_detail
                  ? assignment.task_detail.summary
                  : assignment.summary
              )}
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
              {account_Type === ACCOUNT_TYPES.STUDENT ? "View" : "Evaluate"}
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TaskList;
