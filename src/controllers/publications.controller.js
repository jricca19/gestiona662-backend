const {
    getPublications,
    createPublication,
    findPublication,
    deletePublication,
    updatePublication,
} = require("../repositories/publication.repository");

const getPublicationsController = async (req, res, next) => {
    //TODO:  incluir next en el catch de cada controller
    try {
        const { page = 1, limit = 10 } = req.query;

        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber <= 0 || limitNumber <= 0) {
            return res.status(400).json({ error: "Número de página o límite incorrecto" });
        }

        const publications = await getPublications(); // Fetch publications from the database

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
        res.status(400).json({ error: error.message });
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
        res.status(400).json({ error: error.message });
    }
};

const postPublicationController = async (req, res, next) => {
    try {
        const { body } = req;

        if (!body.schoolId || !body.startDate || !body.endDate || !body.shift || (body.grade < 0 &&  body.grade > 6)) {
            return res.status(400).json({ error: "No ha ingresado todos los datos requeridos." });
        }

        await createPublication(body.schoolId, body.grade, body.startDate, body.endDate, body.shift);
        res.status(201).json({
            message: "Publicación creada correctamente",
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deletePublicationController = (req, res) => {
    try{
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
    res.status(400).json({ error: error.message });
}
};

const putPublicationController = (req, res) => {
    try{
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
    res.status(400).json({ error: error.message });
}
};

module.exports = {
    getPublicationsController,
    getPublicationController,
    postPublicationController,
    putPublicationController,
    deletePublicationController,
};