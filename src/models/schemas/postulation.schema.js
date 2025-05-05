const mongoose = require("mongoose");

const postulationDaySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    }
}, { _id: false });

const postulationSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    publicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publication",
        required: true,
    },
    status: {
        type: String,
        enum: ["PENDING", "ACCEPTED", "REJECTED", "WITHDRAWN"],
        default: "PENDING"
    },
    createdAt: {
        type: Date,
        required: true
    },
    appliesToAllDays: {
        type: Boolean,
        default: true
    },
    postulationDays: [postulationDaySchema] // usamos directamente la fecha del día
});

module.exports = postulationSchema;