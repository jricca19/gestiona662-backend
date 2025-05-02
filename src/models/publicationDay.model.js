const mongoose = require("mongoose");
const publicationDaySchema = require("./schemas/publicationDay.schema");
const PublicationDay = mongoose.model("PublicationDay", publicationDaySchema);

module.exports = PublicationDay;