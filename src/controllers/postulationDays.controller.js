const {
    getPostulationDays,
    createPostulationDay,
    findPostulationDay,
    deletePostulationDay,
    updatePostulationDay
} = require("../repositories/postulationDay.repository");

const getPostulationDaysController = async (req, res) => {
    try {
        console.log(req.query);
        const postulationDays = await getPostulationDays();
        res.status(200).json(postulationDays);
    } catch (error) {
        next(error);
    }
}

const getPostulationDayController = async (req, res) => {
    try {
        const postulationDayId = req.params.id;
        const postulationDay = await findPostulationDay(postulationDayId);
        if (postulationDay) {
            res.status(200).json(postulationDay);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado el día de postulación con id: ${postulationDayId}`
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const postPostulationDayController = async (req, res) => {
    try {
        const { body } = req;

        if (!body.postulationId || !body.publicationDayId) {
            return res.status(400).json({ error: "No ha ingresado todos los datos requeridos." });
        }

        await createPostulationDay(body.postulationId,body.publicationDayId);
        res.status(201).json({
            message: "Día de postulación creado correctamente"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deletePostulationDayController = async (req, res) => {
    try {
        const postulationDayId = req.params.id;
        await deletePostulationDay(postulationDayId);
        res.status(200).json({
            message: "Día de postulación eliminado correctamente"
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const putPostulationDayController = async (req, res) => {
    try {
        const postulationDayId = req.params.id;
        const { body } = req;
        if (postulationDay) {
            postulationDay = await updatePostulationDay(postulationDayId, body);
            res.status(200).json(postulationDay);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado día de postulación con id: ${postulationDayId}`
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getPostulationDaysController,
    getPostulationDayController,
    postPostulationDayController,
    putPostulationDayController,
    deletePostulationDayController,
}