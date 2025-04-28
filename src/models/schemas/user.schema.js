const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 20 },
  lastName: { type: String, required: true, minlength: 3, maxlength: 20 },
  ci: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, enum: ["TEACHER", "STAFF"], required: true },
  isEffectiveTeacher: { type: Boolean, default: false },
  teacherProfile: {
    address: { type: String },
    graduationDate: { type: Date },
    competitionNumber: { type: Number },
    healthCertificateStatus: { type: Boolean },
    criminalRecordDate: { type: Date },
    law19889CertificateDate: { type: Date },
    gradeExperience: [{ type: String }],
    preferredShifts: [{ type: String, enum: ["MORNING", "AFTERNOON", "FULL_DAY"] }],
  },
  staffProfile: {
    schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
    isCurrent: { type: Boolean },
    assignedAt: { type: Date },
  },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = userSchema;
