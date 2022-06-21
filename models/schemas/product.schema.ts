import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  photoURL: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  timestamp: {
    type: Number,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model('products', productSchema);
