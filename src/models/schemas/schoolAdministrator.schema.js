const mongoose = require("mongoose");

const schoolAdministratorSchema=new mongoose.Schema({
    userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User collection
            required: true,
    },
    schoolId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "School", // Reference to the School collection
            required: true,
    },
    isCurrent: {
        type: Boolean,
        required: true,
      },
    assignedAt:{ type: Date, required: true },
});

module.exports=schoolAdministratorSchema;