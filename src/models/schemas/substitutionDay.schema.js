const mongoose = require("mongoose");

const substitutionDaySchema = new mongoose.Schema({
    publicationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Publication", // Reference to the Publication collection
            required: true,
        },
    date:{ type: Date, required: true },
    assignedTeacherId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher", // Reference to the Teacher collection
        required: true,
    },
    status:{ type: String, enum: ["AVAILABLE", "ASSIGNED", "CANCELLED", "EXPIRED"], required: true }
});

module.exports = substitutionDaySchema;