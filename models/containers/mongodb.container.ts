import mongoose from 'mongoose';
import config from '../../db/config';
import { Product, StoredProduct } from '../../interfaces';

class MongoContainer {
  model: mongoose.Model<unknown, {}, {}, {}>;

  constructor(model: mongoose.Model<unknown, {}, {}, {}>) {
    this.model = model;
    this.connect();
  }

  private async connect() {
    try {
      await mongoose.connect(config.mongoDB.URI);
      console.log('connected to mongoDB Atlas');
    } catch (err) {
      console.log(err);
    }
  }

  async save(product: Product): Promise<any | void> {
    try {
      const productToSave = new this.model(product);
      const _id = await productToSave.save();

      return _id;
    } catch (err) {
      console.log(err);
    }
  }
  public async getById(id: number): Promise<any | Error> {
    try {
      const objId = new mongoose.mongo.ObjectId(id);
      const foundItem = await this.model.findOne({ _id: objId });

      if (foundItem === null) return { error: 'producto no encontrado' };

      return foundItem;
    } catch (error) {
      console.log(error);
    }
  }

  public async getAll(): Promise<StoredProduct[] | any> {
    const foundItems = await this.model.find({});

    return foundItems;
  }

  public async deleteById(id: number): Promise<any> {
    try {
      const objId = new mongoose.mongo.ObjectId(id);
      const deletedData = await this.model.deleteOne({ _id: objId });

      if (deletedData.deletedCount === 0)
        return { error: 'producto no encontrado' };

      return { msg: 'producto eliminado' };
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteAll(): Promise<any> {
    try {
      await this.model.deleteMany({});
    } catch (error) {
      console.log(error);
    }
    return { msg: 'todos los productos eliminados' };
  }

  public async update(id: number, newData: Product): Promise<any> {
    try {
      const objId = new mongoose.mongo.ObjectId(id);
      const updatedData = await this.model.updateOne({ _id: objId }, newData);

      if (updatedData.matchedCount === 0)
        return { error: 'producto no encontrado' };

      return { msg: 'producto actualizado' };
    } catch (error) {
      console.log(error);
    }
  }
}

export default MongoContainer;
