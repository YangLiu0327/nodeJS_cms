const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
});

schema.methods.hashPassword = async function () {
    this.password = await bcrypt.hash(this.password, 12);
};

schema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  module.exports = model('User', schema);
  