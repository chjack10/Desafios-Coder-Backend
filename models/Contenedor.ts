import fs from 'fs';
import { Product, StoredProduct } from '../interfaces';

export default class Contenedor {
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  private writeFile = async (data: Product[]): Promise<void> => {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify(data));
    } catch (err: any) {
      console.log('Method writeFile: ', err);
    }
  };

  private readFile = async (): Promise<StoredProduct[]> => {
    try {
      return (await fs.promises.readFile(this.filePath, 'utf8'))
        ? JSON.parse(await fs.promises.readFile(this.filePath, 'utf8'))
        : [];
    } catch (err: any) {
      // if said file does not exist, create it
      if (err.errno === -2) {
        try {
          await fs.promises.writeFile(this.filePath, '[]');
          return [];
        } catch (err: any) {
          console.error('Could not create file in such directory. ', err);
        }
      } else {
        console.log('Method readFile: ', err);
      }
      return [];
    }
  };

  public async save(product: Product): Promise<number | void> {
    try {
      const fileData: StoredProduct[] = await this.readFile();
      const id =
        fileData.length === 0 ? 1 : fileData[fileData.length - 1].id + 1;

      fileData.push({ ...product, id });
      await this.writeFile(fileData);

      return id;
    } catch (err: any) {
      console.log('Method save: ', err);
    }
  }

  public async getById(id: number): Promise<StoredProduct | null> {
    try {
      const fileData: StoredProduct[] = await this.readFile();

      return fileData.find((object: StoredProduct) => object.id === id) || null;
    } catch (err: any) {
      console.log('Method getById: ', err);
    }
    return null;
  }

  public async getAll(): Promise<StoredProduct[]> {
    return await this.readFile();
  }

  public async deleteById(id: number): Promise<void> {
    try {
      const fileData = JSON.parse(
        await fs.promises.readFile(this.filePath, 'utf8')
      );

      const newFileData = fileData.filter(
        (object: StoredProduct) => object.id !== id
      );
      await fs.promises.writeFile(this.filePath, JSON.stringify(newFileData));
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
}
