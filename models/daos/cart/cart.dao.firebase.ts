import FirebaseContainer from '../../containers/firebase.container';
import admin from 'firebase-admin';

class CartDAOFirebase extends FirebaseContainer {
  constructor() {
    super('carts');
  }

  async createNew() {
    try {
      await admin
        .firestore()
        .collection(this.collection)
        .add({ timestamp: Date.now(), productos: [] });

      return { msg: 'cart created' };
    } catch (err) {
      console.log(err);
    }
  }

  async addToCartById(id: number, product: any): Promise<any> {
    try {
      await admin
        .firestore()
        .collection(this.collection)
        .doc(id.toString())
        .update({
          products: admin.firestore.FieldValue.arrayUnion(product),
        });

      return { msg: 'producto agregado' };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteItemById(id: number, product: any): Promise<any> {
    try {
      await admin
        .firestore()
        .collection(this.collection)
        .doc(id.toString())
        .update({
          products: admin.firestore.FieldValue.arrayRemove(product),
        });

      return { msg: 'producto eliminado' };
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CartDAOFirebase();
