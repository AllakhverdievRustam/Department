const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports = Users = mongoose.model('users', usersSchema);
