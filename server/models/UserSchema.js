const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  profileImage:{
    type: String, // You can store the URL or file path to the profile picture
  },
  backgroundImage:{
    type: String, // You can store the URL or file path to the profile picture
  },
  // Add other fields as needed for your user profile
  bio: {
    type: String,
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This sets up a reference to other User documents for followers
  }],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});
// Create a User model from the schema
const User = mongoose.model('User', userSchema);
module.exports = User;

