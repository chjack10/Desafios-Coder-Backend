import MongoContainer from '../../containers/mongodb.container';
import cartModel from '../../schemas/cart.schema';

class CartsDAOMongoDB extends MongoContainer {
  constructor() {
    super(cartModel);
  }

  async createNew() {
    try {
      const cart = new this.model({});
      const { _id } = await cart.save();

      return _id;
    } catch (err) {
      console.log(err);
    }
  }

  async addProductsById(id: number, products: any[]) {
    try {
      const cart: any = await this.model.findOne({ _id: id });

      if (cart === null) return { error: 'cart not found' };

      const newProducts = cart.products.concat(products);
      cart.products = newProducts;
      await cart.save();

      return cart;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id: number) {
    try {
      const cart: any = await this.model.findOne({ _id: id });

      if (cart === null) return { error: 'cart not found' };

      await cart.remove();

      return { msg: 'cart deleted' };
    } catch (err) {
      console.log(err);
    }
  }
}

export default new CartsDAOMongoDB();
