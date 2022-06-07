import express, { Application } from 'express';
import cors from 'cors';
import productRoutes from '../routes/product';
import cartRoutes from '../routes/cart';
import defaultRoutes from '../routes/default';
import auth from '../middlewares/auth';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

import products from './Products';
import chat from './Chat';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    products: '/',
    cart: '/api/carrito',
    default: '*',
  };
  private httpServer: HttpServer;
  private ioServer: IOServer;

  constructor() {
    this.app = express();
    this.port = process.env.PORT ?? '8080';
    this.httpServer = new HttpServer(this.app);
    this.ioServer = new IOServer(this.httpServer);
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    this.app.use(auth);
    // this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPaths.products, productRoutes);
    this.app.use(this.apiPaths.cart, cartRoutes);

    this.app.use(this.apiPaths.default, defaultRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port', this.port);
    });
  }

  // listen() {
  //   this.httpServer.listen(this.port, () => {
  //     console.log('Server running on port', this.port);
  //   });

  //   this.ioServer.on('connection', async (socket) => {
  //     console.log(`Client ${socket.id} connected`);

  //     socket.emit('products', await products.getAll());
  //     socket.emit('chatMessages', await chat.getAllMessages());

  //     socket.on('newProduct', async (product) => {
  //       products.add(product);
  //       this.ioServer.sockets.emit('products', await products.getAll());
  //     });

  //     socket.on('newChatMessage', async (newMessage) => {
  //       chat.addMessage(newMessage);
  //       this.ioServer.sockets.emit('chatMessages', await chat.getAllMessages());
  //     });
  //   });
  // }
}

export default new Server();
