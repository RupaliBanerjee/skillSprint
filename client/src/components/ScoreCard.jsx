import React from "react";
import { tokens } from "../theme";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import { scoreData } from "../data/mockData";

const ScoreCard = (props) => {
  const { scoreDetail, showLablel } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //const scoreDataSet={};

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100% " }}>
      {showLablel && (
        <Typography
          variant="h4"
          key={"score_title"}
          fontWeight="bold"
          sx={{ color: colors.grey[100], margin: "10px 0 10px 20px" }}
        >
          Latest Score
        </Typography>
      )}
      <Box
        key={"score_card_container"}
        display={"flex"}
        flexDirection={"column"}
        marginLeft={!showLablel ? undefined : "20px"}
        width={"100%"}
        sx={{ color: colors.grey[100] }}
      >
        {scoreDetail
          ? scoreDetail.map((score, index) => {
              return (
                <Box width={"100%"} key={`${score.name}-${index}`}>
                  <Typography sx={{ color: colors.grey[100] }}>
                    {score.name}
                  </Typography>
                  <LinearProgressWithLabel value={parseInt(score.weightage)} />
                </Box>
              );
            })
          : scoreData.map((category, i) => {
              while (i < 4) {
                return (
                  <Box width={"100%"} key={`${category.criteria}-${i}`}>
                    <Typography sx={{ color: colors.grey[100] }}>
                      {category.criteria}
                    </Typography>
                    <LinearProgressWithLabel value={parseInt(category.marks)} />
                  </Box>
                );
              }
            })}
      </Box>
    </Box>
  );
};

export default ScoreCard;
