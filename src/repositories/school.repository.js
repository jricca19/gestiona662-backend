const mongoose = require("mongoose");
const School = require("../models/school.model");
const Department = require("../models/department.model");

const getSchools = async () => {
    return await School.find().select("_id schoolNumber departmentId cityName address");
};

const createSchool = async (schoolNumber, departmentId, cityName, address) => {
    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
        throw new Error(`ID de departamento inválido: ${departmentId}`);
    }

    const department = await Department.findById(departmentId);
    if (!department) {
        throw new Error(`No existe un departamento con el ID: ${departmentId}`);
    }

    if (!department.cities || !department.cities.some(city => city.name.trim().toLowerCase() === cityName.trim().toLowerCase())) {
        throw new Error(`La ciudad ${cityName} no existe para el departamento ${department.name}`);
    }

    const existingSchool = await School.findOne({ schoolNumber, departmentId, cityName });
    if (existingSchool) {
        throw new Error(
            `Ya existe una escuela con el número ${schoolNumber} en la ciudad ${cityName} y el departamento seleccionado.`
        );
    }
    const cityNameUpper = cityName.trim().toUpperCase();

    const newSchool = new School({
        schoolNumber,
        departmentId,
        cityName: cityNameUpper,
        address
    });
    await newSchool.save();
    return newSchool;
};

const findSchool = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe escuela con ID: ${id}`);
    }
    return await School.findById(id).select("_id schoolNumber departmentId cityName address");
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