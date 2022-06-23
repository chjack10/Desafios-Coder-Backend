import dotenv from 'dotenv';

dotenv.config();

let productDao: any;
let cartDao: any;

switch (process.env.DB_PROVIDER) {
  case 'mongodb':
    import('./products/products.dao.mongodb').then(
      (dao) => (productDao = dao.default)
    );
    import('./cart/cart.dao.mongodb').then((dao) => (cartDao = dao.default));
    break;

  case 'firebase':
    import('./products/products.dao.firebase').then(
      (dao) => (productDao = dao.default)
    );
    import('./cart/cart.dao.firebase').then((dao) => (cartDao = dao.default));
    break;

  case 'fs':
    import('./products/products.dao.file').then(
      (dao) => (productDao = dao.default)
    );
    import('./cart/cart.dao.file').then((dao) => (cartDao = dao.default));

    break;

  case 'memory':
    import('./products/products.dao.mem').then(
      (dao) => (productDao = dao.default)
    );
    import('./cart/cart.dao.mem').then((dao) => (cartDao = dao.default));
    break;

  default:
    productDao = require('./product/product.dao.mongodb');
    cartDao = require('./cart/cart.dao.mongodb');
    break;
}

export { productDao, cartDao };
