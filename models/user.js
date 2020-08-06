const mongoose = require('mongoose');

const regexp = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => regexp.test(v),
      message: (props) => `${props.value} is not a valid!`,
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
