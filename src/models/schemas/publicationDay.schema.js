const mongoose = require("mongoose");

const publicationDaySchema = new mongoose.Schema({
    date:{ type: Date, required: true },
    assignedTeacherId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher", // Reference to the Teacher collection
        required: false,
    },
    status:{ type: String, enum: ["AVAILABLE", "ASSIGNED", "CANCELLED", "EXPIRED"], required: true }
});

module.exports = publicationDaySchema;