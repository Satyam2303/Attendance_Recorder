var mongoose = require("mongoose");

var BatchSchema = new mongoose.Schema(
  {
    batchname: {
      type: String,
      required: true,
    },
    students: {
      type: Array,
      default: [],
    },
    ul: {
      type: Number,
      required: true,
    },
    ll: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Batches", BatchSchema);
