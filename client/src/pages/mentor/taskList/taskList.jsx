import React, { useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "theme";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import GlobalStyles from "styles/Global.styled";
import { useSelector } from "react-redux";


const TaskList = (props) => {
  const {taskData,viewTaskDetail}=props
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  

  //Truncate String
  const truncate = (str) => {
    return str.length > 400 ? str.substring(0, 250) + "..." : str;
  };

  return (
    <Box overflow="auto" height={"60vh"}>
      {taskData?.map((project, i) => (
        <Box
          key={`${project.id}-${i}`}
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
              {project.task_detail
                ? project.task_detail.title
                : project.title}
            </Typography>
            <Typography color={colors.greenAccent[500]}>
              {truncate(
                project.task_detail
                  ? project.task_detail.summary
                  : project.summary
              )}
            </Typography>
          </Box>
          <Box color={colors.grey[100]}>{project.startDate}</Box>
          <Box borderRadius="4px">
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
              }}
              onClick={() => {
                viewTaskDetail(project);
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
