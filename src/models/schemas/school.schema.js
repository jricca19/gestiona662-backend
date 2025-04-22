const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
    schoolNumber: { type: Number, required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    cityName: { type: String, required: true },
    address: { type: String, required: true }
});

schoolSchema.index({ schoolNumber: 1, departmentId: 1, cityName: 1 }, { unique: true });
//TODO: si creamos una escuela en un departamento y ciudad, y luego intentamos crear
// la misma escuela y ciudad en otro departamento da error, reparar

module.exports = schoolSchema;