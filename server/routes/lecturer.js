import express from 'express';

import TaskDetail from '../models/TaskDetails.js';
import TaskMap from '../models/TaskMap.js';
import User from '../models/User.js';

const router=express.Router();



 /* Get Task Detail for all the tasks published or assigned by the professor */
 router.get("/taskInfo/:id", (req, res) => {
    const user_id = req.params.id;
    let assignment_List = [];
    let project_List = [];
    TaskDetail.find({
      $or: [{ publisher_id: user_id }, { assigner_id: user_id }],
    })
      .then((taskData) => {
        taskData.map((task) => {
          //console.log("Check Task OBj",task)
          if (task.task_type === "PROJECT") {
            project_List.push(task);
          } else {
            assignment_List.push(task);
          }
        });
        res.send({
          assignmentList: assignment_List,
          projectList: project_List,
        });
      })
      .catch((err) => {
        console.log("Lecturer Task Info", err);
      });
  });

  /* Get all the student task map for completed tasks -Will be used to add Score */
  router.post("/getStudentTaskMap", (req, res) => {
    const completed_taskIds = req.body.taskId_List;
    //console.log("Completed Task",completed_taskIds)
    TaskMap.find({ task_id: [...completed_taskIds] }).then((taskMapList) => {
      const taskMapData = [];
      taskMapList.forEach((task) => {
        //const {user_id,task_id,score,solution_zip,totalScore}=task;
        taskMapData.push(task);
      });
      //console.log("Check TAskMap DATA",taskMapData);
      res.send({ taskMapData: taskMapData });
    });
  });

  /* Update score in taskMap after assesment completion by lecturer */
  router.post("/updateTaskMap/score", (req, res) => {
    const taskData = req.body.taskData;
    TaskMap.updateOne(
      { _id: taskData._id },
      { $set: { score: taskData.score, totalScore: taskData.totalScore } }
    )
      .then((taskDetail) => {
        res.send(taskDetail);
      })
      .catch((err) => {
        console.log("Score Change error", err);
      });
  });

  /* Get Complete Task Map to review student performance for project assignment */
  router.get("/getAllTaskMap", (req, res) => {
    TaskMap.find()
      .then((taskMapData) => {
        res.send(taskMapData);
      })
      .catch((err) => {
        console.log("Check getAllTaskMap error", err);
      });
  });

  /* Update task Detail for the project assigned by the professor and make the active boolean value true */
  router.post("/updateTaskDetail", (req, res) => {
    const taskIdList = [...req.body];
    TaskDetail.updateMany(
      { key: { $in: taskIdList } },
      { $set: { active: true } }
    )
      .then((taskDetail) => {
        res.send(taskDetail);
      })
      .catch((err) => {
        console.log("TaskDetail update error", err);
      });
  });

  /* Get all task Details for Student Grid in assign page */
  router.post("/getAllTaskDetail", (req, res) => {
    const TaskIdList = req.body.taskId;
    TaskDetail.find({ key: [...TaskIdList] })
      .then((taskDetailList) => {
        res.send({ taskDetailList: taskDetailList });
      })
      .catch((err) => {
        console.log("Check get TaskDetail error", err);
      });
  });

  /* Set new project entries on task map after the assign action by lecturer */
  router.post("/setTaskMap", (req, res) => {
    const newTaskMapList = req.body;
    TaskMap.insertMany([...newTaskMapList])
      .then((response) => res.send(response))
      .catch((err) => {
        console.log("Add new TaskMap entry error", err);
      });
  });

  /* Get all taskIds for validation of new taskid publish */
  router.get("/getAllTaskId", (req, res) => {
    TaskDetail.find()
      .then((taskData) => {
       const taskIdList = taskData.map((task) => task.key);
       res.send(taskIdList);
      })
      .catch((err) => {
        console.log("get all task Ids error", err);
      });
  });

  /* publish new assignment */
  router.post("/addNewTask/assignment", (req, res) => {
    const taskDetailEntry = req.body.taskDetail;
    console.log("check TaskDetailEntry",taskDetailEntry);
    TaskDetail.insertMany([{...taskDetailEntry}])
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        console.log("task publish error", error);
      });
  });

  export default router