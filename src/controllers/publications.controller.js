const {
    getPublications,
    createPublication,
    findPublication,
    deletePublication,
    updatePublication,
    findDuplicatePublication,
} = require("../repositories/publication.repository");
const { findSchoolById } = require("../repositories/school.repository");
const { findUserById } = require("../repositories/user.repository");

const getPublicationsController = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const publications = await getPublications();

        // Filter by status
        const openPublications = publications.filter((publication) => publication.status === "OPEN");

        // Calculate indexes
        const startIndex = (pageNumber - 1) * limitNumber;
        const endIndex = pageNumber * limitNumber;

        // Slice the publications
        const paginatedPublications = openPublications.slice(startIndex, endIndex);
        const total = openPublications.length;

        res.status(200).json({
            total: total,
            page: pageNumber,
            limit: limitNumber,
            publications: paginatedPublications,
        });
    } catch (error) {
        next(error);
    }
};

const getPublicationController = async (req, res, next) => {
    try {
        const publicationId = req.params.id;
        const publication = await findPublication(publicationId);
        if (publication) {
            res.status(200).json(publication);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado la publicación con id: ${publicationId}`,
        });
    } catch (error) {
        next(error);
    }
};

const postPublicationController = async (req, res, next) => {
    try {
        const { schoolId, grade, startDate, endDate, shift } = req.body;
        const { userId } = req.user;

        const user = await findUserById(userId);
        if (!user) {
            res.status(404).json({
                message: `No se ha encontrado el usuario con id: ${userId}`,
            });
            return;
        }

        const school = await findSchoolById(schoolId);
        if (!school) {
            res.status(404).json({
                message: `No se ha encontrado la escuela con id: ${schoolId}`,
            });
            return;
        }

        const duplicated = await findDuplicatePublication(
            schoolId,
            grade,
            shift,
            startDate,
            endDate
        );
        if (duplicated) {
            res.status(400).json({
                message: "Ya existe una publicación abierta para esa escuela, grado, turno y rango de fechas.",
            });
            return;
        }

        await createPublication(schoolId, grade, startDate, endDate, shift);
        res.status(201).json({
            message: "Publicación creada correctamente",
        });
    } catch (error) {
        next(error);
    }
};

const deletePublicationController = (req, res, next) => {
    try {
        const publicationId = req.params.id;
        const publication = findPublication(publicationId);

        if (!publication) {
            res.status(404).json({
                message: `No se ha encontrado la publicación con id: ${publicationId}`,
            });
            return;
        }
        deletePublication(publicationId);
        res.status(200).json({
            message: "Publicación eliminada correctamente",
        });
    } catch (error) {
        next(error);
    }
};

const putPublicationController = (req, res, next) => {
    try {
        const publicationId = req.params.id;
        const { body } = req;
        const publication = findPublication(publicationId);

        if (!publication) {
            res.status(404).json({
                message: `No se ha encontrado la publicación con id: ${publicationId}`,
            });
            return;
        }
        updatePublication(publicationId, body);
        res.status(200).json(publication);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPublicationsController,
    getPublicationController,
    postPublicationController,
    putPublicationController,
    deletePublicationController,
};