import express from "express";

import TaskDetail from "../models/TaskDetails.js";
import TaskMap from '../models/TaskMap.js';
import User from '../models/User.js';

//import TaskDetail from "../models/TaskDetails";
//import TaskMap from "../models/TaskMap";
//import User from "../models/User";

const router = express.Router();

/* Get Task Detail for all the tasks published  by the mentor */
router.get("/taskInfo/:user_id", (req, res) => {
  const {user_id }= req.params;
 console.log("Check userId",user_id)
  let active_project_List = [];
  let submitted_project_List = [];
  TaskDetail.find({ publisher_id: user_id })
    .then((taskData) => {
      taskData.map((task) => {
        
        if (task.active) {
            active_project_List.push(task);
        } else {
            submitted_project_List.push(task);
        }
      });
      res.send({
        activeList: active_project_List,
        submittedList: submitted_project_List,
      });
    })
    .catch((err) => {
      console.log("Mentor Task Info", err);
    });
});

/* Get all students from Task Map */
router.post("/getStudentInfo",(req,res)=>{
    
    const taskIdList=req.body;
    TaskMap.find({ task_id: [...taskIdList] })
      .then((taskMapList) => {
        res.send({ taskMapList: taskMapList });
      })
      .catch((err) => {
        console.log("Check get taskMapList error", err);
      });
});

export default router;
