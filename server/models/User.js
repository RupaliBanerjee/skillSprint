import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    last_name:String,
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    address_1: String,
    address_2: String,
    contact_no: String,
    role: {
      type: String,
      enum: ["student", "lecturer", "mentor","admin"],
      default: "student",
    },
    user_id:String
  },
  { timestamps: true },
  {collection:"UserInfo"}
);

const User = mongoose.model("UserInfo", UserSchema);
export default User;