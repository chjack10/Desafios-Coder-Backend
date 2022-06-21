export default async () => {
  switch (process.env.DB) {
    case 'mongodb':
      return await import('../models/daos/products/products.dao.mongodb');

    case 'firebase':
      return await import('../models/daos/products/products.dao.firebase');

    case 'memory':
      return await import('../models/daos/products/products.dao.mem');

    case 'fs':
      return await import('../models/daos/products/products.dao.file');

    default:
      return await import('../models/daos/products/products.dao.mongodb');
  }
};
