const mongoose = require("mongoose");
const PostulationDay = require("../models/postulationDay.model");

const getPostulationDays = async () => {
    return await PostulationDay.find().select("postulationId substitutionDayId");
};

const createPostulationDay = async (postulationId,substitutionDayId) => {
    if (!mongoose.Types.ObjectId.isValid(postulationId)) {
        throw new Error(`Postulación con ID ${postulationId} inválido`);
    }
    if (!mongoose.Types.ObjectId.isValid(postulationId)) {
        throw new Error(`Día de sustitución con ID ${substitutionDayId} inválido`);
    }
    const newPostulationDay = new PostulationDay({
        postulationId,
        substitutionDayId
    });
    await newPostulationDay.save();
    return newPostulationDay;
};

const findPostulationDay = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe ID: ${id}`);
    }
    return await PostulationDay.findById(id).select("postulationId substitutionDayId");
};

const deletePostulationDay = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe ID: ${id}`);
    }
    return await PostulationDay.deleteOne({ _id: id });
};

const updatePostulationDay = async (id, payload) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe ID: ${id}`);
    }
    const postulationDay = await PostulationDay.findOne({ _id: id });

    if (postulationDay) {
        Object.entries(payload).forEach(([key, value]) => {
            postulationDay[key] = value;
        });
        await postulationDay.save();
    }
    return postulationDay;
};

module.exports = {
    getPostulationDays,
    findPostulationDay,
    createPostulationDay,
    deletePostulationDay,
    updatePostulationDay,
};