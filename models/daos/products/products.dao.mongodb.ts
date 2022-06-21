import MongoContainer from '../../containers/mongodb.container';
import productModel from '../../schemas/product.schema';

class ProductsDAOMongoDB extends MongoContainer {
  constructor() {
    super(productModel);
  }
}

export default new ProductsDAOMongoDB();
