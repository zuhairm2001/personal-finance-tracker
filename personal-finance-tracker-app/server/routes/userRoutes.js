// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

//creating user
router.post("/login", userController.loginUser);
router.get('/profile', userController.getUserProfile);

module.exports = router;
