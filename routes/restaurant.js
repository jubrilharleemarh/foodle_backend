const express = require('express');
const router = express.Router();

let restaurants = []; // Temporary in-memory storage for restaurants

// Create a new restaurant
router.post('/', (req, res) => {
    const { name, location, cuisine, rating } = req.body;

    // Validate input
    if (!name || !location || !cuisine || typeof rating !== 'number' || rating < 0 || rating > 5) {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    const newRestaurant = {
        id: restaurants.length + 1,
        name,
        location,
        cuisine,
        rating,
    };

    restaurants.push(newRestaurant);
    res.status(201).json({ message: 'Restaurant created', data: newRestaurant });
});

// Get all restaurants
router.get('/', (req, res) => {
    res.json({ data: restaurants });
});

// Get a specific restaurant by ID
router.get('/:id', (req, res) => {
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
    if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json({ data: restaurant });
});

// Update a restaurant
router.put('/:id', (req, res) => {
    const { name, location, cuisine, rating } = req.body;
    const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));

    if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
    }

    if (name) restaurant.name = name;
    if (location) restaurant.location = location;
    if (cuisine) restaurant.cuisine = cuisine;
    if (typeof rating === 'number') restaurant.rating = rating;

    res.json({ message: 'Restaurant updated', data: restaurant });
});

// Delete a restaurant
router.delete('/:id', (req, res) => {
    const index = restaurants.findIndex(r => r.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Restaurant not found' });
    }

    restaurants.splice(index, 1); // Remove the restaurant
    res.json({ message: 'Restaurant deleted' });
});

module.exports = router;
