const {
    getPostulations,
    createPostulation,
    findPostulation,
    deletePostulation,
    updatePostulation,
    findDuplicatePostulation
} = require("../repositories/postulation.repository");
const { findPublication } = require("../repositories/publication.repository");

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

const postPostulationController = async (req, res, next) => {
    try {
        const { teacherId, publicationId, createdAt, appliesToAllDays, postulationDays } = req.body;

        if (!teacherId || !publicationId) {
            return res.status(400).json({ error: "No ha ingresado todos los datos requeridos." });
        }
        const duplicated = await findDuplicatePostulation(
            teacherId,
            publicationId
        );

        if (duplicated) {
            throw new Error("Ya existe una postulación registrada de ese maestro para esa publicación.");
        }
        if (!appliesToAllDays && (!postulationDays || postulationDays.length === 0)) {
            return res.status(400).json({ error: "Debe proporcionar postulationDays si no aplica a todos los días." });
        }

        if (!appliesToAllDays) {
            const publication = await findPublication(publicationId);
            if (!publication) {
                return res.status(404).json({ error: "La publicación no existe." });
            }

            const fechasValidas = publication.publicationDays.map(day =>
                new Date(day.date).toISOString().split('T')[0]
            );

            for (const pd of postulationDays) {
                const fechaPostulacion = new Date(pd.date).toISOString().split('T')[0];
                if (!fechasValidas.includes(fechaPostulacion)) {
                    return res.status(400).json({
                        error: `La fecha ${fechaPostulacion} no es válida para esta publicación.`
                    });
                }
            }
        }

        await createPostulation(teacherId, publicationId, createdAt, appliesToAllDays, postulationDays);
        res.status(201).json({ message: "Postulación creada correctamente" });

    } catch (error) {
        next(error);
    }
};

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