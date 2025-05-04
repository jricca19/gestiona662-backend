const {
    getPostulations,
    createPostulation,
    findPostulation,
    deletePostulation,
    updatePostulation
} = require("../repositories/postulation.repository");

const getPostulationsController = async (req, res) => {
    try {
        const postulations = await getPostulations();
        res.status(200).json(postulations);
    } catch (error) {
        res.status(400).json({ error: error.message });;
    }
}

const getPostulationController = async (req, res) => {
    try {
        const postulationId = req.params.id;
        const postulation = await findPostulation(postulationId);
        if (postulation) {
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
        const { teacherId, publicationId, createdAt, appliesToAllDays, postulationDays } = req.body;
        if (!teacherId || !publicationId) {
            return res.status(400).json({ error: "No ha ingresado todos los datos requeridos."});
        }
        if (!appliesToAllDays && (!postulationDays || postulationDays.length === 0)) {
            return res.status(400).json({ error: "Debe proporcionar postulationDays si no aplica a todos los días" });
        }
        if (!appliesToAllDays) {
            const dayIds = postulationDays.map(d => d.publicationDayId);
      
            const validDays = await PublicationDay.find({
              _id: { $in: dayIds },
              publicationId: publicationId
            });
      
            if (validDays.length !== dayIds.length) {
              return res.status(400).json({ error: "Uno o más postulationDays son inválidos o no pertenecen a la publicación" });
            }
        }
        await createPostulation(teacherId, publicationId, createdAt);
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