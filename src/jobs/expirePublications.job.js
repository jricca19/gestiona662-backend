const cron = require("node-cron");
const Publication = require("../models/publication.model");

// execute every day at midnight
cron.schedule("0 0 * * *", async () => {
    try {
        const now = new Date();

        // change status to EXPIRED publications that are OPEN and their publicationDays that are AVAILABLE
        await Publication.updateMany(
            {
                endDate: { $lt: now },
                status: "OPEN"
            },
            {
                $set: {
                    status: "EXPIRED",
                    "publicationDays.$[elem].status": "EXPIRED"
                }
            },
            {
                arrayFilters: [
                    { "elem.date": { $lt: now }, "elem.status": "AVAILABLE" }
                ]
            }
        );S

        // change status to COMPLETED publications that are FILLED and their publicationDays that are ASSIGNED
        await Publication.updateMany(
            {
                endDate: { $lt: now },
                status: "FILLED"
            },
            {
                $set: {
                    status: "COMPLETED",
                    "publicationDays.$[elem].status": "COMPLETED"
                }
            },
            {
                arrayFilters: [
                    { "elem.date": { $lt: now }, "elem.status": "ASSIGNED" }
                ]
            }
        );

        console.log("Publicaciones expiradas y completadas correctamente.");
    } catch (error) {
        console.error("Error al expirar/completar publicaciones:", error);
    }
});
