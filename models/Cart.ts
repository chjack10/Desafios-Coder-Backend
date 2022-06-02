import fs from 'fs';
import { Cart as CartType, StoredProduct } from '../interfaces';

class Cart {
  private static filePath: string;

  constructor(filePath: string) {
    Cart.filePath = filePath;
  }

  private readonly writeFile = async (data: CartType[]): Promise<void> => {
    try {
      await fs.promises.writeFile(Cart.filePath, JSON.stringify(data));
    } catch (err: any) {
      console.log('Method: writeFile, ', err);
    }
  };

  private readonly readFile = async (): Promise<CartType[]> => {
    try {
      return (await fs.promises.readFile(Cart.filePath, 'utf8'))
        ? JSON.parse(await fs.promises.readFile(Cart.filePath, 'utf8'))
        : ([] as CartType[]);
    } catch (err: any) {
      // if said file does not exist, create it
      if (err.errno === -2) {
        try {
          await fs.promises.writeFile(Cart.filePath, JSON.stringify([]));
          return [] as CartType[];
        } catch (err: any) {
          console.error(
            'Method: readFile: could not create file in such directory.',
            err
          );
        }
      } else {
        console.log('Method readFile: ', err);
      }
      return [] as CartType[];
    }
  };
  //a. post
  public createNew = async (): Promise<number | Error> => {
    try {
      const cart = await this.readFile();
      const timestamp = Date.now();

      if (cart.length === 0 || typeof cart === 'undefined') {
        await this.writeFile([{ id: 1, timestamp, products: [] }]);

        return 1;
      }

      const id = Math.max(...cart.map((object) => object.id)) + 1;
      await this.writeFile([...cart, { id, timestamp, products: [] }]);

      return id;
    } catch (err: any) {
      console.error(err);
      return err;
    }
  };
  //b. delete
  public deleteById = async (id: number): Promise<void | Error> => {
    try {
      const cart = await this.readFile();
      const newCart = cart.filter((item) => item.id !== id);

      await this.writeFile(newCart);
    } catch (err: any) {
      console.error(err);
      return err;
    }
  };
  //c. get
  public getItemsById = async (
    id: number
  ): Promise<StoredProduct[] | Error> => {
    try {
      const cart = await this.readFile();
      const foundCart = cart.find((object) => object.id === id);

      if (typeof foundCart !== 'undefined') return foundCart.products;

      throw new Error('Cart not found');
    } catch (err: any) {
      console.error(err);
      return err;
    }
  };
  //d. post
  public addProductsById = async (
    id: number,
    products: StoredProduct[]
  ): Promise<void | Error> => {
    try {
      const cart = await this.readFile();
      const foundCart = cart.find((object) => object.id === id);

      if (typeof foundCart !== 'undefined') {
        const newProducts = [...foundCart.products, ...products];
        const newCart = cart.map((item) =>
          item.id === id ? { ...item, products: newProducts } : item
        );
        await this.writeFile(newCart);
      }
    } catch (err: any) {
      console.error(err);
      return err;
    }
  };
  //e. delete
  public deleteItemById = async (
    id: number,
    productId: number
  ): Promise<void | Error> => {
    try {
      const cart = await this.readFile();
      const foundCart = cart.find((object) => object.id === id);

      if (typeof foundCart !== 'undefined') {
        const newProducts = foundCart.products.filter(
          (item) => item.id !== productId
        );
        const newCart = cart.map((item) =>
          item.id === id ? { ...item, products: newProducts } : item
        );
        await this.writeFile(newCart);
      }
    } catch (err: any) {
      console.error(err);
      return err;
    }
  };
}

export default new Cart('./data/cart.txt');
