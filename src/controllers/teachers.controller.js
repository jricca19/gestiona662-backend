const {
    getTeachers,
    createTeacher,
    findTeacher,
    deleteTeacher,
    updateTeacher
} = require("../repositories/teacher.repository");

const getTeachersController = async (req, res) => {
    try {
        const teachers = await getTeachers();
        res.status(200).json(teachers);
    } catch (error) {
        next(error);
    }
}

const getTeacherController = async (req, res) => {
    try {
        const teacherId = req.params.id;
        const teacher = await findTeacher(teacherId);
        if (teacher) {
            res.status(200).json(teacher);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado el maestro con id: ${teacherId}`
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const postTeacherController = async (req, res) => {
    try {
        const { body } = req;
        await createTeacher(body.userId, body.ci, body.address, body.yearsExperience, body.gradeExperience,
            body.preferredShifts, body.averageRating);
        res.status(201).json({
            message: "Maestro creado correctamente"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteTeacherController = async (req, res) => {
    try {
        const teacherId = req.params.id;
        await deleteTeacher(teacherId);
        res.status(200).json({
            message: "Maestro eliminado correctamente"
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const putTeacherController = async (req, res) => {
    try {
        const teacherId = req.params.id;
        const { body } = req;
        let teacher = await findTeacher(teacherId);
        if (teacher) {
            teacher = await updateTeacher(teacherId, body);
            res.status(200).json(teacher);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado el maestro con id: ${teacherId}`
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getTeachersController,
    getTeacherController,
    postTeacherController,
    putTeacherController,
    deleteTeacherController,
}