const mongoose = require("mongoose");

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
    status: { type: String, enum: ["PENDING", "ACCEPTED", "REJECTED", "WITHDRAWN"], default: "PENDING" },
    createdAt: { type: Date, required: true },
    appliesToAllDays:{ type: Boolean, default: true }
});

postulationSchema.virtual('postulationDays', {
    ref: 'PostulationDay',
    localField: '_id',
    foreignField: 'postulationId'
  });
  postulationSchema.set('toObject', { virtuals: true });
  postulationSchema.set('toJSON', { virtuals: true });

module.exports = postulationSchema;