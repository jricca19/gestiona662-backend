const mongoose = require("mongoose");

const postulationDaySchema = new mongoose.Schema({
    postulationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Postulation", // Reference to the Postulation collection
            required: true,
        },
    substitutionDayId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubstitutionDay", // Reference to the SubstitutionDay collection
            required: true,
    }
});

module.exports = postulationDaySchema;