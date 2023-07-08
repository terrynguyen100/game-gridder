const express = require('express');
const router = express.Router();

// SQL imports
const {
  getUsers,
  getUserById,
  getUserByLogin,
  addUser,
  deleteUser,
} = require('../db/queries/users.js');

// ---- Routes -----

// GET all users
router.get('/', (req, res) => {
  getUsers()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// GET a user by their id
router.get('/:id', (req, res) => {
  const userId = req.params.id;

  getUserById(userId)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(error => {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// GET a user by their login
// router.get('/login/:login', (req, res) => {
//   const userLogin = req.params.login;

//   getUserByLogin(userLogin)
//     .then(user => {
//       if (user) {
//         res.json(user);
//       } else {
//         res.status(404).json({ error: 'User not found' });
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching user:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     });
// });

// ADD/POST a new user
router.post('/create', (req, res) => {
  const newUser = req.body;

  addUser(newUser)
    .then(createdUser => {
      res.status(201).json(createdUser);
    })
    .catch(error => {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// DELETE a user by their id
router.delete('/:id', (req, res) => {
  const userId = req.params.id;

  deleteUser(userId)
    .then(deletedUser => {
      if (deletedUser) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(error => {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;
