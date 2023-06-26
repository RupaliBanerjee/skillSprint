import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, summary, endDate }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%">
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display="flex" flexDirection={"column"}>
          <Typography variant="h5" sx={{ color: colors.grey[200] }}>
            {title}
          </Typography>
          <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>
            {summary}
          </Typography>
          <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>
            {endDate}
          </Typography>
        </Box>
        {/* <Box display={"flex"} flexDirection={"column"} justifyContent="center" alignItems="center">
          <ProgressCircle progress={progress} />
          <Typography variant="h6" sx={{ color: colors.greenAccent[500] }}>
            {progressPercentage}
          </Typography>
        </Box> */}
      </Box>
    </Box>
  );
};

export default StatBox;
