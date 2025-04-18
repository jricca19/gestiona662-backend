const {
    getPostulations,
    createPostulation,
    findPostulation,
    deletePostulation,
    updatePostulation
} = require("../repositories/postulation.repository");

const getPostulationsController = (req,res) => {
    console.log(req.query);
    res.status(200).json(getPostulations());
}

const getPostulationController = (req,res) => {
    const postulationId = req.params.id;
    const postulation = findPostulation(postulationId);
    if(school){
        res.status(200).json(postulation);
        return;
    }
    res.status(404).json({
        message: `No se ha encontrado la postulación con id: ${postulationId}`
    })
}

const postPostulationController = async (req,res) => {
    const {body} = req;
    createPostulation(body.title);
    res.status(201).json({
        message: "Postulación creada correctamente"
    });
}

const deletePostulationController = (req,res) => {
    const postulationId = req.params.id;
    deletePostulation(postulationId);
    res.status(200).json({
        message: "Postulación eliminada correctamente"
    })
}

const putPostulationController = (req,res)=>{
    const postulationId=req.params.id;
    const {body} = req;
    let postulation = findPostulation(postulationId);
    if(postulation){
        postulation=updatePostulation(postulationId,body);
        res.status(200).json(postulation);
        return;
    }
    res.status(404).json({
        message: `No se ha encontrado la postulación con id: ${postulationId}`
    });
}

module.exports={
    getPostulationsController,
    getPostulationController,
    postPostulationController,
    putPostulationController,
    deletePostulationController,
}