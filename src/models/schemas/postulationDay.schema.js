const mongoose = require("mongoose");

const postulationDaySchema = new mongoose.Schema({
    postulationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Postulation", // Reference to the Postulation collection
            required: true,
        },
    publicationDayId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PublicationDay", // Reference to the PublicationDay collection
            required: true,
    }
});

module.exports = postulationDaySchema;