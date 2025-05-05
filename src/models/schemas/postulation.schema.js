const mongoose = require("mongoose");

const postulationSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },
    publicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publication",
        required: true,
    },
    status: { type: String, enum: ["PENDING", "ACCEPTED", "REJECTED", "WITHDRAWN"], default: "PENDING" },
    createdAt: { type: Date, required: true }
});

module.exports = postulationSchema;