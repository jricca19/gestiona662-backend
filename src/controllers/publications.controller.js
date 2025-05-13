const {
    getPublications,
    createPublication,
    findPublication,
    deletePublication,
    updatePublication,
    findDuplicatePublication,
    getPublicationsBySchoolId,
} = require("../repositories/publication.repository");
const { deletePostulationsByPublicationId } = require("../repositories/postulation.repository");
const { findSchoolById } = require("../repositories/school.repository");

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

const getSchoolPublicationsController = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { schoolId } = req.body;

        const school = await findSchoolById(schoolId);
        if (!school) {
            return res.status(404).json({ message: `No se ha encontrado la escuela con id: ${schoolId}` });
        }

        const isUserInSchool = school.staff?.some(staff => staff.userId.toString() === _id);
        if (!isUserInSchool) {
            return res.status(403).json({ message: "No tiene permiso para ver las publicaciones de esta escuela." });
        }

        const publications = await getPublicationsBySchoolId(schoolId);
        return res.status(200).json(publications);
    } catch (error) {
        next(error);
    }
};

const postPublicationController = async (req, res, next) => {
    try {
        const { schoolId, grade, startDate, endDate, shift } = req.body;
        const { _id } = req.user;

        const school = await findSchoolById(schoolId);
        if (!school) {
            return res.status(404).json({ message: `No se ha encontrado la escuela con id: ${schoolId}`, });
        }

        const isUserInSchool = school.staff?.some(staff => staff.userId.toString() === _id);
        if (!isUserInSchool) {
            return res.status(403).json({ message: "No tiene permiso para crear publicaciones para esta escuela." });
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
        const { _id } = req.user;
        const publicationId = req.params.id;
        const publication = await findPublication(publicationId);

        if (!publication) {
            return res.status(404).json({ message: `No se ha encontrado la publicación con id: ${publicationId}` });
        }

        const hasActivePublication = ["OPEN", "FILLED"].includes(publication.status) &&
            publication.publicationDays?.some(day => day.assignedTeacherId !== null);

        if (hasActivePublication) {
            return res.status(400).json({ message: "No se puede eliminar una publicación activa que ya tiene personas asignadas" });
        }

        const school = await findSchoolById(publication.schoolId);
        const isUserInSchool = school.staff?.some(staff => staff.userId.toString() === _id);
        if (!isUserInSchool) {
            return res.status(403).json({ message: "No tiene permiso para eliminar esta publicación." });
        }

        await deletePostulationsByPublicationId(publicationId);
        await deletePublication(publicationId);
        return res.status(200).json({ message: "Publicación eliminada correctamente" });
    } catch (error) {
        next(error);
    }
};

const putPublicationController = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const publicationId = req.params.id;
        const { body } = req;
        const { schoolId, grade, startDate, endDate, shift } = body;
        const publication = findPublication(publicationId);

        if (!publication) {
            return res.status(404).json({ message: `No se ha encontrado la publicación con id: ${publicationId}`, });
        }

        const hasActivePublication = ["OPEN", "FILLED"].includes(publication.status) &&
            publication.publicationDays?.some(day => day.assignedTeacherId !== null);

        if (hasActivePublication) {
            return res.status(400).json({ message: "No se puede modificar una publicación activa que ya tiene personas asignadas." });
        }

        const school = await findSchoolById(publication.schoolId);
        const isUserInSchool = school.staff?.some(staff => staff.userId.toString() === _id);
        if (!isUserInSchool) {
            return res.status(403).json({ message: "No tiene permiso para modificar esta publicación." });
        }

        if (body.startDate && body.endDate & body.startDate > body.endDate) {
            return res.status(404).json({ message: `La fecha de fin debe ser mayor a la fecha de inicio`, });
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

        await updatePublication(publicationId, body);
        return res.status(200).json({ message: "Publicación actualizada correctamente", });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPublicationsController,
    getPublicationController,
    getSchoolPublicationsController,
    postPublicationController,
    putPublicationController,
    deletePublicationController,
};