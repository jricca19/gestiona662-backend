const mongoose = require("mongoose");

const getPublicationDays = async () => {
    return await PublicationDay.find().select("publicationId date assignedTeacherId status");
};

const createPublicationDay = async (publicationId,date,assignedTeacherId,status) => {
    if (!mongoose.Types.ObjectId.isValid(publicationId)) {
        throw new Error(`Publicación con ID ${publicationId} inválido`);
    }
    // if (!mongoose.Types.ObjectId.isValid(assignedTeacherId)) {
    //     throw new Error(`Maestro con ID ${assignedTeacherId} inválido`);
    // }
    const duplicated = await findDuplicatePublicationDay(
        publicationId,date,assignedTeacherId
    );

    if (duplicated) {
        throw new Error("Ya existe un día de publicación asignado para esa fecha, publicación y profesor.");
    }
    const newPublicationDay = new PublicationDay({
        publicationId,date,assignedTeacherId,status
    });
    await newPublicationDay.save();
    return newPublicationDay;
};

const findPublicationDay = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe ID: ${id}`);
    }
    return await PublicationDay.findById(id).select("publicationId date assignedTeacherId status");
};

const findDuplicatePublicationDay = async (publicationId,date,assignedTeacherId) => {
    return await PublicationDay.findOne({
        publicationId:publicationId,
        date:date,
        assignedTeacherId:assignedTeacherId
    }).select("_id");
};

const deletePublicationDay = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe ID: ${id}`);
    }
    return await PublicationDay.deleteOne({ _id: id });
};

const deletePublicationDaysByPublicationId = async (publicationId) => {
    return await PublicationDay.deleteMany({ publicationId });
};

const updatePublicationDay = async (id, payload) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe ID: ${id}`);
    }
    const publicationDay = await PublicationDay.findOne({ _id: id });

    if (publicationDay) {
        Object.entries(payload).forEach(([key, value]) => {
            publicationDay[key] = value;
        });
        await publicationDay.save();
    }
    return publicationDay;
};

module.exports = {
    getPublicationDays,
    findPublicationDay,
    createPublicationDay,
    deletePublicationDay,
    deletePublicationDaysByPublicationId,
    updatePublicationDay,
};