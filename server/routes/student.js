import express from 'express';

import TaskDetail from '../models/TaskDetails.js';
import TaskMap from '../models/TaskMap.js';
import User from '../models/User.js';

const router=express.Router();

 /* Get task Map for retriving all task IDs */
  router.get("/taskMap/:id", (req, res) => {
    const id = req.params.id;
    console.log("user_id", id);
    TaskMap.find({ user_id: id })
      .then((userInfo) => {
        res.send(userInfo);
      })
      .catch((err) => console.log("getUserInfo Error", err));
  });

  /* Get Task Details for active and submitted Tasks */
  router.post("/taskDetails", (req, res) => {
    const activeTask = req.body.activeTask;
    const submittedTask = req.body.submittedTask;
    const activeTask_id = [];
    const submittedTask_id = [];
    const activeTaskWithDetail = [];
    const submittedTaskWithDetail = [];

    /* Get all Active task IDs */
    activeTask.map((task) => {
      activeTask_id.push(task.task_id);
    });

    /* Get all Submitted task IDs */
    submittedTask.map((task) => {
      submittedTask_id.push(task.task_id);
    });

    /* In Task Detail list find the task_id and place the details */
    TaskDetail.find({ key: [...activeTask_id, ...submittedTask_id] })
      .then((taskDetails) => {
        /* For Active Task */
        activeTask.forEach((task) => {
          const result = taskDetails.filter((t) => t.key === task.task_id)[0];

          const {
            summary,
            title,
            comments,
            start_date,
            end_date,
            active,
            task_type,
            pdf_file,
          } = result;
          const updated_task = {
            ...task,
            task_detail: {
              summary,
              title,
              comments,
              start_date,
              end_date,
              active,
              task_type,
              pdf_file,
            },
          };
          activeTaskWithDetail.push({ ...updated_task });
        });

        /* For Submitted Task */
        submittedTask.forEach((task) => {
          const result = taskDetails.filter((t) => t.key === task.task_id)[0];
          const {
            summary,
            title,
            comments,
            start_date,
            end_date,
            active,
            task_type,
            pdf_file,
          } = result;
          const updated_task = {
            ...task,
            task_detail: {
              summary,
              title,
              comments,
              start_date,
              end_date,
              active,
              task_type,
              pdf_file,
            },
          };
          submittedTaskWithDetail.push({ ...updated_task });
        });

        // /* Identify all unassigned tasks in the task list */

        res.send({ activeTaskWithDetail, submittedTaskWithDetail });
      })
      .catch((err) => {
        console.log("Find Task Detail Error", err);
      });

    //console.log("submittedTask",submittedTask)
  });

   // /* Identify all unassigned tasks in the task list */

   router.post("/latestTask", (req, res) => {
    const all_assigned_task_ids = req.body.all_assigned_task_ids;
    //console.log("all_assigned_task_id",all_assigned_task_ids);
    TaskDetail.find({ key: { $nin: all_assigned_task_ids } })
      .then((taskDetail) => {
        //console.log("all latest task",taskDetail)
        res.send(taskDetail);
      })
      .catch((err) => {
        console.log("get Latest task error", err);
      });
  });

  /* update student task Map after enroll */
  router.post("/updateTaskMap", (req, res) => {
    const taskData = req.body;
    TaskMap.insertMany({ ...taskData })
      .then((response) => res.send(response))
      .catch((err) => console.log("TaskMap Update error", err));
  });

  /* Change the active boolean flag for Task Details after enroll  */
  router.post("/updateTaskDetail/status", (req, res) => {
    const task_id = req.body.task_id;
    TaskDetail.updateOne({ key: task_id }, { $set: { active: true } })
      .then((response) => res.send(response))
      .catch((err) => console.log("TaskDetail Update error", err));
  });

  /* Update the solution zip for TAskMap after student submission */
  router.post("/updateTaskMap/solution", (req, res) => {
    const { task_id, solution_zip } = req.body;
    TaskMap.updateOne(
      { task_id: task_id },
      { $set: { solution_zip: solution_zip } }
    )
      .then((response) => res.send(response))
      .catch((err) => console.log("TaskMap solution update error", err));
  });

  /* Update student comment after submission in TaskDetail */
  router.post("/updateTaskDetail/comments", (req, res) => {
    const { task_id, student_comments } = req.body;
    TaskDetail.updateOne(
      { key: task_id },
      { $set: { "comments.student": student_comments, active: false } }
    )
      .then((response) => res.send(response))
      .catch((err) =>
        console.log("TaskDetail student comment update error", err)
      );
  });

export default router