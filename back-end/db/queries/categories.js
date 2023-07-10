const db = require('../connection');

//---------------------------------------------SELECT QUERIES---------------------------------------
// Get all categories.
const getCategories = () => {
  const query = `SELECT * FROM categories;`;

  return db.query(query)
    .then(data => data.rows)
    .catch(err => console.log(err.message));
};

// Get a category from an id. Requires an id => return category row.
const getCategoryByCategoryId = (category_id) => {
  const query = `SELECT * FROM categories 
    WHERE id = $1;`;

  return db.query(query, [category_id])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};

//---------------------------------------------INSERT QUERIES---------------------------------------
// Add a new category.
// Requires a category object {name, image_url}
const addCategory = (category) => {
  const query = `INSERT INTO 
    categories (name, image_url) 
    VALUES ($1, $2) 
    RETURNING *;`;

  return db.query = (query, [category.name, category.image_url])
    .then(() => console.log("Category has been added."))
    .catch(err => console.log(err.message));
};

//---------------------------------------------Update QUERIES---------------------------------------
// Update a category.
// Requires a category object {name, image_url}
const updateCategory = (category) => {
  const query = `UPDATE categories 
  SET name = $2, image_url = $3 
  WHERE id = $1 
  RETURNING *;`;

  return db.query(query, [category.name, category.image_url])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};

//---------------------------------------------DELETE QUERIES---------------------------------------
// Delete a category from an id. Requires an id.
const deleteCategory = (category_id) => {
  const query = `DELETE FROM categories WHERE id = $1;`;
  return db.query(query, [category_id])
    .then(() => 'Category deleted')
    .catch((err) => console.log(err.message));
};

module.exports = {
  getCategories,
  getCategoryByCategoryId,
  addCategory,
  updateCategory,
  deleteCategory
};