import * as React from "react";
import PropTypes from "prop-types";
import { tokens } from "../theme";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";

export default function LinearProgressWithLabel(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const value = parseInt(props.value);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "80%", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={value * 10}
            sx={{
              "& .MuiLinearProgress-root": {
                backgroundColor: colors.blueAccent[800],
              },
              "& .MuiLinearProgress-barColorPrimary": {
                backgroundColor: colors.greenAccent[400],
              },
              "& .MuiTypography-root": {
                color: colors.grey[400],
              },
            }}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2">{`${Math.round(value)}`}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};
