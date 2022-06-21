import FirebaseContainer from '../../containers/firebase.container';

class CartDAOFirebase extends FirebaseContainer {
  constructor() {
    super('carts');
  }
}

export default new CartDAOFirebase();
