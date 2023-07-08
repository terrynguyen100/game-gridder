const db = require('../connection');

//---------------------------------------------SELECT QUERIES---------------------------------------
// Get a category from an id. Requires category_id => return category row.
const getCategoriesByCategoryId = (categoryId) => {
  const query = `SELECT * FROM categories 
    WHERE id = $1;`;

  return db.query(query, [categoryId])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};

//---------------------------------------------INSERT QUERIES---------------------------------------
// Add a new category.
// Requires a category object {user_id, title, url, description, category}
const addCategory = (category) => {
  const query = `INSERT INTO 
    categories (name, image_url) 
    VALUES ($1, $2);`;

  return db.query = (query, [category.name, category.imageUrl])
    .then(() => console.log("Category has been added."))
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
  getCategoriesByCategoryId,
  addCategory,
  deleteCategory
};