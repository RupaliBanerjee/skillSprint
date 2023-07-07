import { Box, Button,useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import BarChart from "../../../components/BarChart";
import { useNavigate } from "react-router-dom";

const ScorePage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let navigate = useNavigate();

  const viewAll=()=>{
    navigate("/viewTask");
  }

  return (
    <Box m="20px">
      <Box display={"flex"} justifyContent={"space-between"}>
        <Header title="Task Score" subtitle="Latest task score distribution" />
        <Button  sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  height:"3em"
                }}
                onClick={viewAll}>
          View ALL
        </Button>
      </Box>

      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default ScorePage;
