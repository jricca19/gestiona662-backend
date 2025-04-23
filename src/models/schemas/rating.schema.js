const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher", // Reference to the Teacher collection
    required: true,
  },
  publicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Publication", // Reference to the Publication collection
    required: true,
  },
  score: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, required: true }
});

module.exports = ratingSchema;