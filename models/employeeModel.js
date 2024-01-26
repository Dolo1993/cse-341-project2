const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  position: String,
  department: String,
  salary: {
    type: Number,
    required: true,
  },
  hireDate: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: String,
});

module.exports = mongoose.model('Employee', employeeSchema);
