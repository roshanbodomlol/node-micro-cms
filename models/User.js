const mongoose = require('mongoose');

const USER = require('../constants/users.constants');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required'
  },
  email: {
    type: String,
    required: 'Email is required'
  },
  password: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Password is required'
  },
  role: {
    type: Number,
    default: USER.ROLES.VISITOR
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
