const {
    getRatings,
    createRating,
    findRating,
    deleteRating,
    updateRating
} = require("../repositories/rating.repository");

const getRatingsController = async (req, res) => {
    try {
        console.log(req.query);
        const ratings = await getRatings();
        res.status(200).json(ratings);
    } catch (error) {
        next(error);
    }
}

const getRatingController = async (req, res) => {
    try {
        const ratingId = req.params.id;
        const rating = await findRating(ratingId);
        if (rating) {
            res.status(200).json(rating);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado el rating con id: ${ratingId}`
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const postRatingController = async (req, res) => {
    try {
        const { body } = req;
        await createRating(body.teacherId,body.publicationId,body.score,body.comment,body.createdAt);
        res.status(201).json({
            message: "Rating creado correctamente"
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteRatingController = async (req, res) => {
    try {
        const ratingId = req.params.id;
        await deleteRating(ratingId);
        res.status(200).json({
            message: "Rating eliminado correctamente"
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const putRatingController = async (req, res) => {
    try {
        const ratingId = req.params.id;
        const { body } = req;
        let rating = await findRating(ratingId);
        if (rating) {
            rating = await updateRating(ratingId, body);
            res.status(200).json(rating);
            return;
        }
        res.status(404).json({
            message: `No se ha encontrado el rating con id: ${ratingId}`
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getRatingsController,
    getRatingController,
    postRatingController,
    putRatingController,
    deleteRatingController,
}