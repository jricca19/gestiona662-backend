const mongoose = require("mongoose");
const postulationDaySchema = require("./schemas/postulationDay.schema");
const PostulationDay = mongoose.model("PostulationDay", postulationDaySchema);

module.exports = PostulationDay;