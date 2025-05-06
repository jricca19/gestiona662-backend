const {
    getPublications,
    createPublication,
    findPublication,
    deletePublication,
    updatePublication,
    findDuplicatePublication,
} = require("../repositories/publication.repository");
const { deletePostulationsByPublicationId } = require("../repositories/postulation.repository");
const { findSchoolById } = require("../repositories/school.repository");
const { findUserById } = require("../repositories/user.repository");

const getPublicationsController = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const publications = await getPublications();

        // Calculate indexes
        const startIndex = (pageNumber - 1) * limitNumber;
        const endIndex = pageNumber * limitNumber;

        // Paginate the publications
        const paginatedPublications = publications.slice(startIndex, endIndex);
        const total = publications.length;

        return res.status(200).json({ total: total, page: pageNumber, limit: limitNumber, publications: paginatedPublications });
    } catch (error) {
        next(error);
    }
};

const getPublicationController = async (req, res, next) => {
    try {
        const publicationId = req.params.id;
        const publication = await findPublication(publicationId);
        if (publication) {
            return res.status(200).json(publication);
        }
        return res.status(404).json({ message: `No se ha encontrado la publicación con id: ${publicationId}`, });
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
            return res.status(404).json({ message: `No se ha encontrado el usuario con id: ${userId}`, });
        }

        const school = await findSchoolById(schoolId);
        if (!school) {
            return res.status(404).json({ message: `No se ha encontrado la escuela con id: ${schoolId}`, });
        }

        const duplicated = await findDuplicatePublication(
            schoolId,
            grade,
            shift,
            startDate,
            endDate
        );
        if (duplicated) {
            return res.status(400).json({ message: "Ya existe una publicación abierta para esa escuela, grado, turno y rango de fechas.", });
        }

        await createPublication(schoolId, grade, startDate, endDate, shift);
        return res.status(201).json({ message: "Publicación creada correctamente", });
    } catch (error) {
        next(error);
    }
};

const deletePublicationController = async (req, res, next) => {
    try {
        const publicationId = req.params.id;
        const publication = findPublication(publicationId);

        if (!publication) {
            return res.status(404).json({ message: `No se ha encontrado la publicación con id: ${publicationId}`, });
        }
        await deletePostulationsByPublicationId(publicationId);
        await deletePublication(publicationId);
        return res.status(200).json({ message: "Publicación eliminada correctamente", });
    } catch (error) {
        next(error);
    }
};

const putPublicationController = async (req, res, next) => {
    try {
        const publicationId = req.params.id;
        const { body } = req;
        const publication = findPublication(publicationId);

        if (!publication) {
            return res.status(404).json({ message: `No se ha encontrado la publicación con id: ${publicationId}`, });
        }
        if (body.startDate && body.endDate & body.startDate > body.endDate) {
            return res.status(404).json({ message: `La fecha de fin debe ser mayor a la fecha de inicio`, });
        }
        await updatePublication(publicationId, body);
        return res.status(200).json({ message: "Publicación actualizada correctamente", });
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