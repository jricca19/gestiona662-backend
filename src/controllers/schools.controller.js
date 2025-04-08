const {
    getSchools,
    createSchool,
    findSchool,
    deleteSchool,
    updateSchool
} = require("../models/schools.model");

const getSchoolsController = (req,res) => {
    console.log(req.query);
    res.status(200).json(getSchools());
}

const getSchoolController = (req,res) => {
    const schoolId = req.params.id;
    const school = findSchool(schoolId);
    if(school){
        res.status(200).json(school);
        return;
    }
    res.status(404).json({
        message: `No se ha encontrado la escuela con id: ${schoolId}`
    })
}

const postSchoolController = async (req,res) => {
    const {body} = req;
    createSchool(body.title);
    res.status(201).json({
        message: "Escuela creada correctamente"
    });
}

const deleteSchoolController = (req,res) => {
    const schoolId = req.params.id;
    deleteSchool(schoolId);
    res.status(200).json({
        message: "Escuela eliminada correctamente"
    })
}

const putSchoolController = (req,res)=>{
    const schoolId=req.params.id;
    const {body} = req;
    let school = findSchool(schoolId);
    if(school){
        school=updateSchool(schoolId,body);
        res.status(200).json(school);
        return;
    }
    res.status(404).json({
        message: `No se ha encontrado la escuela con id: ${schoolId}`
    });
}

module.exports={
    getSchoolsController,
    getSchoolController,
    postSchoolController,
    putSchoolController,
    deleteSchoolController,
}