const mongoose = require("mongoose");

const schoolAdministratorSchema=new mongoose.Schema({
    userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
    },
    schoolId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "School",
            required: true,
    },
    isCurrent: {
        type: Boolean,
        required: true,
      },
    assignedAt:{ type: Date, required: true },
});

module.exports=schoolAdministratorSchema;