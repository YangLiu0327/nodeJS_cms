const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },


        lastName: {
            type: String,
            required: true
        },


        email: {
            type: String,
            required: true
        },
        courses: [{ type: String, ref: 'Course' }],
        __v: {
            type: Number,
            select: false
          }
    }
)

const Model = mongoose.model('Student', schema);

module.exports = Model;