const teachers = [
    {
        id: 1,
        userId:2,
        ci:"53615296",
        address:"18 de julio 1091",
        yearsExperience:2,
        gradeExperience:5,
        preferredShifts:"AFTERNOON",
        averageRating: 10 //Suponiendo que la escala de puntuación va de 1 a 10
    },
    {
        id: 2,
        userId:3,
        ci:"51234568",
        address:"18 de julio 1091",
        yearsExperience:2,
        gradeExperience:5,
        preferredShifts:"AFTERNOON",
        averageRating: 10 //Suponiendo que la escala de puntuación va de 1 a 10
    }
]

const getTeachers = () => teachers;

const createTeacher = (title) => {
    const lastTeacher = teachers[teachers.length - 1];
    const newTeacher = {
        userId:4,
        ci:"53615295",
        address:"Lima 1410",
        yearsExperience:2,
        gradeExperience:3,
        preferredShifts:"AFTERNOON",
        averageRating: 10
    }
    if (lastTeacher) {
        newTeacher.id = lastTeacher.id + 1;
    } else {
        newTeacher.id = 1;
    }
    teachers.push(newTeacher);
};

const findTeacher = (id) => {
    const teacher = teachers.find((teacher)=>teacher.id==id);
    return teacher;
};

const findByIndex = (id) => {
   return teachers.findIndex((teacher)=>teacher.id==id);
};

const deleteTeacher = (id) => {
    let indexToBeDeleted=teachers.findIndex((teacher)=>teacher.id==id);
    if(indexToBeDeleted>=0){
        teachers.splice(indexToBeDeleted,1);
    }
};

const updateTeacher = (id,payload) => {
    const index = findByIndex(id);
    if(index>=0){
        teachers[index]={...teachers[index],...payload};
    }
    return teachers[index];
};

module.exports = {
    getTeachers,
    findTeacher,
    createTeacher,
    deleteTeacher,
    updateTeacher,
};