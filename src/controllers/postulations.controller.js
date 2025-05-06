const {
    getPostulations,
    createPostulation,
    findPostulation,
    deletePostulation,
    updatePostulation,
    findDuplicatePostulation
} = require("../repositories/postulation.repository");
const { findPublication } = require("../repositories/publication.repository");

const getPostulationsController = async (req, res, next) => {
    try {
        const postulations = await getPostulations();
        return res.status(200).json(postulations);
    } catch (error) {
        next(error);
    }
}

const getPostulationController = async (req, res, next) => {
    try {
        const postulationId = req.params.id;
        const postulation = await findPostulation(postulationId);
        if (postulation) {
            return res.status(200).json(postulation);
        }
        return res.status(404).json({ message: `No se ha encontrado la postulación con id: ${postulationId}` })
    } catch (error) {
        next(error);
    }
}

const postPostulationController = async (req, res, next) => {
    try {
        const { teacherId, publicationId, createdAt, appliesToAllDays, postulationDays } = req.body;

        if (!teacherId || !publicationId) {
            return res.status(400).json({ error: "No ha ingresado todos los datos requeridos." });
        }
        const publication = await findPublication(publicationId);
        if (!publication) {
            return res.status(404).json({ error: "La publicación no existe." });
        }
        const duplicated = await findDuplicatePostulation(teacherId, publicationId);

        if (duplicated) {
            return res.status(409).json({ error: "Ya existe una postulación registrada de ese maestro para esa publicación." });
        }
        if (!appliesToAllDays && (!postulationDays || postulationDays.length === 0)) {
            return res.status(400).json({ error: "Debe proporcionar postulationDays si no aplica a todos los días." });
        }

        let finalPostulationDays = [];

        if (appliesToAllDays) {
            // Generate all publication days as postulationDays
            finalPostulationDays = publication.publicationDays.map(day => ({ date: day.date }));
        } else {
            if (!postulationDays || postulationDays.length === 0) {
                return res.status(400).json({ error: "Debe proporcionar postulationDays si no aplica a todos los días." });
            }

            const fechasValidas = publication.publicationDays.map(day => new Date(day.date).toISOString().split('T')[0]);

            for (const pd of postulationDays) {
                const fechaPostulacion = new Date(pd.date).toISOString().split('T')[0];
                if (!fechasValidas.includes(fechaPostulacion)) {
                    return res.status(400).json({ error: `La fecha ${fechaPostulacion} no es válida para esta publicación.` });
                }
            }

            finalPostulationDays = postulationDays;
        }

        await createPostulation(teacherId, publicationId, createdAt, appliesToAllDays, finalPostulationDays);
        return res.status(201).json({ message: "Postulación creada correctamente" });

    } catch (error) {
        next(error);
    }
};

const deletePostulationController = async (req, res, next) => {
    try {
        const postulationId = req.params.id;
        await deletePostulation(postulationId);
        return res.status(200).json({ message: "Postulación eliminada correctamente" })
    } catch (error) {
        next(error);
    }
}

const putPostulationController = async (req, res, next) => {
    try {
        const postulationId = req.params.id;
        const { body } = req;
        let postulation = await findPostulation(postulationId);
        if (postulation) {
            postulation = await updatePostulation(postulationId, body);
            return res.status(200).json(postulation);
        }
        res.status(404).json({ message: `No se ha encontrado la postulación con id: ${postulationId}` });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getPostulationsController,
    getPostulationController,
    postPostulationController,
    putPostulationController,
    deletePostulationController,
}