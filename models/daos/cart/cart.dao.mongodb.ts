import MongoContainer from '../../containers/mongodb.container';
import cartModel from '../../schemas/cart.schema';

class CartsDAOMongoDB extends MongoContainer {
  constructor() {
    super(cartModel);
  }
}

export default new CartsDAOMongoDB();
