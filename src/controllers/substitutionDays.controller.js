const {
    getSubstitutionDays,
    createSubstitutionDay,
    findSubstitutionDay,
    deleteSubstitutionDay,
    updateSubstitutionDay
} = require("../repositories/substitutionDay.repository");

const getSubstitutionDaysController = async (req, res) => {
    try {
        console.log(req.query);
        const substitutionDays = await getSubstitutionDays();
        res.status(200).json(substitutionDays);
    } catch (error) {
        next(error);
    }
}

const getSubstitutionDayController = async (req, res) => {
    try {
        const substitutionDayId = req.params.id;
        const substitutionDay = await findSubstitutionDay(substitutionDayId);
        if (substitutionDay) {
            res.status(200).json(substitutionDay);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado el día de suplencia con id: ${substitutionDayId}`
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const postSubstitutionDayController = async (req, res) => {
    try {
        const { body } = req;

        if (!body.publicationId || !body.date || !body.assignedTeacherId || !body.status) {
            return res.status(400).json({ error: "No ha ingresado todos los datos requeridos." });
        }

        await createSubstitutionDay(body.publicationId, body.date, body.assignedTeacherId, body.status);
        res.status(201).json({
            message: "Día de suplencia creado correctamente"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteSubstitutionDayController = async (req, res) => {
    try {
        const substitutionDayId = req.params.id;
        await deleteSubstitutionDay(substitutionDayId);
        res.status(200).json({
            message: "Día de sustitución eliminado correctamente"
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const putSubstitutionDayController = async (req, res) => {
    try {
        const substitutionDayId = req.params.id;
        const { body } = req;
        let substitutionDay = await findSubstitutionDay(substitutionDayId);
        if (substitutionDay) {
            substitutionDay = await updateSubstitutionDay(substitutionDayId, body);
            res.status(200).json(substitutionDay);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado el día de sustitución con id: ${substitutionDayId}`
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getSubstitutionDaysController,
    getSubstitutionDayController,
    postSubstitutionDayController,
    putSubstitutionDayController,
    deleteSubstitutionDayController,
}