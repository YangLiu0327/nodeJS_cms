const { Schema, model } = require('mongoose');
const Joi = require('joi');


// joi, express-validator
// validator.js
const schema = new Schema({
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },

    lastName: {
        type: String,
        required: true,
        trim: true
      },

      email: {
        type: String,
        require: true,
        validate: {
          validator: (email) => {
            return !Joi.string().email().validate(email).error;
        },
        msg: 'Invalid email format'
      }
    },
    courses: [{ type: String, ref: 'Course' }]
    }); 

    module.exports = model('Student', schema);