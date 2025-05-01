const {
    getSchools,
    createSchool,
    findSchool,
    deleteSchool,
    updateSchool,
    addUserToSchool,
} = require("../repositories/school.repository");

const { findUserById } = require("../repositories/user.repository");
const { findDepartmentById, findCityByName } = require("../repositories/department.repository");

const getSchoolsController = async (req, res, next) => {
    try {
        const schools = await getSchools();
        res.status(200).json(schools);
    } catch (error) {
        next(error);
    }
};

const getSchoolController = async (req, res, next) => {
    try {
        const schoolId = req.params.id;
        const school = await findSchool(schoolId);
        if (school) {
            res.status(200).json(school);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado la escuela con id: ${schoolId}`
        });
    } catch (error) {
        next(error);
    }
};

const postSchoolController = async (req, res, next) => {
// TODO: crear escuela con usuario como admin si la escuela no existe o actualizar la escuela colocando al usario como standard si la escuela existe
    try {
        const { schoolNumber, departmentId, cityName, address } = req.body;
        const { userId } = req.user;

        const user = await findUserById(userId);
        if (!user) {
            res.status(404).json({
                message: `No se ha encontrado el usuario con id: ${userId}`
            });
            return;
        }

        const department = await findDepartmentById(departmentId);
        if (!department) {
            res.status(404).json({
                message: `No se ha encontrado el departamento con id: ${departmentId}`
            });
            return;
        }

        const city = await findCityByName(departmentId, cityName);
        if (!city) {
            res.status(404).json({
                message: `No se ha encontrado la ciudad ${cityName} en el departamento ${department.name}`
            });
            return;
        }
        //TODO: se agrega infinitamente el usuario a la escuela, se debe validar si ya existe el usuario en la escuela
        let school = await findSchool(schoolNumber, departmentId, cityName);
        if (school) {
            await addUserToSchool(user._id, school, "SECONDARY");
            res.status(200).json({
                message: `Usuario agregado correctamente a la escuela existente. Debe ser aprobado por el director.`
            });
            return;
        }

        school = await createSchool(schoolNumber, departmentId, cityName, address);
        await addUserToSchool(userId, school, "PRIMARY");
        res.status(201).json({
            message: "Escuela creada correctamente y usuario agregado como principal."
        });
    } catch (error) {
        next(error);
    }
};

const deleteSchoolController = async (req, res, next) => {
    try {
        const schoolId = req.params.id;
        await deleteSchool(schoolId);
        res.status(200).json({
            message: "Escuela eliminada correctamente"
        });
    } catch (error) {
        next(error);
    }
};

const putSchoolController = async (req, res, next) => {
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
        next(error);
    }
};

module.exports = {
    getSchoolsController,
    getSchoolController,
    postSchoolController,
    putSchoolController,
    deleteSchoolController,
};