const mongoose = require("mongoose");
const SchoolAdministrator = require("../models/schoolAdministrator.model");

const getSchoolAdministrators = async () => {
    return await SchoolAdministrator.find().select("userId schoolId isCurrent assignedAt");
};

const createSchoolAdministrator = async (userId,schoolId,isCurrent,assignedAt) => {
    const newSchoolAdministrator = new SchoolAdministrator({
        userId,
        schoolId,
        isCurrent,
        assignedAt
    });
    await newSchoolAdministrator.save();
    return newSchoolAdministrator;
};

const findSchoolAdministrator = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe director/secretario con ID: ${id}`);
    }
    return await SchoolAdministrator.findById(id).select("userId schoolId isCurrent assignedAt");
};

const deleteSchoolAdministrator = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe director/secretario con ID: ${id}`);
    }
    return await SchoolAdministrator.deleteOne({ _id: id });
};

const updateSchoolAdministrator = async (id, payload) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe director/secretario con ID: ${id}`);
    }
    const schoolAdministrator = await SchoolAdministrator.findOne({ _id: id });

    if (schoolAdministrator) {
        Object.entries(payload).forEach(([key, value]) => {
            school[key] = value;
        });
        await schoolAdministrator.save();
    }
    return schoolAdministrator;
};

module.exports = {
    getSchoolAdministrators,
    findSchoolAdministrator,
    createSchoolAdministrator,
    deleteSchoolAdministrator,
    updateSchoolAdministrator,
};