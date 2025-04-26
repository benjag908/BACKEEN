// models/Module.js

const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Module', ModuleSchema);