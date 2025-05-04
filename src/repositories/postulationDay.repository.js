const mongoose = require("mongoose");
const PostulationDay = require("../models/postulationDay.model");

const getPostulationDays = async () => {
    return await PostulationDay.find().select("postulationId publicationDayId");
};

const createPostulationDay = async (postulationId,publicationDayId) => {
    if (!mongoose.Types.ObjectId.isValid(postulationId)) {
        throw new Error(`Postulación con ID ${postulationId} inválido`);
    }
    if (!mongoose.Types.ObjectId.isValid(postulationId)) {
        throw new Error(`Día de sustitución con ID ${publicationDayId} inválido`);
    }
    const duplicated = await findDuplicatePostulationDay(
        postulationId,publicationDayId
    );

    if (duplicated) {
        throw new Error("Ya existe un día de postulación asignado para esa postulación y ese día de publicación");
    }
    const newPostulationDay = new PostulationDay({
        postulationId,
        publicationDayId
    });
    await newPostulationDay.save();
    return newPostulationDay;
};

const findPostulationDay = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe ID: ${id}`);
    }
    return await PostulationDay.findById(id).select("postulationId publicationDayId");
};

const findDuplicatePostulationDay = async (postulationId,publicationDayId) => {
    return await PostulationDay.findOne({
        postulationId,publicationDayId
    }).select("_id");
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