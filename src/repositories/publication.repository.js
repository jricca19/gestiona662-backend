const mongoose = require("mongoose");
const Publication = require("../models/publication.model");
const { findSchool } = require("./school.repository");
const {createPublicationDay,deletePublicationDaysByPublicationId}=require("./publicationDay.repository");
const connectToRedis = require("../services/redis.service");

const getPublications = async () => {
    const redisClient = connectToRedis();
    let publications = await redisClient.get("publications");
    if (!publications) {
        publications = await Publication.find().populate("publicationDays").select("_id schoolId grade startDate endDate shift status");
        redisClient.set("publications", JSON.stringify(publications),{ ex: 3600});
    }
    return publications;
};

const createPublication = async (schoolId, grade, startDate, endDate, shift) => {
    if (!mongoose.Types.ObjectId.isValid(schoolId)) {
        throw new Error(`Escuela con ID ${schoolId} inválido`);
    }

    const schoolExists = await findSchool(schoolId);
    if (!schoolExists) {
        throw new Error(`No existe una escuela con el ID: ${schoolId}`);
    }

    const duplicated = await findDuplicatePublication(
        schoolId,
        grade,
        shift,
        startDate,
        endDate
    );

    if (duplicated) {
        throw new Error("Ya existe una publicación abierta para esa escuela, grado, turno y rango de fechas.");
    }

    const newPublication = new Publication({
        schoolId,
        grade,
        startDate,
        endDate,
        shift,
        status: "OPEN",
    });
    const redisClient = connectToRedis();
    redisClient.del("publications");
    await newPublication.save();
    await generatePublicationDays(newPublication._id, startDate, endDate);
    return newPublication;
};

const generatePublicationDays = async (publicationId, startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const publicationDays = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const day = new Date(d);
        const weekday = day.getDay();

        if (weekday >= 1 && weekday <= 5) { // Lunes (1) a Viernes (5)
            const createdDay = await createPublicationDay(publicationId, day,null,"AVAILABLE");
            publicationDays.push(createdDay);
        }
    }

    return publicationDays;
};

const findPublication = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`No existe ID: ${id}`);
    }
    return await Publication.findById(id).select("_id schoolId grade startDate endDate shift status");
};

//TODO: si el estado es filled debe tenerlo en cuenta también?
const findDuplicatePublication = async (schoolId, grade, shift, startDate, endDate) => {
    return await Publication.findOne({
        schoolId: schoolId,
        grade: grade,
        shift: shift,
        status: "OPEN",
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
    await deletePublicationDaysByPublicationId(id);
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
    const redisClient = connectToRedis();
    redisClient.del("publications");
    return publication;
};

module.exports = {
    getPublications,
    findPublication,
    createPublication,
    deletePublication,
    updatePublication,
};
