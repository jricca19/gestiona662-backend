const mongoose = require("mongoose");
const School = require("../models/school.model");

const getSchools = async () => {
    return await School.find().select("schoolNumber departmentId cityName address");
};

const findSchool = async (schoolNumber, departmentId, cityName) => {
    return await School.findOne({ schoolNumber, departmentId, cityName: cityName.trim().toUpperCase() })
        .populate("staff.userId", "name email");
};

const findSchoolById = async (schoolId) => {
    if (!mongoose.Types.ObjectId.isValid(schoolId)) {
        throw new Error(`ID de escuela inválido: ${schoolId}`);
    }
    return await School.findById(schoolId);
};

const createSchool = async (schoolNumber, departmentId, cityName, address) => {
    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
        throw new Error(`ID de departamento inválido: ${departmentId}`);
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

const addUserToSchool = async (userId, school, role) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error(`ID de usuario inválido: ${userId}`);
    }

    const isApproved = role === "PRIMARY" ? true : false;

    school.staff.push({
        userId,
        role,
        isApproved: isApproved,
        assignedAt: new Date()
    });

    await school.save();
    return school;
};

module.exports = {
    getSchools,
    findSchool,
    findSchoolById,
    createSchool,
    deleteSchool,
    updateSchool,
    addUserToSchool,
};