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
            value={value}
            sx={{
              "& .MuiLinearProgress-root": {
                backgroundColor: colors.blueAccent[500],
              },
              "& .MuiLinearProgress-barColorPrimary": {
                backgroundColor: colors.greenAccent[400],
              },
            }}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            value
          )}%`}</Typography>
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

// export default function LinearWithValueLabel() {
//   const [progress, setProgress] = React.useState(10);

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
//     }, 800);
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return (
//     <Box sx={{ width: '100%' }}>
//       <LinearProgressWithLabel value={progress} />
//     </Box>
//   );
// }
