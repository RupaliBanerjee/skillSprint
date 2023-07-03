import mongoose from "mongoose";

const TaskMapSchema = new mongoose.Schema(
  {
    user_id:String,
    taskList:[{
        type:String
    }],
    totalStars:Number
  }
);

const TaskMap = mongoose.model("taskMap", TaskMapSchema);
export default TaskMap;