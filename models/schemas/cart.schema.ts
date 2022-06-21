import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    },
  ],
  timestamp: {
    type: Number,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model('carts', cartSchema);
