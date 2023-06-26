import React from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from '../theme';
import BarChart from "./BarChart"

const ActivityTracker = () => {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box height="250px" mt="-20px">
        <BarChart isDashboard={true} />
    </Box>
  )
}

export default ActivityTracker
