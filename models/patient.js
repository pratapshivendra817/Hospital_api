const mongoose = require("mongoose");
// Patient Schema
const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;