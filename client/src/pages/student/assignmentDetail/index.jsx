import React, { useEffect } from "react";
import { Typography, Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../../theme";
import StatBox from "../../../components/StatBox";

import ActivityTracker from "../../../components/ActivityTracker";

const AssignmentDetail = (props) => {
  const { taskInfo } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const taskDetail = taskInfo?.task_detail?.summary;
  

  let short_summary =taskInfo?.task_detail?.summary.length>0 ?
   ((taskInfo?.task_detail?.summary).substring(0, 100) + " ..."):"";
  // useEffect(()=>{
  //   if(taskInfo?.task_detail){
  //     short_summary=short_summary.substring(0,7);
  //   };
  // },[taskInfo?.task_detail])

  return (
    <>
      {taskInfo !== "" && (
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100], margin: "10px 0 5px 20px" }}
          >
            Current Assignment
          </Typography>

          <Box
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            m="5px 20px"
          >
            <StatBox
              title={taskInfo?.task_detail?.title}
              summary={short_summary}
            />
          </Box>
          {/* <Box>
          <ActivityTracker />
        </Box> */}
        </Box>
      )}
    </>
  );
};

export default AssignmentDetail;
