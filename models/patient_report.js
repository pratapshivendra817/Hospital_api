const mongoose = require("mongoose");
// Report Schema
const reportSchema = mongoose.Schema(
  {
    doctor: {
      type: String,
    },
    patient: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Report = mongoose.model("Report", reportSchema);
module.exports = Report;