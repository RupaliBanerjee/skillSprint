import React, { useEffect, useState } from "react";
import { tokens } from "theme";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import TaskDetail from "pages/student/taskDetail";
import Header from "components/Header";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ScoreCard from "components/ScoreCard";

import DialogWithTitle from "common/DialogWithTitle";

const MentorTaskDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { task_key } = useParams();

  const navigate = useNavigate();

  const [showScoreDetail, setShowScoreDetail] = useState(false);
  const data = useSelector((state) => {
    const taskData = state.mentorTaskInfo.submitted_list.filter(
      (task) => task.key === task_key
    )[0];
    return taskData;
  });

  const oncloseDialog = () => {
    setShowScoreDetail(false);
  };
  return (
    <>
    
        <Box m="10px 20px">
          {/* HEADER */}
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box
              display="flex"
              mb={"10px"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Header title="Details Page" subtitle="View submission details" />
            </Box>
            <Box>
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  marginTop: "2rem",
                }}
                onClick={() => {
                  navigate(-1);
                }}
              >
                Back
              </Button>
            </Box>
          </Box>

          <Box
            flex="1 1 100%"
            height="75vh"
            backgroundColor={colors.primary[400]}
          >
            <TaskDetail
              activeTask={false}
              taskData={data}
              setShowScoreDetail={setShowScoreDetail}
            />
          </Box>
        </Box>
    

      {showScoreDetail && (
        <DialogWithTitle
          oncloseDialog={oncloseDialog}
          openDialog={showScoreDetail}
          title="Score Details"
          showActionButton={false}
        >
          <ScoreCard
            scoreDetail={data.studentTaskMap.score}
            showLabel={false}
          ></ScoreCard>
        </DialogWithTitle>
      )}
    </>
  );
};

export default MentorTaskDetails;
