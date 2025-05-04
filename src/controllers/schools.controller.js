const {
    getSchools,
    createSchool,
    findSchool,
    findSchoolById,
    deleteSchool,
    updateSchool,
    addUserToSchool,
} = require("../repositories/school.repository");

const { findUserById, addSchoolToUserProfile, removeSchoolFromUserProfiles } = require("../repositories/user.repository");
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
        const school = await findSchoolById(schoolId);
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

        let school = await findSchool(schoolNumber, departmentId, cityName);

        if (school) {
            const userInSchool = school.staff?.some(staff => staff.userId.toString() === userId);
            if (userInSchool) {
                res.status(400).json({
                    message: `El usuario ya está registrado en la escuela ${schoolNumber} en ${cityName}`
                });
                return;
            }
            await addUserToSchool(userId, school, "SECONDARY");
            await addSchoolToUserProfile(user, school._id);
            res.status(200).json({
                message: `Usuario agregado correctamente a la escuela existente. Debe ser aprobado por el director.`
            });
            return;
        }

        school = await createSchool(schoolNumber, departmentId, cityName, address);
        await addUserToSchool(userId, school, "PRIMARY");
        await addSchoolToUserProfile(user, school._id);
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
        const { userId } = req.user;

        const user = await findUserById(userId);
        if (!user) {
            res.status(404).json({
                message: `No se ha encontrado el usuario con id: ${userId}`
            });
            return;
        }

        const school = await findSchoolById(schoolId);
        if (!school) {
            res.status(404).json({
                message: `No se ha encontrado la escuela con id: ${schoolId}`
            });
            return;
        }

        const isPrimary = school.staff?.some(staff => 
            staff.userId.toString() === userId && staff.role === "PRIMARY"
        );

        if (!isPrimary) {
            return res.status(403).json({
                message: "No tienes permiso para eliminar esta escuela. Debes ser el propietario aprobado."
            });
        }

        await deleteSchool(schoolId);
        await removeSchoolFromUserProfiles(schoolId);

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
        const { schoolNumber, departmentId, cityName, address } = req.body;

        const user = await findUserById(userId);
        if (!user) {
            res.status(404).json({
                message: `No se ha encontrado el usuario con id: ${userId}`
            });
            return;
        }

        const school = await findSchoolById(schoolId);
        if (!school) {
            res.status(404).json({
                message: `No se ha encontrado la escuela con id: ${schoolId}`
            });
            return;
        }

        if (departmentId) {
            const department = await findDepartmentById(departmentId);
            if (!department) {
                res.status(404).json({
                    message: `No se ha encontrado el departamento con id: ${departmentId}`
                });
                return;
            }
        }

        if (cityName && departmentId) {
            const city = await findCityByName(departmentId, cityName);
            if (!city) {
                res.status(404).json({
                    message: `No se ha encontrado la ciudad ${cityName} en el departamento especificado`
                });
                return;
            }
        }

        //TODO: validar que el usuario es el principal de la escuela

        const updatedSchool = await updateSchool(school, { schoolNumber, departmentId, cityName, address });
        res.status(200).json(updatedSchool);
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