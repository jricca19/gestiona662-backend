const {
    getPublicationDays,
    createPublicationDay,
    findPublicationDay,
    deletePublicationDay,
    updatePublicationDay
} = require("../repositories/publicationDay.repository");

const getPublicationDaysController = async (req, res) => {
    try {
        console.log(req.query);
        const publicationDays = await getPublicationDays();
        res.status(200).json(publicationDays);
    } catch (error) {
        next(error);
    }
}

const getPublicationDayController = async (req, res) => {
    try {
        const publicationDayId = req.params.id;
        const publicationDay = await findPublicationDay(publicationDayId);
        if (publicationDay) {
            res.status(200).json(publicationDay);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado el día de publicación con id: ${publicationDayId}`
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const postPublicationDayController = async (req, res) => {
    try {
        const { body } = req;

        if (!body.publicationId || !body.date || !body.assignedTeacherId || !body.status) {
            return res.status(400).json({ error: "No ha ingresado todos los datos requeridos." });
        }

        await createPublicationDay(body.publicationId, body.date, body.assignedTeacherId, body.status);
        res.status(201).json({
            message: "Día de publicación creado correctamente"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deletePublicationDayController = async (req, res) => {
    try {
        const publicationDayId = req.params.id;
        await deletePublicationDay(publicationDayId);
        res.status(200).json({
            message: "Día de publicación eliminado correctamente"
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const putPublicationDayController = async (req, res) => {
    try {
        const publicationDayId = req.params.id;
        const { body } = req;
        let publicationDay = await findPublicationDay(publicationDayId);
        if (publicationDay) {
            publicationDay = await updatePublicationDay(publicationDayId, body);
            res.status(200).json(publicationDay);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado el día de publicación con id: ${publicationDayId}`
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getPublicationDaysController,
    getPublicationDayController,
    postPublicationDayController,
    putPublicationDayController,
    deletePublicationDayController,
}