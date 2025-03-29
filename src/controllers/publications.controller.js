const {
    getPublications,
    createPublication,
    findPublication,
    deletePublication,
    updatePublication,
} = require("../models/storage");

const getPublicationsController = (req, res) => {
    console.log(req.query);
    res.status(200).json(getPublications());
};

const getPublicationController = (req, res) => {
    const publicationId = req.params.id;
    const publication = findPublication(publicationId);
    if (publication) {
        res.status(200).json(publication);
        return;
    }
    res.status(404).json({
        message: `No se ha encontrado la publicación con id: ${publicationId} 😭`,
    });
};

const postPublicationController = async (req, res) => {
    const { body } = req;
    createPublication(body.title);
    res.status(201).json({
        message: "Publicación creada correctamente",
    });
};

const deletePublicationController = (req, res) => {
    const publicationId = req.params.id;
    deletePublication(publicationId);
    res.status(200).json({
        message: "Publicación eliminada correctamente",
    });
};

const putPublicationController = (req, res) => {
    const publicationId = req.params.id;
    const { body } = req;
    let publication = findPublication(publicationId);
    if (publication) {
        publication = updatePublication(publicationId, body);
        res.status(200).json(publication);
        return;
    }
    res.status(404).json({
        message: `No se ha encontrado la publicación con id: ${publicationId} 😭`,
    });
};

module.exports = {
    getPublicationsController,
    getPublicationController,
    postPublicationController,
    putPublicationController,
    deletePublicationController,
};