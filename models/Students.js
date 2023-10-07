var mongoose = require("mongoose");

var StudentsSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    created: {
      type: Date,
      default: Date.now,
    },
    rollno: {
      type: Number,
      required: true,
      unique: true
    },
    div: {
      type: String,
      required: true
    },
    batch:{
      type:String,
      required: true
    },
    role: {
      type:String,
      default: "student"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", StudentsSchema);
