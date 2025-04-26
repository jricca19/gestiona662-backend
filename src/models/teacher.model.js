const mongoose = require("mongoose");
const teacherSchema = require("./schemas/teacher.schema");
const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;