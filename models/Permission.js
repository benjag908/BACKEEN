// models/Permission.js
const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  action: {
    type: String,
    enum: ['create', 'read', 'update', 'delete'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Permission', PermissionSchema);