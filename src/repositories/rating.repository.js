const mongoose = require("mongoose");
const Rating = require("../models/rating.model");

const getRatings = async () => {
    return await Rating.find().select("_id teacherId publicationId score comment createdAt");
};

const createRating = async (teacherId,publicationId,score,comment,createdAt) => {
    const newRating = new Rating({
        teacherId,
        publicationId,
        score,
        comment,
        createdAt
    });
    await newRating.save();
    return newRating;
};

const findRating = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe rating con ID: ${id}`);
    }
    return await Rating.findById(id).select("_id teacherId publicationId score comment createdAt");
};

const deleteRating = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe rating con ID: ${id}`);
    }
    return await Rating.deleteOne({ _id: id });
};

const updateRating = async (id, payload) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe escuela con ID: ${id}`);
    }
    const rating = await Rating.findOne({ _id: id });

    if (rating) {
        Object.entries(payload).forEach(([key, value]) => {
            rating[key] = value;
        });
        await rating.save();
    }
    return rating;
};

module.exports = {
    getRatings,
    findRating,
    createRating,
    deleteRating,
    updateRating,
};