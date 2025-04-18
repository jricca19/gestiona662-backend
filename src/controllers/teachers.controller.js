const {
    getTeachers,
    createTeacher,
    findTeacher,
    deleteTeacher,
    updateTeacher
} = require("../repositories/teacher.repository");

const getTeachersController = (req,res) => {
    console.log(req.query);
    res.status(200).json(getTeachers());
}

const getTeacherController = (req,res) => {
    const teacherId = req.params.id;
    const teacher = findTeacher(teacherId);
    if(teacher){
        res.status(200).json(teacher);
        return;
    }
    res.status(404).json({
        message: `No se ha encontrado el maestro con id: ${teacherId}`
    })
}

const postTeacherController = async (req,res) => {
    const {body} = req;
    createTeacher(body.title);
    res.status(201).json({
        message: "Maestro creado correctamente"
    });
}

const deleteTeacherController = (req,res) => {
    const teacherId = req.params.id;
    deleteTeacher(teacherId);
    res.status(200).json({
        message: "Maestro eliminado correctamente"
    })
}

const putTeacherController = (req,res)=>{
    const teacherId=req.params.id;
    const {body} = req;
    let teacher = findTeacher(teacherId);
    if(teacher){
        teacher=updateTeacher(teacherId,body);
        res.status(200).json(teacher);
        return;
    }
    res.status(404).json({
        message: `No se ha encontrado el maestro con id: ${teacherId}`
    });
}

module.exports={
    getTeachersController,
    getTeacherController,
    postTeacherController,
    putTeacherController,
    deleteTeacherController,
}