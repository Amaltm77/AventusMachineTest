const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://test:test123@cluster0.zatwbxa.mongodb.net/', {useNewUrlParser: true, useUnifiedTopology: true});

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String
});

const User = mongoose.model('User', UserSchema);
