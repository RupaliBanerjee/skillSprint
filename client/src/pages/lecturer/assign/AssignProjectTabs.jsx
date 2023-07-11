import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import { tokens } from "theme";
import TaskDetail from "pages/student/taskDetail";

const TabPanel = (props) => {
  const { value, index, taskData, ...other } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
            <TaskDetail taskData={taskData} activeTask={false} />
          </Box>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AssignProjectTabs = (props) => {
  const { tabInfo } = props;
  const [value, setValue] = React.useState(0);
  const [currentTab, setCurrentTab] = useState("Project Description");

  const handleChange = (event, newValue) => {
    setCurrentTab(event.target.innerText);
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
      {tabInfo.map((tabItem, i) => {
        return (
          <TabPanel
            value={value}
            index={i}
            taskData={tabItem.tabData}
            name={currentTab}
            task_type={tabItem.type}
          />
        );
      })}
    </Box>
  );
};
export default AssignProjectTabs;
