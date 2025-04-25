const mongoose = require("mongoose");

const createPostulationSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },
    publicationId: { type: Number, required: true },
    createdAt: { type: Date, required: true }
});

const updatePostulationSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },
    publicationId: { type: Number, required: true },
    status:{ type: String, enum: ["PENDING", "ACCEPTED", "REJECTED", "WITHDRAWN"], required: true },
    createdAt: { type: Date, required: true }
});

module.exports = {
    createPostulationSchema,
    updatePostulationSchema,
};