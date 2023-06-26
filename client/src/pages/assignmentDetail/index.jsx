import React from "react";
import { Typography, Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../theme";
import StatBox from "../../components/StatBox";

import ActivityTracker from "../../components/ActivityTracker";

const AssignmentDetail = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: colors.grey[100], margin: "20px 0 10px 20px" }}
      >
        Current Assignment
      </Typography>

      <Box
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        m="10px 20px"
      >
        <StatBox
          title="Todo List App"
          summary="Build a fully functional 'Todo List' Application"
          endDate="31-06-23"
        />
      </Box>
      {/* <Box>
        <ActivityTracker />
      </Box> */}
    </Box>
  );
};

export default AssignmentDetail;
