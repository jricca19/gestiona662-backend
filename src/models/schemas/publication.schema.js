const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  grade: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  shift: { type: String, enum: ["MORNING", "AFTERNOON", "FULL_DAY"], required: true },
  status: { type: String, enum: ["OPEN", "FILLED", "CANCELLED", "EXPIRED"], default: "OPEN" },
});

publicationSchema.virtual("publicationDays", {
  ref: "PublicationDay",            // Nombre del modelo relacionado
  localField: "_id",                // Campo local en Publication
  foreignField: "publicationId",    // Campo en PublicationDay que referencia a Publication
});
publicationSchema.set("toObject", { virtuals: true });
publicationSchema.set("toJSON", { virtuals: true });

module.exports = publicationSchema;
