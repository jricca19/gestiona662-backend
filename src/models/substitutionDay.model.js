const mongoose = require("mongoose");
const substitutionDaySchema = require("./schemas/substitutionDay.schema");
const SubstitutionDay = mongoose.model("SubstitutionDay", substitutionDaySchema);

module.exports = SubstitutionDay;