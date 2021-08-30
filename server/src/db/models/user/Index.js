const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersSchema = new Schema({
  firstName: String,
  lastName: String,
  logit: String,
  password: String,
  email: String
});

module.exports = Users = mongoose.model('users', usersSchema);