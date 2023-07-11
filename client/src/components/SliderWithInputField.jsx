import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Grid,
  Slider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { tokens } from "theme";

// const Input = styled(MuiInput)`
//   width: 42px;
// `;
//https://stackoverflow.com/questions/58572135/need-to-get-the-last-value-of-onchange-for-a-slider-react
const SliderWithInputField = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { newScoreDetail ,setNewScoreDetail} = props;
//   const [newScoreDetail, setNewScoreDetail] = useState([]);

//   useEffect(() => {
//     setNewScoreDetail([...scoreDetail]);
//   }, [scoreDetail]);

  const handleSliderChange = (event, newValue, index) => {
    
    //const newScoreData=[...newScoreDetail]
    //newScoreData[index]["weightage"]=newValue;
    //console.log("New score Data",newScoreData[i])
    //setNewScoreDetail(newScoreData);
    const newArray = newScoreDetail.map((item, i) => {
        if (index === i && item.name===event.target.name) {
          return { ...item, ["weightage"]: event.target.value };
        } else {
          return item;
        }
      });
      console.log("Check newArray",newArray);
      setNewScoreDetail([...newArray])
  };

  //   const handleInputChange = (event) => {
  //     setValue(event.target.value === "" ? "" : Number(event.target.value));
  //   };

  const handleBlur = () => {
    // if (value < 0) {
    //   setValue(0);
    // } else if (value > 9) {
    //   setValue(10);
    // }
  };

  return (
    <Box sx={{ width: "40vh" }}>
      <Box
        display="flex"
        flexDirection={"column"}
        spacing={2}
        pt={2}
        alignItems="flex-start"
      >
        {newScoreDetail.length &&
          newScoreDetail.map((scoreCriteria, index) => {
            return (
              <Box key={index} width={"45vh"}>
                <Typography
                  variant="h5"
                  sx={{
                    color: colors.grey[400],
                  }}
                  gutterBottom
                >
                  {scoreCriteria.name}
                </Typography>
                <Slider
                  key={`${scoreCriteria.name}_${index}`}
                  aria-label="Always visible"
                  value={
                    scoreCriteria.weightage
                  }
                  
                  name={scoreCriteria.name}
                  onChange={(event, newValue) =>
                    handleSliderChange(event, newValue, index )
                  }
                  valueLabelDisplay="auto"
                  aria-labelledby="input-slider"
                  min={0}
                  max={10}
                  sx={{
                    "& .MuiSlider-rail": {
                      backgroundColor: colors.blueAccent[500],
                    },
                    "& .MuiSlider-track, & .MuiSlider-thumb": {
                      backgroundColor: colors.greenAccent[400],
                    },
                    "& .MuiSlider-thumb": {
                      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                        boxShadow: "inherit",
                      },
                      "&:before": {
                        display: "none",
                      },
                    },
                  }}
                />
              </Box>
            );
          })}

        {/* <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 0,
              max: 10,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid> */}
      </Box>
    </Box>
  );
};

export default SliderWithInputField;
