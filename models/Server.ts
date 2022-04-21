import express, { Application } from 'express';
import productRoutes from '../routes/product';
import randomProductRoute from '../routes/randomProduct';

class Server {
  private app: Application;
  private port: string;
  private paths = {
    products: '/productos',
    randomProduct: '/productoRandom',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT ?? '8000';
    this.routes();
  }

  routes() {
    this.app.use(this.paths.products, productRoutes);
    this.app.use(this.paths.randomProduct, randomProductRoute);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port', this.port);
    });
  }
}

export default Server;
