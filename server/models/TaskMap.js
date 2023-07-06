import mongoose from "mongoose";

const TaskMapSchema = new mongoose.Schema(
  {
    user_id:String,
    task_id:String,
    score:[
      {
        name:String,
        weightage:Number
      }
    ],
    solution_zip:String,
    totalScore:Number
  }
);

const TaskMap = mongoose.model("taskMap", TaskMapSchema);
export default TaskMap;