import FileContainer from '../../containers/file.container';

class ProductsDAOFile extends FileContainer {
  constructor() {
    super('../../data/productos.txt');
  }
}

export default new ProductsDAOFile();
