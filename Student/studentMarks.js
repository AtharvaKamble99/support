const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  Name: String,
  Roll_no: Number,
  CC: Number,
  WAD: Number,
  CNS: Number,
  DSBDA: Number,
  AI: Number,
});

const Students = mongoose.model("StudentsMarks", studentSchema);
module.exports = Students;
