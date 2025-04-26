const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'El precio del producto es obligatorio'],
    min: [0, 'El precio no puede ser negativo'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El producto debe estar asociado a un usuario'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);