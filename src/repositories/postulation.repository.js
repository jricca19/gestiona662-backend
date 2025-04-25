const mongoose = require("mongoose");
const Postulation = require("../models/postulation.model");

const getPostulations = async () => {
    return await Postulation.find().select("_id teacherId publicationId status createdAt");
};

const createPostulation = async (teacherId,publicationId,status,createdAt) => {
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        throw new Error(`Maestro con ID ${teacherId} inválido`);
    }
    if (!mongoose.Types.ObjectId.isValid(publicationId)) {
        throw new Error(`Publicación con ID ${publicationId} inválido`);
    }
    const newPostulation = new Postulation({
        teacherId,
        publicationId,
        status,
        createdAt
    });
    await newPostulation.save();
    return newPostulation;
};

const findPostulation = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe postulación ID: ${id}`);
    }
    return await Postulation.findById(id).select("_id teacherId publicationId status createdAt");
};

const deletePostulation = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe postulación con ID: ${id}`);
    }
    return await Postulation.deleteOne({ _id: id });
};

const updatePostulation = async (id, payload) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe postulación con ID: ${id}`);
    }
    const postulation = await Postulation.findOne({ _id: id });

    if (postulation) {
        Object.entries(payload).forEach(([key, value]) => {
            postulation[key] = value;
        });
        await postulation.save();
    }
    return postulation;
};

module.exports = {
    getPostulations,
    findPostulation,
    createPostulation,
    deletePostulation,
    updatePostulation
};
