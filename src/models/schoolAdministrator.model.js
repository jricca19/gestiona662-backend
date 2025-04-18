const mongoose = require("mongoose");
const schoolAdministratorSchema = require("./schemas/schoolAdministrator.schema");
const SchoolAdministrator = mongoose.model("SchoolAdministrator", schoolAdministratorSchema);

module.exports = SchoolAdministrator;