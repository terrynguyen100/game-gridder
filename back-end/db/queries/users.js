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
  const query = `SELECT * FROm users 
    WHERE email = $1 AND password = $2;`;

  return db.query(query, [userLogin.email, userLogin.password])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};

//---------------------------------------------INSERT QUERIES---------------------------------------
// Add a new user.
// Requires a user object {user_name, email, password, date_of_birth, profile_img, wins}
const addUser = (user) => {
  const query = `INSERT INTO 
    users (user_name, email, password, date_of_birth, profile_img, wins) 
    VALUES ($1, $2, $3, $4, $5, $6);`;

  return db.query(query, [user.userName, user.email, user.password, user.dateOfBirth, user.profileImg, user.wins])
    .then(() => console.log('User has been added'))
    .catch(err => console.log(err.message));
};

//---------------------------------------------Update QUERIES---------------------------------------
// Update a user.
// Requires a user object {user_name, email, password, date_of_birth, profile_img, wins}
const updateUser = (user) => {
  const query = `UPDATE tournaments 
  SET user_name = $2, email = $3, password = $4, date_of_birth = $5, profile_img = $6, wins = $7 
  WHERE id = $1 RETURNING *;`;

  return db.query(query, [user.id, user.userName, user.email, user.password, user.dateOfBirth, user.profileImg, user.wins,])
    .then(data => data.rows[0])
    .catch(err => console.log(err.message));
};


//---------------------------------------------DELETE QUERIES---------------------------------------
// Delete a user from an id. Requires an id.
const deleteUser = (userId) => {
  const query = `DELETE FROM users WHERE id = $1;`;

  return db.query(query, [userId])
    .then(() => console.log('User deleted'))
    .catch((err) => console.log(err.message));
};

module.exports = {
  getUsers,
  getUserById,
  getUserByLogin,
  addUser,
  updateUser,
  deleteUser
};