const db = require('../connection');

//---------------------------------------------SELECT QUERIES---------------------------------------
// Get a category from an id. Requires an id => return category row.
const getCategoryByCategoryId = (categoryId) => {
  const query = `SELECT * FROM categories 
    WHERE id = $1;`;

  return db.query(query, [categoryId])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};

//---------------------------------------------INSERT QUERIES---------------------------------------
// Add a new category.
// Requires a category object {name, image_url}
const addCategory = (category) => {
  const query = `INSERT INTO 
    categories (name, image_url) 
    VALUES ($1, $2);`;

  return db.query = (query, [category.name, category.imageUrl])
    .then(() => console.log("Category has been added."))
    .catch(err => console.log(err.message));
};

//---------------------------------------------Update QUERIES---------------------------------------
// Update a category.
// Requires a category object {name, image_url}
const updateCategory = (category) => {
  const query = `UPDATE categories 
  SET name = $2, image_url = $3 
  WHERE id = $1 RETURNING *;`;

  return db.query(query, [category.name, category.imageUrl])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};

//---------------------------------------------DELETE QUERIES---------------------------------------
// Delete a category from an id. Requires an id.
const deleteCategory = (categoryId) => {
  const query = `DELETE FROM categories WHERE id = $1;`;
  return db.query(query, [categoryId])
    .then(() => console.log('Category has been deleted.'))
    .catch((err) => console.log(err.message));
};

module.exports = {
  getCategoryByCategoryId,
  addCategory,
  updateCategory,
  deleteCategory
};