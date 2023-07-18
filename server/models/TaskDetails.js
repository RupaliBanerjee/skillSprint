import mongoose, { Schema } from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: String,
  weightage: String,
});

const ScoreSchema = new mongoose.Schema({
  student_id: [CategorySchema],
});

const TaskDetailsSchema = new mongoose.Schema({
  key: {
    type: String,
    unique: true,
  },
  publisher_id: String,
  assigner_id: String,
  title: String,
  summary: String,
  comments: {
    publisher: String,
    assigner: String,
    student: String,
  },
  pdf_file: Buffer,

  start_date: String,
  end_date: String,
  task_type: {
    type: String,
    enum: ["ASSIGNMENT", "PROJECT"],
  },
  subTaskInfo:[{
    task_label:String,
    task_detail:String,
    task_complete:Boolean,
    task_repo:String,
    task_id:String
  }],
  active: Boolean,
});

const TaskDetail = mongoose.model("taskDetail", TaskDetailsSchema);
export default TaskDetail;
