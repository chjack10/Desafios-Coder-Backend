import FileContainer from '../../containers/file.container';

class CartDAOFile extends FileContainer {
  constructor() {
    super('../../data/cart.txt');
  }
}

export default new CartDAOFile();
