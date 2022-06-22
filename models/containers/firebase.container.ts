import admin from 'firebase-admin';
import { addToCartById } from '../../controllers/cart';

const serviceAccount = require('../../db/serviceAccountKey.json');

class FirebaseContainer {
  collection: string;

  constructor(collection: string) {
    this.collection = collection;
    this.connect();
  }

  connect() {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });

      console.log('connected to firebase');
    } catch (err) {
      console.log(err);
    }
  }


  async save(product: any): Promise<any> {
    try {
      const _id = await admin
        .firestore()
        .collection(this.collection)
        .add(product);

      return _id;
    } catch (err) {
      console.log(err);
    }
  }

  async getById(id: number): Promise<any | Error> {
    try {
      const foundItem = await admin
        .firestore()
        .collection(this.collection)
        .doc(id.toString())
        .get();

      if (foundItem.exists) return foundItem.data();
      else return { error: 'producto no encontrado' };
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(): Promise<any[]> {
    const foundItems = await admin
      .firestore()
      .collection(this.collection)
      .get();

    return foundItems.docs.map((doc) => doc.data());
  }

  async deleteById(id: number): Promise<any> {
    try {
      await admin
        .firestore()
        .collection(this.collection)
        .doc(id.toString())
        .delete();

      return { msg: 'producto eliminado' };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll(): Promise<any> {
    try {
      await admin
        .firestore()
        .collection(this.collection)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            doc.ref.delete();
          });
        });

      return { msg: 'todos los productos eliminados' };
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, newData: any): Promise<any> {
    try {
      await admin
        .firestore()
        .collection(this.collection)
        .doc(id.toString())
        .update(newData);

      return { msg: 'producto actualizado' };
    } catch (error) {
      console.log(error);
    }
  }
}

export default FirebaseContainer;
