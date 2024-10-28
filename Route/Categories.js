const express = require('express');
const mongoose = require('mongoose'); // Importing Mongoose
const router = express.Router(); // Enable router

// Creating the Schema
const Categories = new mongoose.Schema({
    Name: { type: String, required: true, minlength: 3, maxlength: 30 }
});

// Creating the Model
const Categories_Model = mongoose.model('Categories_Model', Categories);

// GET request to retrieve all categories
router.get('/api/categories', async (req, res) => {
    let Take_Data_from_Categories_Model = await Categories_Model.find();
    res.send(Take_Data_from_Categories_Model);
});

// POST request to add a new category
router.post('/api/categories', async (req, res) => {
    // Create a new category
    const newCategory = new Categories_Model ({
        Name: req.body.Name
    });

    // Save the new data
    await newCategory.save();
    res.send(newCategory);
});

// PUT request to update a category by ID
router.put('/api/categories/:id', async (req, res) => {
    const update_categories = await Categories_Model.findByIdAndUpdate(
        req.params.id,
        { Name: req.body.Name },
        { new: true }
    );
    
    if (!update_categories) {
        return res.status(404).send("Category not found in the database");
    }
    
    res.send(update_categories);
});

// DELETE request to delete a category by ID
router.delete('/api/categories/:id', async (req, res) => {
    const category = await Categories_Model.findByIdAndDelete(req.params.id);
    if (!category) {res.status(404).send("Category not found");}
    else{

    res.send(category);
    }
});

// GET request to retrieve a category by ID
router.get('/api/categories/:id', async (req, res) => {
    const get_data_by_id = await Categories_Model.findById(req.params.id);
    if (!get_data_by_id) {
        return res.status(404).send("Data not found");
    }
    res.send(get_data_by_id);
});

// Exporting all the routes
module.exports = router;
