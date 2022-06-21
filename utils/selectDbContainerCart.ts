export default async () => {
  switch (process.env.DB_PROVIDER) {
    case 'mongodb':
      return await import('../models/daos/cart/cart.dao.mongodb');

    case 'firebase':
      return await import('../models/daos/cart/cart.dao.firebase');

    case 'memory':
      return await import('../models/daos/cart/cart.dao.mem');

    case 'fs':
      return await import('../models/daos/cart/cart.dao.file');

    default:
      return await import('../models/daos/cart/cart.dao.mongodb');
  }
};
