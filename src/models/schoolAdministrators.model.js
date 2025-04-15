const schoolAdministrators = [
    {
        id: 1,
        userId:2,
        schoolId:5,
        isCurrent:false,
        assignedAt:new Date("2025-04-14T10:30:00Z")
    }
];

const getSchoolAdministrators = () => schoolAdministrators;

const createSchoolAdministrator = (title) => {
    const lastSchoolAdministrator = schoolAdministrators[schoolAdministrators.length - 1];
    const newSchoolAdministrator = {
        userId:2,
        schoolId:5,
        isCurrent:false,
        assignedAt:new Date("2025-04-14T10:30:00Z")
    }
    if (lastSchoolAdministrator) {
        newSchoolAdministrator.id = lastSchoolAdministrator.id + 1;
    } else {
        newSchoolAdministrator.id = 1;
    }
    schoolAdministrators.push(newSchoolAdministrator);
};

const findSchoolAdministrator = (id) => {
    const schoolAdministrator = schoolAdministrators.find((schoolAdministrator)=>schoolAdministrator.id==id);
    return schoolAdministrator;
};

const findByIndex = (id) => {
   return schoolAdministrators.findIndex((schoolAdministrator)=>schoolAdministrator.id==id);
};

const deleteSchoolAdministrator = (id) => {
    let indexToBeDeleted=schoolAdministrators.findIndex((schoolAdministrator)=>schoolAdministrator.id==id);
    if(indexToBeDeleted>=0){
        schoolAdministrators.splice(indexToBeDeleted,1);
    }
};

const updateSchoolAdministrator = (id,payload) => {
    const index = findByIndex(id);
    if(index>=0){
        schoolAdministrators[index]={...schoolAdministrators[index],...payload};
    }
    return schoolAdministrators[index];
};

module.exports = {
    getSchoolAdministrators,
    findSchoolAdministrator,
    createSchoolAdministrator,
    deleteSchoolAdministrator,
    updateSchoolAdministrator,
};