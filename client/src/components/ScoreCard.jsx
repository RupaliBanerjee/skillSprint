import React from "react";
import { tokens } from "../theme";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import { scoreData } from "../data/mockData";

const ScoreCard = (props) => {
  const { scoreDetail } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //const scoreDataSet={};

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100% " }}>
      {!scoreDetail && (
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: colors.grey[100], margin: "10px 0 10px 20px" }}
        >
          Latest Score
        </Typography>
      )}

      <Box
        display={"flex"}
        flexDirection={"column"}
        marginLeft={scoreDetail ? undefined :"20px"}
        width={"100%"}
      >
        {scoreDetail
          ? Object.keys(scoreDetail?.rowData?.score).map((key) => {
              return (
                <Box width={"100%"}>
                  <Typography>{key}</Typography>
                  <LinearProgressWithLabel
                    value={parseInt(scoreDetail.rowData.score[key]) * 10}
                  />
                </Box>
              );
            })
          : scoreData.map((category, i) => {
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
