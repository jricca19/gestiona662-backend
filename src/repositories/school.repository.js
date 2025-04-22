const mongoose = require("mongoose");
const School = require("../models/school.model");
const Department = require("../models/department.model");

const getSchools = async () => {
    return await School.find().select("schoolNumber department city address");
};

const createSchool = async (schoolNumber, departmentId, cityName, address) => {
    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
        throw new Error(`ID de departamento inválido: ${departmentId}`);
    }
    if (!schoolNumber) {
        throw new Error("El número de escuela es obligatorio");
    }
    if (!cityName) {
        throw new Error("El nombre de la ciudad es obligatorio");
    }

    const department = await Department.findById(departmentId);
    if (!department) {
        throw new Error(`No existe un departamento con el ID: ${departmentId}`);
    }

    const existingSchool = await School.findOne({ schoolNumber, departmentId, cityName });
    if (existingSchool) {
        throw new Error(
            `Ya existe una escuela con el número ${schoolNumber} en la ciudad ${cityName} y el departamento seleccionado.`
        );
    }

    const newSchool = new School({
        schoolNumber,
        departmentId,
        cityName,
        address
    });
    await newSchool.save();
    return newSchool;
};

const findSchool = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe escuela con ID: ${id}`);
    }
    return await School.findById(id).select("schoolNumber department city address");
};

const deleteSchool = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe escuela con ID: ${id}`);
    }
    return await School.deleteOne({ _id: id });
};

const updateSchool = async (id, payload) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe escuela con ID: ${id}`);
    }
    const school = await School.findOne({ _id: id });

    if (school) {
        Object.entries(payload).forEach(([key, value]) => {
            school[key] = value;
        });
        await school.save();
    }
    return school;
};

module.exports = {
    getSchools,
    findSchool,
    createSchool,
    deleteSchool,
    updateSchool,
};