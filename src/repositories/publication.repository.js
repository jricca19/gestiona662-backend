const mongoose = require("mongoose");
const Publication = require("../models/publication.model");
const connectToRedis = require("../services/redis.service");

const getPublications = async () => {
    const redisClient = connectToRedis();
    let publications = await redisClient.get("publications");
    if (!publications) {
        publications = await Publication.find({ status: "OPEN" }).select();
        redisClient.set("publications", JSON.stringify(publications));
    }
    return publications;
};

const getPublicationsBySchoolId = async (schoolId) => {
    return await Publication.find({ schoolId }).select();
};

const createPublication = async (schoolId, grade, startDate, endDate, shift) => {
    if (!mongoose.Types.ObjectId.isValid(schoolId)) {
        throw new Error(`Escuela con ID ${schoolId} inválido`);
    }

    const publicationDays = await generatePublicationDays(startDate, endDate);
    const newPublication = new Publication({
        schoolId,
        grade,
        startDate,
        endDate,
        shift,
        status: "OPEN",
        publicationDays
    });
    const redisClient = connectToRedis();
    redisClient.del("publications");
    await newPublication.save();
    return newPublication;
};

const generatePublicationDays = async (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const day = new Date(d);

        const weekday = day.getDay();
        if (weekday >= 1 && weekday <= 5) {
            days.push({
                date: new Date(day),
                assignedTeacherId: null,
                status: "AVAILABLE"
            });
        }
    }
    return days;
};

const findPublication = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe ID: ${id}`);
    }
    return await Publication.findById(id).select("_id schoolId grade startDate endDate shift status publicationDays");
};

const findDuplicatePublication = async (schoolId, grade, shift, startDate, endDate) => {
    return await Publication.findOne({
        schoolId: schoolId,
        grade: grade,
        shift: shift,
        status: { $in: ["OPEN", "FILLED"] },
        startDate: { $lte: new Date(endDate) },
        endDate: { $gte: new Date(startDate) }
    }).select("_id");
};

const deletePublication = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe ID: ${id}`);
    }
    const redisClient = connectToRedis();
    redisClient.del("publications");
    return await Publication.deleteOne({ _id: id });
};

const deletePublicationBySchoolId = async (schoolId) => {
    await Publication.deleteMany({ schoolId });
}

const updatePublication = async (id, payload) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe publicación con ID: ${id}`);
    }
    if (payload.schoolId && !mongoose.Types.ObjectId.isValid(payload.schoolId)) {
        throw new Error(`Escuela con ID ${payload.schoolId} inválido`);
    }
    const publication = await Publication.findOne({ _id: id });

    if (publication) {
        Object.entries(payload).forEach(([key, value]) => {
            publication[key] = value;
        });
        await publication.save();
    }
    const redisClient = connectToRedis();
    redisClient.del("publications");
    return publication;
};

const isTeacherInPublicationDays = (publication, teacherId) => {
    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
        throw new Error(`ID de maestro inválido: ${teacherId}`);
    }

    return publication.publicationDays.some(day => day.assignedTeacherId?.toString() === teacherId);
};

module.exports = {
    getPublications,
    findPublication,
    createPublication,
    deletePublication,
    updatePublication,
    deletePublicationBySchoolId,
    findDuplicatePublication,
    getPublicationsBySchoolId,
    isTeacherInPublicationDays
};
