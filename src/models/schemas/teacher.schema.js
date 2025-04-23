const mongoose = require("mongoose");

const teacherSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ci:{ type: String, required: true },
    address:{ type: String, required: true },
    yearsExperience:{ type: Number, required: true },
    gradeExperience:{ type: Number, required: true },
    preferredShifts:{ type: String, enum: ["MORNING", "AFTERNOON", "FULL_DAY"], required: true },
    averageRating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    }
});

module.exports=teacherSchema;