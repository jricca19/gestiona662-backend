const schools = [
    {
        id: 1,
        schoolNumber: 1,
        department: "Colonia",
        city: "Juan Lacaze",
        address: "Montevideo 585"
    }
];

const getSchools = () => schools;

const createSchool = (title) => {
    const lastSchool = schools[schools.length - 1];
    const newSchool = {
        schoolNumber: 2,
        department: "Montevideo",
        city: "Montevideo",
        address: "Montevideo 586"
    }
    if (lastSchool) {
        newSchool.id = lastSchool.id + 1;
    } else {
        newSchool.id = 1;
    }
    schools.push(newSchool);
};

const findSchool = (id) => {
    const school = schools.find((school)=>school.id==id);
    return school;
};

const findByIndex = (id) => {
   return schools.findIndex((school)=>school.id==id);
};

const deleteSchool = (id) => {
    let indexToBeDeleted=schools.findIndex((school)=>school.id==id);
    if(indexToBeDeleted>=0){
        schools.splice(indexToBeDeleted,1);
    }
};

const updateSchool = (id,payload) => {
    const index = findByIndex(id);
    if(index>=0){
        schools[index]={...schools[index],...payload};
    }
    return schools[index];
};

module.exports = {
    getSchools,
    findSchool,
    createSchool,
    deleteSchool,
    updateSchool,
};