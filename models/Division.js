var mongoose = require("mongoose");

var DivisionShema = new mongoose.Schema(
  {
    divname: {
      type: String,
      required: true,
    },
    genecode: {
      type: String,
    },
    cc: {
      type: String,
      required: true,
    },
    students: {
      type: Array,
      default: [],
    },
    batches: {
      type: Array,
      default: [],
      batchname: {
        type: String,
      },
    },
    ul: {
      type: Number,
      required: true,
    },
    ll: { type: Number, required: true },
    subject: {
      type: Array,
      default: [],
      sub_name: {
        type: String,
      },
    },
    labs: {
      type: Array,
      default: [],
      labname: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Divisions", DivisionShema);
