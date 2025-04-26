const mongoose = require("mongoose");
const Teacher = require("../models/teacher.model");

const getTeachers = async () => {
    return await Teacher.find().select("userId ci address yearsExperience gradeExperience preferredShifts averageRating");
};

const createTeacher = async (userId, ci, address, yearsExperience, gradeExperience, preferredShifts, averageRating) => {
    const newTeacher = new Teacher({
        userId,
        ci,
        address,
        yearsExperience,
        gradeExperience,
        preferredShifts,
        averageRating
    });
    await newTeacher.save();
    return newTeacher;
};

const findTeacher = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe maestro con ID: ${id}`);
    }
    return await Teacher.findById(id).select("userId ci address yearsExperience gradeExperience preferredShifts averageRating");
};

const deleteTeacher = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe maestro con ID: ${id}`);
    }
    return await Teacher.deleteOne({ _id: id });
};

const updateTeacher = async (id, payload) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe maestro con ID: ${id}`);
    }
    const teacher = await Teacher.findOne({ _id: id });

    if (teacher) {
        Object.entries(payload).forEach(([key, value]) => {
            school[key] = value;
        });
        await teacher.save();
    }
    return teacher;
};

module.exports = {
    getTeachers,
    findTeacher,
    createTeacher,
    deleteTeacher,
    updateTeacher
};