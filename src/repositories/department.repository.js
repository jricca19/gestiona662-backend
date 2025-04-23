const mongoose = require("mongoose");
const Department = require("../models/department.model");

const findDepartments = async () => {
    return await Department.find().select("_id name");
};

const findDepartmentById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe ID: ${id}`);
    }
    return await Department.findById(id).select("_id name cities");
};

module.exports = {
    findDepartments,
    findDepartmentById,
};

