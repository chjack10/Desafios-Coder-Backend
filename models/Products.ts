import { Error, Product, StoredProduct } from '../interfaces';
import { mariaDBOptions } from '../DB/configDB';
import { Knex } from 'knex';

class Products {
  productList: StoredProduct[];
  private db: Knex;
  private table: string;

  constructor(options: any, table: string) {
    this.productList = [];
    this.db = require('knex')(options);
    this.table = table;
    this.createTableIfNotExists();
  }

  private async createTableIfNotExists(): Promise<void> {
    if (!(await this.db.schema.hasTable(this.table))) {
      try {
        await this.db.schema.createTableIfNotExists(this.table, (table) => {
          table.increments('id').primary();
          table.string('name');
          table.string('code');
          table.string('description');
          table.integer('price');
          table.string('photoURL');
          table.string('image');
          table.integer('stock');
          table.integer('timestamp');
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  public add = async (product: Product): Promise<void> => {
    const timestamp = Date.now();

    await this.db.insert({ ...product, timestamp }).into(this.table);
  };

  public getById = (id: number): StoredProduct | Error => {
    const product = this.productList.find((product) => product.id === id);

    if (product) return product;
    else return { error: 'producto no encontrado' };
  };

  public async getAll(): Promise<StoredProduct[]> {
    const products: StoredProduct[] = await this.db
      .select('*')
      .from(this.table);

    return products;
  }

  public deleteById(id: number): void {
    this.productList = this.productList.filter((product) => product.id !== id);
  }

  public update(id: number, newData: Product): void {
    this.productList = this.productList.map((product: StoredProduct) =>
      product.id === id ? { ...product, ...newData } : product
    );
  }
}

export default new Products(mariaDBOptions, 'products');
