const mongoose = require("mongoose");
const SubstitutionDay = require("../models/substitutionDay.model");

const getSubstitutionDays = async () => {
    return await SubstitutionDay.find().select("publicationId date assignedTeacherId status");
};

const createSubstitutionDay = async (publicationId,date,assignedTeacherId,status) => {
    if (!mongoose.Types.ObjectId.isValid(publicationId)) {
        throw new Error(`Publicación con ID ${publicationId} inválido`);
    }
    if (!mongoose.Types.ObjectId.isValid(assignedTeacherId)) {
        throw new Error(`Maestro con ID ${assignedTeacherId} inválido`);
    }
    const duplicated = await findDuplicateSubstitutionDay(
        publicationId,date,assignedTeacherId
    );

    if (duplicated) {
        throw new Error("Ya existe un día de suplencia asignado para esa fecha, publicación y profesor.");
    }
    const newSubstitutionDay = new SubstitutionDay({
        publicationId,date,assignedTeacherId,status
    });
    await newSubstitutionDay.save();
    return newSubstitutionDay;
};

const findSubstitutionDay = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe ID: ${id}`);
    }
    return await SubstitutionDay.findById(id).select("publicationId date assignedTeacherId status");
};

const findDuplicateSubstitutionDay = async (publicationId,date,assignedTeacherId) => {
    return await SubstitutionDay.findOne({
        publicationId:publicationId,
        date:date,
        assignedTeacherId:assignedTeacherId
    }).select("_id");
};

const deleteSubstitutionDay = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe ID: ${id}`);
    }
    return await SubstitutionDay.deleteOne({ _id: id });
};

const updateSubstitutionDay = async (id, payload) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe ID: ${id}`);
    }
    const substitutionDay = await SubstitutionDay.findOne({ _id: id });

    if (substitutionDay) {
        Object.entries(payload).forEach(([key, value]) => {
            substitutionDay[key] = value;
        });
        await substitutionDay.save();
    }
    return substitutionDay;
};

module.exports = {
    getSubstitutionDays,
    findSubstitutionDay,
    createSubstitutionDay,
    deleteSubstitutionDay,
    updateSubstitutionDay,
};