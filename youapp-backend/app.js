const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://test:test123@cluster0.zatwbxa.mongodb.net/machine', { useNewUrlParser: true, useUnifiedTopology: true });


const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String
});

const User = mongoose.model('users', userSchema);

app.post('/insert', async (req, res) => {
  const response = await axios.post('https://reqres.in/api/users', req.body);
  
  const newUser = new User({
    first_name: response.data.first_name,
    last_name: response.data.last_name,
    email: response.data.email
  });
  
  const savedUser = await newUser.save();
  console.log(savedUser);
  res.status(201).send(savedUser);
});

app.get('/allusers', async (req, res) => {
  try {
    const response = await axios.get('https://reqres.in/api/users?page=1&per_page=10');
    const users = response.data.data;

    // Save users to MongoDB
    for (let user of users) {
      const newUser = new User({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      });
      await newUser.save();
    }

    // Fetch all users from MongoDB
    const dbUsers = await User.find({});
    res.status(200).json({ data: dbUsers });
    console.log(dbUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.patch('/users/:id', async (req, res) => {
  try {
    const userUpdates = req.body;
    const response = await axios.patch(`https://reqres.in/api/users/${req.params.id}`, userUpdates);

    if (response.status !== 200) {
      return res.status(response.status).json({ message: 'Failed to update user' });
    }

    // Update the user in your database
    const updatedUser = await User.findByIdAndUpdate(req.params.id, userUpdates, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(updatedUser);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(3001);
console.log("http://localhost:3001/");