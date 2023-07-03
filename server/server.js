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
import { dataUser,student_taskMap } from "./data/mockData.js";

//const {dataUser} =allData

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
      console.log("UserName ", username);
      console.log("Password ", password);
      User.findOne({ email: username })
        .then((foundUser) => {
          /*The code below was for mongoose-encryption */
          if (foundUser.password === password) {
            res.send({
              message: "Authentication Successful!",
              _id: foundUser._id,
              user_id:foundUser.user_id
            });
          } else {
            console.log("Wrong Password");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    /* get userData to store in redux store */
    app.get("/getUserInfo/:id", (req, res) => {
      const user_id = req.params.id;
      console.log("user_id",user_id)
      User.findOne({ _id: user_id })
        .then((userInfo) => {
          res.send(userInfo);
        })
        .catch((err) => console.log("getUserInfo Error", err));
    });

    /* Get task Map for retriving all task IDs */
    app.get("/taskMap/:id", (req, res) => {
      const id = req.params.id;
      console.log("user_id",id)
      TaskMap.findOne({ user_id: id })
        .then((userInfo) => {
          res.send(userInfo);
        })
        .catch((err) => console.log("getUserInfo Error", err));
    });

    app.listen(PORT, () => console.log(`Current Port ${PORT}`));

    /* Add data only once */
    //User.insertMany(dataUser);
    //TaskMap.insertMany(student_taskMap);

  })
  .catch((err) => {
    console.log(`Sorry cannot connect due to ${err}`);
  });
