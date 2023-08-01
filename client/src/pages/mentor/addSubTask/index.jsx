import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "theme";
import { render } from "react-dom";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

const AddSubTask = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([{}]);
  const { setSubTaskInfo, task_id } = props;

  const handleChange = (index) => (e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      [name]: value,
    };
    setRows(updatedRows);
  };

  const addSubTask = () => {
    const item = {
      subTasktitle: "",
      subTaskDescription: "",
    };
    setRows([...rows, item]);
  };

  const removeSpecificSubTask = (index) => () => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const addSubTaskDetails = () => {
    const subTaskList = rows.map((task, index) => {
      return {
        task_label: task.subTasktitle,
        task_completed: false,
        task_detail: task.subTaskDescription,
        task_repo: "",
        task_id: `${task_id}_0${index + 1}`,
      };
    });
    setSubTaskInfo(subTaskList)
  };

  return (
    <div>
      <Container>
        <div className="row clearfix">
          <div className="col-md-12 column">
            <table className="table table-bordered table-hover" id="tab_logic">
              <thead>
                <tr>
                  {/* <th className="text-center">#</th> */}
                  <th className="text-center">Title</th>
                  <th className="text-center">Description</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {rows.map((item, index) => (
                  <tr id="subtask" key={index}>
                    {/* <td>{index}</td> */}
                    <td width={"40%"}>
                      <TextField
                        type="text"
                        size="small"
                        fullWidth
                        name="subTasktitle"
                        value={rows[index].subTasktitle}
                        onChange={handleChange(index)}
                        className="form-control"
                      />
                    </td>
                    <td width={"60%"}>
                      <TextField
                        type="text"
                        size="small"
                        fullWidth
                        name="subTaskDescription"
                        value={rows[index].subTaskDescription}
                        onChange={handleChange(index)}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <IconButton onClick={removeSpecificSubTask(index)}>
                        <RemoveCircleOutlineOutlinedIcon />
                      </IconButton>
                    </td>
                    <td>
                      <IconButton onClick={addSubTask}>
                        <AddCircleOutlineOutlinedIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
      <Box display={"flex"} justifyContent={"flex-end"} marginTop={"2rem"}>
        <Button
          autoFocus
          onClick={() => {
            addSubTaskDetails();
          }}
          sx={{
            color: colors.grey[100],
            backgroundColor: colors.blueAccent[700],
          }}
        >
          Save changes
        </Button>
      </Box>
    </div>
  );
};

export default AddSubTask;
