import React from "react";
import { tokens } from "../theme";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import { scoreData } from "../data/mockData";

const ScoreCard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100% " }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: colors.grey[100], margin: "10px 0 10px 20px" }}
      >
        Latest Score
      </Typography>

      <Box
        display={"flex"}
        flexDirection={"column"}
        marginLeft="20px"
        width={"100%"}
      >
        {scoreData.map((category, i) => {
          while (i < 4) {
            return (
              <Box width={"100%"}>
                <Typography>{category.criteria}</Typography>
                <LinearProgressWithLabel value={category.marks * 10} />
              </Box>
            );
          }
        })}
      </Box>
    </Box>
  );
};

export default ScoreCard;
