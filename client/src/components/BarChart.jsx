import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";

import { student_data } from "../data/mockData";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ACCOUNT_TYPES } from "constants";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const accountType = useSelector((state) => state.userInfo.account_type);
  const studentData_from_submitted_list = useSelector(
    (state) => state?.userTaskMap?.submitted_task
  );

  const [studentData, setStudentData] = useState([]);

  const createBarChartData = () => {
    const barChartData = studentData.map((data) => {
      let scoreData = data.score.map((scoreData) => {
        return {
          [scoreData.name]: scoreData.weightage,
        };
      });
      scoreData = Object.assign({}, ...scoreData);
      return {
        ...data,
        score: { ...scoreData },
      };
    });
    console.log("Check Student barChartData", barChartData);
    return barChartData;
  };

  useEffect(() => {
    if (accountType === ACCOUNT_TYPES.STUDENT) {
      setStudentData([...studentData_from_submitted_list]);
    }
  }, [accountType]);

  const generateHSLColor = (index, total) => {
    const hue = (index * (360 / total)) % 360;
    const saturation = "70%";
    const lightness = "50%";
    return `hsl(${hue}, ${saturation}, ${lightness})`;
  };

  const getRecordCount = () => {
    let recordCount = 0;
    if (isDashboard) {
      recordCount = 5;
    } else {
      recordCount =
        student_data[0]?.task_list.length > 10
          ? 10
          : student_data[0]?.task_list.length;
    }
    return recordCount;
  };

  const recordCount = getRecordCount();
  let taskData = student_data[0]?.task_list.slice(0, recordCount);

  const uniqueCriteria = [];
  const nivoData = [];

  if (accountType === ACCOUNT_TYPES.STUDENT) {
    let studentData_with_score = [];
    if (studentData.length > 0) {
      studentData_with_score = createBarChartData();
    }
    studentData_with_score.map((task) => {
      const nivoDataObj = { taskKey: task.task_id };
      let criteria = [];
      Object.keys(task.score).map((key, score_index) => {
        const color = () => {
          return generateHSLColor(score_index, Object.keys(task.score).length);
        };
        if (uniqueCriteria.indexOf(key) === -1) {
          uniqueCriteria.push(key);
        }
        const item = {
          [key]: task.score[key],
          [`${key}color`]: color(),
        };

        criteria.push(item);
        return;
      });
      criteria.forEach((element) => {
        Object.assign(nivoDataObj, element);
      });

      nivoData.push(nivoDataObj);
      return;
    });
  } else {
    taskData?.map((task, task_index) => {
      const nivoDataObj = { taskKey: task.key };
      let criteria = [];
      Object.keys(task.score).map((key, score_index) => {
        const color = () => {
          return generateHSLColor(score_index, Object.keys(task.score).length);
        };
        if (uniqueCriteria.indexOf(key) === -1) {
          uniqueCriteria.push(key);
        }
        const item = {
          [key]: task.score[key],
          [`${key}color`]: color(),
        };

        criteria.push(item);
        return;
      });
      criteria.forEach((element) => {
        Object.assign(nivoDataObj, element);
      });

      nivoData.push(nivoDataObj);
      return;
    });
  }

 

  return (
    <ResponsiveBar
      groupMode="grouped"
      data={nivoData}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={uniqueCriteria}
      indexBy="taskKey"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "TASK IDS", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Score weightage", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      tooltip={(e) => {
        return (
          <div
            style={{
              padding: 12,
              color: "#ffffff",
              background: "#222222",
            }}
          >
            <span>
              {e.id}: &nbsp; {e.formattedValue}
            </span>
            <br />
            <strong>in task: {e.indexValue}</strong>
          </div>
        );
        //return e.id + ": " + e.formattedValue + " in task: " + e.indexValue;
      }}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in task: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
