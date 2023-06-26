import React, { useState } from "react";
import PropTypes from "prop-types";
import TaskList from "../pages/taskList";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import { tokens } from "../theme";
import TaskDetail from "../pages/taskDetail";

function TabPanel(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { children, value, index, data, ...other } = props;
  const [taskData, setTaskData] = React.useState();
  const [showBackButton, setShowBackButton] = useState(false);

  const viewTaskDetail = (task) => {
    console.log("TaskData", task);
    console.log(taskData);
    setTaskData(task);
    console.log(taskData);
    setShowBackButton(true);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between">
            <Typography
              color={colors.grey[100]}
              variant="h5"
              fontWeight="600"
              
              
            >
              {children}
            </Typography>
            {showBackButton && (
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                }}
                onClick={()=>setShowBackButton(false)}
              >
                Back
              </Button>
            )}
          </Box>

          {taskData!=undefined  && showBackButton? (
            <TaskDetail taskData={taskData}/>
          ) : (
            <TaskList data={data} viewTaskDetail={viewTaskDetail} />
          )}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  //Tab Names from Parent Component
  const tabInfo = props.tabInfo;

  const [value, setValue] = React.useState(0);
  console.log(tabInfo);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {/* Display Tab Names */}
        <Tabs
          value={value}
          textColor="secondary"
          indicatorColor="secondary"
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabInfo.map((tabItem, i) => {
            return <Tab label={tabItem.tabName} {...a11yProps(i)} />;
          })}
        </Tabs>
      </Box>
      {/* Display Tab Pages */}
      {tabInfo.map((tabItem, i) => {
        return (
          <TabPanel value={value} index={i} data={tabItem.tabData}>
            {tabItem.tabName !== "History" && ` Active ${tabItem.tabName}`}
            {tabItem.tabName === "History" && "Previously Submitted Tasks"}
          </TabPanel>
        );
      })}
    </Box>
  );
}
