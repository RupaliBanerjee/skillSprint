import React, { useState } from "react";
import PropTypes from "prop-types";
import TaskList from "../pages/student/taskList";
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
import TaskDetail from "../pages/student/taskDetail";
import ShowHistory from "../pages/student/showHistory";
import EvaluationGrid from "pages/lecturer/evaluate/EvaluationGrid";

function TabPanel(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    children,
    value,
    index,
    data,
    name,
    task_type,
    updateTaskData,
    updateTaskDataStudent,
    ...other
  } = props;
  const [taskData, setTaskData] = useState();
  const [showBackButton, setShowBackButton] = useState(false);
  const isTaskTypeStudent = task_type === "Student Task";

  const viewTaskDetail = (task) => {
    setTaskData(task);
    setShowBackButton(true);
  };

  const navigateBack = () => {
    setShowBackButton(false);
    setTaskData(undefined);
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
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              {children}
            </Typography>
            {showBackButton && (
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                }}
                onClick={() => {
                  navigateBack()
                }}
              >
                Back
              </Button>
            )}
          </Box>
          {/* For Lecturer evaluation page */}
          {!isTaskTypeStudent && taskData == undefined ? (
            <EvaluationGrid
              data={data}
              tabName={name}
              viewTaskDetail={viewTaskDetail}
            />
          ) : (
            !isTaskTypeStudent &&
            taskData && (
              <TaskDetail
                taskData={taskData}
                activeTask={false}
                updateTaskData={updateTaskData}
               
              />
            )
          )}
          {/* ALL Three tabs have the same task list
                on click of the of view task assignment and project will show the same page
                 and History will have different layout */}
          {isTaskTypeStudent &&
            (taskData == undefined &&
            !showBackButton &&
            name !== "SUBMITTED TASK" ? (
              <TaskList data={data} viewTaskDetail={viewTaskDetail} />
            ) : name !== "SUBMITTED TASK" ? (
              <TaskDetail
                taskData={taskData}
                activeTask={taskData.task_detail}
                updateTaskDataStudent={updateTaskDataStudent}
                navigateBack={navigateBack}
              />
            ) : (
              <ShowHistory data={data} />
            ))}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  task_type: PropTypes.string,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  //Tab Names from Parent Component
  const { tabInfo, updateTaskData, updateTaskDataStudent } = props;
 

  const [value, setValue] = React.useState(0);
  const [currentTab, setCurrentTab] = useState("ASSIGNMNENTS");

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
            return <Tab label={tabItem.tabName} key={`${tabItem}-${i}`} {...a11yProps(i)} />;
          })}
        </Tabs>
      </Box>
      {/* Display Tab Pages */}
      {tabInfo.map((tabItem, i) => {
        if (tabItem.type === "Lecturer Task") {
          return (
            <TabPanel
              value={value}
              index={i}
              data={tabItem.tabData}
              name={currentTab}
              task_type={tabItem.type}
              updateTaskData={updateTaskData}
            >
              {` Previously Submitted ${tabItem.tabName}`}
            </TabPanel>
          );
        }
        return (
          <TabPanel
            value={value}
            index={i}
            data={tabItem.tabData}
            name={currentTab}
            task_type={tabItem.type}
            updateTaskDataStudent={updateTaskDataStudent}
            key={`${tabItem}-${i}`}
          >
            {tabItem.tabName !== "Submitted Task" &&
              ` Active ${tabItem.tabName}`}
            {tabItem.tabName === "Submitted Task" &&
              "Previously Submitted Tasks"}
          </TabPanel>
        );
      })}
    </Box>
  );
}
