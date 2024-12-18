const express = require('express');
const { authMiddleware } = require('../middleware');
const { Location } = require('../db');
const zod = require("zod");
const router = express.Router();

const locationBodySchema = zod.object({
    locationName: zod.string(),
    address: zod.string(),
    description: zod.string(),
    count: zod.number().optional().default(0),
});

router.post("/", async (req, res) => {
    const parsedResult = locationBodySchema.safeParse(req.body);

    if (!parsedResult.success) {
        return res.status(400).json({
            message: "Incorrect inputs",
            errors: parsedResult.error.errors,
        });
    }

    const { locationName, address, description } = parsedResult.data;

    try {
        const existingLocation = await Location.findOne({   locationName: locationName });

        if (existingLocation) {
            return res.status(409).json({
                message: "Location already exists",
            });
        }

        const location = await Location.create({
            locationName,
            address,
            description,
            count: 0,
        });

        res.status(201).json({
            message: "Location created successfully",
            location,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

router.put('/:id/click', async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);

        if (!location) {
            return res.status(404).json({ error: 'Location not found' });
        }

        location.count += 1;
        await location.save();

        res.json({ message: 'Count updated successfully', location });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const locations = await Location.find().sort({ count: -1 }); // Sort by count in descending order
        res.json(locations);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
