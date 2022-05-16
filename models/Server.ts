import express, { Application } from 'express';
import productRoutes from '../routes/product';
import cors from 'cors';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    products: '/',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT ?? '8080';
    this.middlewares();
    this.routes();
    this.views();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    // this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPaths.products, productRoutes);
  }

  views() {
    // this.app.set('view engine', 'hbs');
    // this.app.set('view engine', 'pug');
    this.app.set('view engine', 'ejs');
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port', this.port);
    });
  }
}

export default new Server();
