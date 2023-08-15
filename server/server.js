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
    
    app.listen(PORT, () => console.log(`Current Port ${PORT}`));

    /* Add data only once */
    //User.insertMany(dataUser);
    // TaskMap.insertMany(student_taskMap);
    // TaskDetail.insertMany(taskDetails);
  })
  .catch((err) => {
    console.log(`Sorry cannot connect due to ${err}`);
  });

  