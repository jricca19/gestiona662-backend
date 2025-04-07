const publications = [
    {
        id: 1,
        schoolId: 1,
        grade: 6, // 0 for preschool
        startDate: "2023-10-01",
        endDate: "2023-10-03", // maximun 3 days
        shift: "MORNING", // MORNING, AFTERNOON, FULL_DAY
        status: "OPEN", // OPEN, FILLED, CANCELLED, CLOSED
    },
    {
        id: 2,
        schoolId: 2,
        grade: 3,
        startDate: "2023-10-01",
        endDate: "2023-10-03",
        shift: "AFTERNOON",
        status: "FILLED",
    },
    {
        id: 3,
        schoolId: 1,
        grade: 6,
        startDate: "2023-10-01",
        endDate: "2023-10-03",
        shift: "FULL_DAY",
        status: "CANCELLED",
    },
];

const getPublications = () => publications;

const createPublication = (schoolId, grade, startDate, endDate, shift) => {
    const lastPublication = publications[publications.length - 1];
    const newPublication = {
        schoolId,
        grade,
        startDate,
        endDate,
        shift,
        status: "OPEN",
    };
    if (lastPublication) {
        newPublication.id = lastPublication.id + 1;
    } else {
        newPublication.id = 1;
    }
    publications.push(newPublication);
};

const findPublication = (id) => {
    const publication = publications.find((publication) => publication.id == id);
    return publication;
};

const findByIndex = (id) => {
    return publications.findIndex((publication) => publication.id == id);
};

const deletePublication = (id) => {
    let indexToBeDeleted = publications.findIndex((publication) => publication.id == id);
    if (indexToBeDeleted >= 0) {
        publications.splice(indexToBeDeleted, 1);
    }
};

const updatePublication = (id, payload) => {
    const index = findByIndex(id);
    if (index >= 0) {
        publications[index] = { ...publications[index], ...payload };
    }
    return publications[index];
};

module.exports = {
    getPublications,
    findPublication,
    createPublication,
    deletePublication,
    updatePublication,
};
