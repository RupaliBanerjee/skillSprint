import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  Dialog,
  useTheme,
} from "@mui/material";
import { tokens } from "theme";

const NoRecordsPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="0px 20px">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: colors.primary[400], minHeight: "40vh" }}
      >
        <Typography variant="h1">No records found</Typography>
      </Box>
    </Box>
  );
};

export default NoRecordsPage;
