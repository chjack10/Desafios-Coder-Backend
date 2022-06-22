import fs from 'fs';
import { Cart as CartType } from '../../interfaces';

class FileContainer {
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  private readonly writeFile = async (data: Array<any>): Promise<void> => {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify(data));
    } catch (err: any) {
      console.log('Method writeFile: ', err);
    }
  };

  private readonly readFile = async (): Promise<CartType[]> => {
    try {
      return (await fs.promises.readFile(this.filePath, 'utf8'))
        ? JSON.parse(await fs.promises.readFile(this.filePath, 'utf8'))
        : ([] as CartType[]);
    } catch (err: any) {
      // if said file does not exist, create it
      if (err.errno === -2) {
        try {
          await fs.promises.writeFile(this.filePath, JSON.stringify([]));
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

  public async save(product: any): Promise<number | void> {
    try {
      const fileData: any[] = await this.readFile();
      const id: number =
        fileData.length === 0
          ? 1
          : Math.max(...fileData.map((object: any) => object.id)) + 1;

      const timestamp = Date.now();

      fileData.push({ ...product, id, timestamp });
      await this.writeFile(fileData);

      return id;
    } catch (err: any) {
      console.log('Method save: ', err);
    }
  }

  public async getById(id: any): Promise<any | Error> {
    try {
      const fileData: any[] = await this.readFile();

      return (
        fileData.find((object: any) => object.id === id) ?? {
          error: 'objeto no encontrado',
        }
      );
    } catch (err: any) {
      console.log('Method getById: ', err);
    }
    return { error: 'fetch item method failed' };
  }

  public async getAll(): Promise<any[]> {
    return await this.readFile();
  }

  public async deleteById(id: number): Promise<void> {
    try {
      const fileData: any[] = await this.readFile();
      const newFileData: any[] = fileData.filter(
        (object: any) => object.id !== id
      );

      await this.writeFile(newFileData);
    } catch (err: any) {
      console.log('Method deleteById: ', err);
    }
  }

  public async deleteAll(): Promise<void> {
    try {
      await this.writeFile([]);
    } catch (err: any) {
      console.log('Method deleteAll: ', err);
    }
  }

  public async update(id: number, product: any): Promise<any | Error> {
    try {
      const fileData: any[] = await this.readFile();
      const newFileData: any[] = fileData.map((object: any) =>
        object.id === id ? { ...object, ...product } : object
      );

      await this.writeFile(newFileData);
    } catch (err: any) {
      console.log('Method update: ', err);
    }
  }

  public createNew = async (): Promise<number | Error> => {
    try {
      const cart = await this.readFile();
      const timestamp = Date.now();

      if (cart.length === 0 || typeof cart === 'undefined') {
        await this.writeFile([{ id: 1, timestamp, products: [] }]);
        return 1;
      }
      const id = Math.max(...cart.map((object: any) => object.id)) + 1;
      await this.writeFile([...cart, { id, timestamp, products: [] }]);
      return id;
    } catch (err: any) {
      console.error(err);
      return err;
    }
  };

  public addProductsById = async (
    cartId: number,
    productsId: number[]
  ): Promise<void | Error> => {
    try {
      const carts = await this.readFile();
      const foundCart = carts.find((object: any) => object.id === cartId);

      const products = await this.readFile();
      const productsToAdd = products.filter((product: any) =>
        productsId.includes(product.id)
      );

      if (
        typeof foundCart !== 'undefined' &&
        typeof productsToAdd !== 'undefined'
      ) {
        const newProducts = [...foundCart.products, ...productsToAdd];
        const newCart = carts.map((object: any) =>
          object.id === cartId ? { ...object, products: newProducts } : object
        );

        await this.writeFile(newCart);
      }
    } catch (err: any) {
      console.error(err);
      return err;
    }
  };

  public deleteItemById = async (
    cartId: number,
    productId: number
  ): Promise<void | Error> => {
    try {
      const cart = await this.readFile();
      const foundCart = cart.find((object: any) => object.id === cartId);

      if (typeof foundCart !== 'undefined') {
        const newProducts = foundCart.products.filter(
          (product: any) => product.id !== productId
        );
        const newCart = cart.map((object: any) =>
          object.id === cartId ? { ...object, products: newProducts } : object
        );

        await this.writeFile(newCart);
      }
    } catch (err: any) {
      console.error(err);
      return err;
    }
  };
}

export default FileContainer;
