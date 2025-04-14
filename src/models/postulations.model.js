const postulations=[
    {
        id:1,
        teacherId:2,
        publicationId:4,
        status:"PENDING",
        createdAt: new Date("2025-04-14T10:30:00Z")
    }
]

const getPostulations = () => postulations;

const createPostulation = (teacherId, publicationId, status, createdAt) => {
    const lastPostulation = postulations[postulations.length - 1];
    const newPostulation = {
        teacherId,
        publicationId,
        status,
        createdAt
    };
    if (lastPostulation) {
        newPostulation.id = lastPostulation.id + 1;
    } else {
        newPostulation.id = 1;
    }
    postulations.push(newPostulation);
};

const findPostulation = (id) => {
    const postulation = postulations.find((postulation) => postulation.id == id);
    return postulation;
};

const findByIndex = (id) => {
    return postulations.findIndex((postulation) => postulation.id == id);
};

const deletePostulation = (id) => {
    let indexToBeDeleted = postulations.findIndex((postulation) => postulation.id == id);
    if (indexToBeDeleted >= 0) {
        postulations.splice(indexToBeDeleted, 1);
    }
};

const updatePostulation = (id, payload) => {
    const index = findByIndex(id);
    if (index >= 0) {
        postulations[index] = { ...postulations[index], ...payload };
    }
    return postulations[index];
};

module.exports = {
    getPostulations,
    findPostulation,
    createPostulation,
    deletePostulation,
    updatePostulation,
};
