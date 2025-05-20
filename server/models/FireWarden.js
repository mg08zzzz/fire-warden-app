const mongoose = require('mongoose');

const FireWardenSchema = new mongoose.Schema({
  staffNumber: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FireWarden', FireWardenSchema);
