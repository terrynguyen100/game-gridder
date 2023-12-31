const express = require('express');
const router = express.Router();

// SQL imports
const {
  getUsers,
  getUserById,
  getUserByLogin,
  getUserByUserName,
  addUser,
  updateUserImage,
  deleteUser,
  getTop10Users,
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

// GET top 10 users ranked by most wins
router.get('/top', (req, res) => {
  getTop10Users()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
})

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
router.get('/login/:username', (req, res) => {
  const userName = req.params.username;

  getUserByUserName(userName)
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

// PUT a new profile_img for user by their id
router.put('/:id/edit', (req, res) => {
  const userId = req.params.id;
  const imageUrl = req.body.profile_img;

  updateUserImage(userId, imageUrl)
    .then(updatedUser => {
      res.status(202).json(updatedUser);
    })
    .catch(error => {
      console.error('Error updating user:', error);
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
