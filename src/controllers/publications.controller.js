const {
    getPublications,
    createPublication,
    findPublication,
    deletePublication,
    updatePublication,
} = require("../models/publications.model");

const getPublicationsController = (req, res) => {

    //extract query params
    const { page = 1, limit = 10 } = req.query;
    
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber <= 0 || limitNumber <= 0) {
        return res.status(400).json({ error: "Número de página o límite incorrecto" });
    }
    
    // obtain the publications
    let publications = getPublications(); //TODO: get the publications async from the database

    // filter by status
    publications = publications.filter((publication) => publication.status === "OPEN");

    //calculate indexes
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;

    //slice the publications
    const paginatedPublications = publications.slice(startIndex, endIndex);
    const total = publications.length;

    res.status(200).json({
        total: total,
        page: pageNumber,
        limit: limitNumber,
        publications: paginatedPublications,
    });
};

const getPublicationController = (req, res) => {
    const publicationId = req.params.id;
    const publication = findPublication(publicationId);
    if (publication) {
        res.status(200).json(publication);
        return;
    }
    res.status(404).json({
        message: `No se ha encontrado la publicación con id: ${publicationId}`,
    });
};

const postPublicationController = async (req, res) => {
    const { body } = req;
    createPublication(body.schoolId, body.grade, body.startDate, body.endDate, body.shift);
    res.status(201).json({
        message: "Publicación creada correctamente",
    });
};

const deletePublicationController = (req, res) => {
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
};

const putPublicationController = (req, res) => {
    console.log(req.body);
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
};

module.exports = {
    getPublicationsController,
    getPublicationController,
    postPublicationController,
    putPublicationController,
    deletePublicationController,
};