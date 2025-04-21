const {
    getSchoolAdministrators,
    createSchoolAdministrator,
    findSchoolAdministrator,
    deleteSchoolAdministrator,
    updateSchoolAdministrator
} = require("../repositories/schoolAdministrator.repository");

const getSchoolAdministratorsController = async (req, res) => {
    try {
        console.log(req.query);
        const schoolAdministrators = await getSchoolAdministrators();
        res.status(200).json(schoolAdministrators);
    } catch (error) {
        next(error);
    }
}

const getSchoolAdministratorController = async (req, res) => {
    try {
        const schoolAdministratorId = req.params.id;
        const schoolAdministrator = await findSchoolAdministrator(schoolAdministratorId);
        if (schoolAdministrator) {
            res.status(200).json(schoolAdministrator);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado el director con id: ${schoolAdministratorId}`
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const postSchoolAdministratorController = async (req, res) => {
    try {
        const { body } = req;
        await createSchoolAdministrator(body.title);
        res.status(201).json({
            message: "Director creado correctamente"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteSchoolAdministratorController = async (req, res) => {
    try {
        const schoolAdministratorId = req.params.id;
        await deleteSchoolAdministrator(schoolAdministratorId);
        res.status(200).json({
            message: "Director eliminado correctamente"
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const putSchoolAdministratorController = async (req, res) => {
    try {
        const schoolAdministratorId = req.params.id;
        const { body } = req;
        let schoolAdministrator = await findSchoolAdministrator(schoolAdministratorId);
        if (schoolAdministrator) {
            schoolAdministrator = await updateSchoolAdministrator(schoolAdministratorId, body);
            res.status(200).json(schoolAdministrator);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado el director con id: ${schoolAdministratorId}`
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getSchoolAdministratorsController,
    getSchoolAdministratorController,
    postSchoolAdministratorController,
    putSchoolAdministratorController,
    deleteSchoolAdministratorController,
}