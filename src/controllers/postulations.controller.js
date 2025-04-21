const {
    getPostulations,
    createPostulation,
    findPostulation,
    deletePostulation,
    updatePostulation
} = require("../repositories/postulation.repository");

const getPostulationsController = async (req, res) => {
    try {
        console.log(req.query);
        const postulations = await getPostulations();
        res.status(200).json(postulations);
    } catch (error) {
        next(error);
    }
}

const getPostulationController = async (req, res) => {
    try {
        const postulationId = req.params.id;
        const postulation = await findPostulation(postulationId);
        if (school) {
            res.status(200).json(postulation);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado la postulación con id: ${postulationId}`
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const postPostulationController = async (req, res) => {
    try {
        const { body } = req;
        await createPostulation(body.teacherId, body.publicationId, body.status, body.createdAt);
        res.status(201).json({
            message: "Postulación creada correctamente"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deletePostulationController = async (req, res) => {
    try {
        const postulationId = req.params.id;
        await deletePostulation(postulationId);
        res.status(200).json({
            message: "Postulación eliminada correctamente"
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const putPostulationController = async (req, res) => {
    try {
        const postulationId = req.params.id;
        const { body } = req;
        let postulation = await findPostulation(postulationId);
        if (postulation) {
            postulation = await updatePostulation(postulationId, body);
            res.status(200).json(postulation);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado la postulación con id: ${postulationId}`
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getPostulationsController,
    getPostulationController,
    postPostulationController,
    putPostulationController,
    deletePostulationController,
}