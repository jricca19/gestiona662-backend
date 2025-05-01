const {
    getSchools,
    createSchool,
    findSchool,
    deleteSchool,
    updateSchool
} = require("../repositories/school.repository");

const getSchoolsController = async (req, res) => {
    try {
        const schools = await getSchools();
        res.status(200).json(schools);
    } catch (error) {
        next(error);
    }
}

const getSchoolController = async (req, res) => {
    try {
        const schoolId = req.params.id;
        const school = await findSchool(schoolId);
        if (school) {
            res.status(200).json(school);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado la escuela con id: ${schoolId}`
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const postSchoolController = async (req, res) => {
    // TODO: crear escuela con usuario como admin si la escuela no existe o actualizar la escuela colocando al usario como standard si la escuela existe
    try {
        const { body } = req;

        if (!body.schoolNumber || !body.departmentId || !body.cityName || !body.address) {
            return res.status(400).json({ error: "No ha ingresado todos los datos requeridos." });
        }

        await createSchool(body.schoolNumber, body.departmentId, body.cityName, body.address);
        res.status(201).json({
            message: "Escuela creada correctamente"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteSchoolController = async (req, res) => {
    try {
        const schoolId = req.params.id;
        await deleteSchool(schoolId);
        res.status(200).json({
            message: "Escuela eliminada correctamente"
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const putSchoolController = async (req, res) => {
    try {
        const schoolId = req.params.id;
        const { body } = req;
        let school = await findSchool(schoolId);
        if (school) {
            school = await updateSchool(schoolId, body);
            res.status(200).json(school);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado la escuela con id: ${schoolId}`
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getSchoolsController,
    getSchoolController,
    postSchoolController,
    putSchoolController,
    deleteSchoolController,
}