import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import studentRoutes from "./routes/student.js";
import lecturerRoutes from "./routes/lecturer.js";
import mentorRoutes from "./routes/mentor.js";
import adminRoutes from "./routes/admin.js";
//import allData from '../client/src/data/mockData.js';

/* Data Imports */
import User from "./models/User.js";
import TaskMap from "./models/TaskMap.js";
import TaskDetail from "./models/TaskDetails.js";
import { dataUser, student_taskMap, taskDetails } from "./data/mockData.js";

//const {dataUser} =allData

/* CONFIGURATION */
dotenv.config();
const app = express();
//app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ limit:'50mb',extended: true }));
app.use(bodyParser.json({limit:'50mb'}));
app.use(express.json({ limit: "50mb" }))
//bodyParser.json({ limit: "50mb" })

app.use(cors());

/* ROUTES */
app.use("/student", studentRoutes);
app.use("/lecturer", lecturerRoutes);
app.use("/mentor", mentorRoutes);
app.use("/admin", adminRoutes);

/* Mongoose Setup */
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.get("/getUsers", (req, res) => {
      User.find()
        .then((user) => res.json(user))
        .catch((err) => console.log("Some error occured due to", err));
    });

    app.post("/login", (req, res) => {
      const username = req.body.email;
      const password = req.body.password;

      User.findOne({ email: username })
        .then((foundUser) => {
          /*The code below was for mongoose-encryption */
          if (foundUser.password === password) {
            res.send({
              message: "Authentication Successful!",
              _id: foundUser._id,
              user_id: foundUser.user_id,
              accountType: foundUser.role,
            });
          } else {
            console.log("Wrong Password");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
    ////////////////////////STUDENT API CALLS////////////////////////////////

    /* get userData to store in redux store */
    app.get("/getUserInfo/:id", (req, res) => {
      const user_id = req.params.id;
      console.log("user_id", user_id);
      User.findOne({ user_id: user_id })
        .then((userInfo) => {
          res.send(userInfo);
        })
        .catch((err) => console.log("getUserInfo Error", err));
    });

    /* Get task Map for retriving all task IDs */
    app.get("/taskMap/:id", (req, res) => {
      const id = req.params.id;
      console.log("user_id", id);
      TaskMap.find({ user_id: id })
        .then((userInfo) => {
          res.send(userInfo);
        })
        .catch((err) => console.log("getUserInfo Error", err));
    });

    /* Get Task Details for active and submitted Tasks */
    app.post("/taskDetails", (req, res) => {
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

    app.post("/latestTask", (req, res) => {
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

    ///////////////////////// LECTURER API CALLS /////////////////////////

    /* Get Task Detail for all the tasks published or assigned by the professor */
    app.get("/taskInfo/:id", (req, res) => {
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
    app.post("/getStudentTaskMap", (req, res) => {
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
    app.post("/updateTaskMap/score", (req, res) => {
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
    app.get("/getAllTaskMap", (req, res) => {
      TaskMap.find()
        .then((taskMapData) => {
          res.send(taskMapData);
        })
        .catch((err) => {
          console.log("Check getAllTaskMap error", err);
        });
    });

    /* Update task Detail for the project assigned by the professor and make the active boolean value true */
    app.post("/updateTaskDetail",(req,res)=>{
      const taskIdList=[...req.body];
      TaskDetail.updateMany(
        {key: { $in: taskIdList } },
        { $set: { active:true } }
      )
        .then((taskDetail) => {
          res.send(taskDetail);
        })
        .catch((err) => {
          console.log("TaskDetail update error", err);
        });
    })

    /* Get all task Details for Student Grid in assign page */
    app.post("/getAllTaskDetail", (req, res) => {
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
    app.post("/setTaskMap", (req, res) => {
      const newTaskMapList = req.body;
      TaskMap.insertMany([...newTaskMapList])
        .then((response) => res.send(response))
        .catch((err) => {
          console.log("Add new TaskMap entry error", err);
        });
    });

    /* Get all taskIds for validation of new taskid publish */
    app.get("/getAllTaskId",(req,res)=>{
      TaskDetail.find().then(taskData=>{
        const taskIdList=taskData.map((task)=>task.key)
        res.send(taskIdList);
      }).catch(err=>{
        console.log("get all task Ids error",err)
      })
    })

    /* publish new assignment */
    app.post("/addNewTask/assignment",(req,res)=>{
      const taskDetailEntry=req.body.taskDetail;
      TaskDetail.create(taskDetailEntry).then(response=>{res.send(response)}).catch((error)=>{
        console.log("task publish error",error)
      })
    })

    app.listen(PORT, () => console.log(`Current Port ${PORT}`));

    /* Add data only once */
    //User.insertMany(dataUser);
    //TaskMap.insertMany(student_taskMap);
    //TaskDetail.insertMany(taskDetails)
  })
  .catch((err) => {
    console.log(`Sorry cannot connect due to ${err}`);
  });
