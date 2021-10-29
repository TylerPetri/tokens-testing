const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    unique: false,
    allowNull: false,
  },
  email: {
    type: String,
    unique: false,
    allowNull: false,
    match:
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  },
  password: {
    type: String,
    min: [6, 'Must be at least 6, got {VALUE}'],
    allowNull: false,
  },
});
const User = mongoose.model('User', UserSchema);

module.exports = User;
