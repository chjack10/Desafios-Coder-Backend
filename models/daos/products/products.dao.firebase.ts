import FirebaseContainer from '../../containers/firebase.container';

class ProductDAOFirebase extends FirebaseContainer {
  constructor() {
    super('products');
  }
}

export default new ProductDAOFirebase();
