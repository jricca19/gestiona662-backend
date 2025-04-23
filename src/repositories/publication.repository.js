const mongoose = require("mongoose");
const Publication = require("../models/publication.model");
const { findSchool } = require("./school.repository");

const getPublications = async () => {
    return await Publication.find().select("_id schoolId grade startDate endDate shift status");
};

const createPublication = async (schoolId, grade, startDate, endDate, shift) => {
    if (!mongoose.Types.ObjectId.isValid(schoolId)) {
        throw new Error(`Escuela con ID ${schoolId} inválido`);
    }

    const schoolExists = await findSchool(schoolId);
    if (!schoolExists) {
        throw new Error(`No existe una escuela con el ID: ${schoolId}`);
    }

    const newPublication = new Publication({
        schoolId,
        grade,
        startDate,
        endDate,
        shift,
        status: "OPEN",
    });
    await newPublication.save();
    return newPublication;
};

const findPublication = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe ID: ${id}`);
    }
    return await Publication.findById(id).select("_id schoolId grade startDate endDate shift status");
};

const deletePublication = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe ID: ${id}`);
    }
    return await Publication.deleteOne({ _id: id });
};

const updatePublication = async (id, payload) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe ID: ${id}`);
    }
    const publication = await Publication.findOne({ _id: id });

    if (publication) {
        Object.entries(payload).forEach(([key, value]) => {
            publication[key] = value;
        });
        await publication.save();
    }
    return publication;
};

module.exports = {
    getPublications,
    findPublication,
    createPublication,
    deletePublication,
    updatePublication,
};
