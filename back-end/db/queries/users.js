const db = require('../connection');

//---------------------------------------------SELECT QUERIES---------------------------------------
// Get all users
const getUsers = () => {
  const query = `SELECT * FROM users;`;

  return db.query(query)
    .then(data => data.rows)
    .catch(err => console.log(err.message));
};

//Get a user from userId. Requires userId => returns a single user.
const getUserById = (userId) => {
  const query = `SELECT * FROM users 
    WHERE id = $1;`;

  return db.query(query, [userId])
    .then(data => data.rows[0])
    .catch(err => console.log(err.messsage));
};

//Get a user based on email and password. Requires userEmail and userPassword => returns a single user.
const getUserByLogin = (userLogin) => {
  const query = `SELECT * FROM users 
    WHERE email = $1 AND password = $2;`;

  return db.query(query, [userLogin.email, userLogin.password])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};

//Get a user based on email and password. Requires userEmail and userPassword => returns a single user.
const getUserByUserName = (userName) => {
  const query = `SELECT * FROM users 
    WHERE user_name = $1;`;

  return db.query(query, [userName])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};

//Get top 10 users ranked by wins
const getTop10Users = () => {
  const query = `
    SELECT RANK() OVER(ORDER BY wins DESC), user_name, wins
    FROM users 
    LIMIT 10;`
  
  return db.query(query)
    .then(data => data.rows)
    .catch(err => console.log(err.message));
}


//---------------------------------------------INSERT QUERIES---------------------------------------
// Add a new user.
// Requires a user object {user_name, email, password, date_of_birth, profile_img, wins}
const addUser = (user) => {
  const query = `INSERT INTO 
    users (user_name, email, password, date_of_birth, profile_img, wins) 
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING *;`;

  return db.query(query, [user.user_name, user.email, user.password, user.date_of_birth, user.profile_img, user.wins])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};

//---------------------------------------------Update QUERIES---------------------------------------
// Update a user.
// Requires a user object {user_name, email, password, date_of_birth, profile_img, wins}
const updateUserImage = (userId, imageUrl) => {
  const query = `UPDATE users 
  SET profile_img = $2 
  WHERE id = $1 
  RETURNING *;`;

  return db.query(query, [userId, imageUrl])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};


//---------------------------------------------DELETE QUERIES---------------------------------------
// Delete a user from an id. Requires an id.
const deleteUser = (userId) => {
  const query = `DELETE FROM users WHERE id = $1;`;

  return db.query(query, [userId])
    .then(() => 'User deleted')
    .catch((err) => console.log(err.message));
};

module.exports = {
  getUsers,
  getUserById,
  getUserByLogin,
  getUserByUserName,
  getTop10Users,
  addUser,
  updateUserImage,
  deleteUser
};