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
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
//bodyParser.json({ limit: "50mb" })

app.use(cors());

/* ROUTES */
app.use("/student", studentRoutes);
app.use("/lecturer", lecturerRoutes);
app.use("/mentor", mentorRoutes);
app.use("/admin", adminRoutes);

/* Mongoose Setup */
//const PORT = process.env.PORT || 9000;
const PORT = 5000;
//process.env.MONGO_URL
mongoose
  .connect(
    "mongodb+srv://rupalibanerjeesb:PBLk21172849@pblcluster.vgkwkrf.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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

    /* Update Profile Data */
    app.post("/updateProfile/data", (req, res) => {
      let { first_name, last_name, email, address_1, address_2, contact_no } =
        req.body.profileData;
      const data = {
        first_name,
        last_name,
        email,
        address_1,
        address_2,
        contact_no,
      };
      //console.log("Check profileData",data);
      User.updateOne(
        { user_id: req.body.profileData.user_id },
        {
          $set: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            address_1: address_1,
            address_2: address_2,
            contact_no: contact_no,
          },
        }
      )
        .then((response) => {
          res.send(response);
        })
        .catch((err) => console.log("Server error for update profile", err));
    });

    /* Signup */
    app.post("/createNewUser", (req, res) => {
      const userInfo = req.body;
      User.insertMany([{ ...userInfo }])
        .then((response) => {
          res.send({
            message: "Authentication Successful!",
            _id: "",
            user_id: userInfo.user_id,
            accountType: userInfo.role,
          });
        })
        .catch((err) => {
          console.log("Sign up error", err);
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

    /* update student task Map after enroll */
    app.post("/updateTaskMap", (req, res) => {
      const taskData = req.body;
      TaskMap.insertMany({ ...taskData })
        .then((response) => res.send(response))
        .catch((err) => console.log("TaskMap Update error", err));
    });

    /* Change the active boolean flag for Task Details after enroll  */
    app.post("/updateTaskDetail/status", (req, res) => {
      const task_id = req.body.task_id;
      TaskDetail.updateOne({ key: task_id }, { $set: { active: true } })
        .then((response) => res.send(response))
        .catch((err) => console.log("TaskDetail Update error", err));
    });

    /* Update the solution zip for TAskMap after student submission */
    app.post("/updateTaskMap/solution", (req, res) => {
      const { task_id, solution_zip } = req.body;
      TaskMap.updateOne(
        { task_id: task_id },
        { $set: { solution_zip: solution_zip } }
      )
        .then((response) => res.send(response))
        .catch((err) => console.log("TaskMap solution update error", err));
    });

    /* Update student comment after submission in TaskDetail */
    app.post("/updateTaskDetail/comments", (req, res) => {
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

    app.listen(PORT, () => console.log(`Current Port ${PORT}`));

    /* Add data only once */
    //User.insertMany(dataUser);
    // TaskMap.insertMany(student_taskMap);
    // TaskDetail.insertMany(taskDetails)
  })
  .catch((err) => {
    console.log(`Sorry cannot connect due to ${err}`);
  });

  