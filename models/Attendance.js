var mongoose = require("mongoose");

var AttedanceSchema = new mongoose.Schema(
  {
    div: {
      type: String,
      required: true,
    },
    batch:{
      type:String
    }
    ,
    subject: {
      type: String,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
    lectureno: {
      type: Number,
    },
    generatedcode: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    attdata:{
      type:Array,
      default:[]
    },
    students: {
      type: Array,
      default: [],
      rollno: {
        type: Number,
        unique: true
      },
      status: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendances", AttedanceSchema);
