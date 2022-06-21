import { Error, Product } from '../../interfaces';

class MemContainer {
  list: any[];

  constructor() {
    this.list = [];
  }

  public save = (product: any): any => {
    const id: number =
      this.list.length === 0
        ? 1
        : Math.max(...this.list.map((product: any) => product.id)) + 1;

    const timestamp = Date.now();

    this.list.push({ id, ...product, timestamp });

    return this.list[this.list.length - 1];
  };

  public getById = (id: number): any | Error => {
    const product = this.list.find((product) => product.id === id);

    if (product) return product;
    else return { error: 'producto no encontrado' };
  };

  public getAll(): any[] {
    return this.list;
  }

  public deleteById(id: number): void {
    this.list = this.list.filter((product) => product.id !== id);
  }

  public update(id: number, newData: Product): void {
    this.list = this.list.map((product: any) =>
      product.id === id ? { ...product, ...newData } : product
    );
  }
}

export default MemContainer;
