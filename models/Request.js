// models/Request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  headCount: { type: Number, required: true },
  contactNumber: { type: String, required: true }
});

const Request = mongoose.model('Requests', requestSchema);

module.exports = Request;
