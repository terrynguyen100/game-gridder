const express = require('express');
const router = express.Router();

// SQL imports
const {
  getCategoryByCategoryId,
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
} = require('../db/queries/categories.js');


// ---- Routes -----

// GET all categories
router.get('/', (req, res) => {
  getCategories()
    .then((categories) => {
      res.json(categories);
    })
    .catch(error => {
      console.error("Error adding category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});


// GET a category by its id
router.get('/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;

  getCategoryByCategoryId(categoryId)
    .then(category => {
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    })
    .catch(error => {
      console.error("Error fetching category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// ADD/POST a new category
router.post('/', (req, res) => {
  const newCategory = req.body;

  addCategory(newCategory)
    .then(() => {
      res.status(201).json({ message: "Category has been added" });
    })
    .catch(error => {
      console.error("Error adding category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// PATCH/UPDATE a category by its id
router.patch('/:categoryId', (req, res) => {
  const updatedCategory = req.body;

  updateCategory(updatedCategory)
    .then(category => {
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    })
    .catch(error => {
      console.error("Error updating category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// DELETE a category by its id
router.delete('/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;

  deleteCategory(categoryId)
    .then(() => {
      res.json({ message: "Category deleted successfully" });
    })
    .catch(error => {
      console.error("Error deleting category:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
