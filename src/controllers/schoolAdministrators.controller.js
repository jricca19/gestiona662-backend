const {
    getSchoolAdministrators,
    createSchoolAdministrator,
    findSchoolAdministrator,
    deleteSchoolAdministrator,
    updateSchoolAdministrator
} = require("../repositories/schoolAdministrator.repository");

const getSchoolAdministratorsController = (req,res) => {
    console.log(req.query);
    res.status(200).json(getSchoolAdministrators());
}

const getSchoolAdministratorController = (req,res) => {
    const schoolAdministratorId = req.params.id;
    const schoolAdministrator = findSchoolAdministrator(schoolAdministratorId);
    if(schoolAdministrator){
        res.status(200).json(schoolAdministrator);
        return;
    }
    res.status(404).json({
        message: `No se ha encontrado el director con id: ${schoolAdministratorId}`
    })
}

const postSchoolAdministratorController = async (req,res) => {
    const {body} = req;
    createSchoolAdministrator(body.title);
    res.status(201).json({
        message: "Director creado correctamente"
    });
}

const deleteSchoolAdministratorController = (req,res) => {
    const schoolAdministratorId = req.params.id;
    deleteSchoolAdministrator(schoolAdministratorId);
    res.status(200).json({
        message: "Director eliminado correctamente"
    })
}

const putSchoolAdministratorController = (req,res)=>{
    const schoolAdministratorId=req.params.id;
    const {body} = req;
    let schoolAdministrator = findSchoolAdministrator(schoolAdministratorId);
    if(schoolAdministrator){
        schoolAdministrator=updateSchoolAdministrator(schoolAdministratorId,body);
        res.status(200).json(schoolAdministrator);
        return;
    }
    res.status(404).json({
        message: `No se ha encontrado el director con id: ${schoolAdministratorId}`
    });
}

module.exports={
    getSchoolAdministratorsController,
    getSchoolAdministratorController,
    postSchoolAdministratorController,
    putSchoolAdministratorController,
    deleteSchoolAdministratorController,
}