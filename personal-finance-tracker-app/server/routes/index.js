const express = require('express');
const router =  express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
    const { name, username, password, createdAt } = req.body;
  
    try {
      const user = new User({ name, username, password, createdAt });
      await user.save();
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });
  
// Get all users
router.get('/users', async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });
  
  // Update a user
  router.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, username, password, createdAt } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(id, { name, username, password, createdAt }, { new: true });
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });
  
  // Delete a user
  router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByIdAndDelete(id);
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });
  
  
module.exports = router;