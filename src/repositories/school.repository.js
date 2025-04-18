const mongoose = require("mongoose");
const School = require("../models/school.model");

const getSchools = async () => {
    return await School.find().select("schoolNumber department city address");
};

const createSchool = async (schoolNumber, department, city, address) => {
    const newSchool = new School({
        schoolNumber,
        department,
        city,
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