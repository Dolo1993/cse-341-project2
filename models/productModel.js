const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: String,
  manufacturer: String,
  inStock: {
    type: Boolean,
    default: true,
  },
  specifications: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
  },
  expirationDate: Date,
  isFeatured: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Product', productSchema);
