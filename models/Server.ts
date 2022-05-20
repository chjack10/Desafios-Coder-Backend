import express, { Application } from 'express';
import cors from 'cors';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';

import products from './Products';
import chat from './Chat';

import productRoutes from '../routes/product';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    products: '/',
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
    // this.views();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.apiPaths.products, productRoutes);
  }

  // views() {
  //   this.app.set('view engine', 'hbs');
  // }

  // listen() {
  //   this.app.listen(this.port, () => {
  //     console.log('Server running on port', this.port);
  //   });
  // }

  listen() {
    this.httpServer.listen(this.port, () => {
      console.log('Server running on port', this.port);
    });

    this.ioServer.on('connection', (socket) => {
      console.log(`Client ${socket.id} connected`);

      socket.emit('products', products.getAll());
      socket.emit('chatMessages', chat.getAllMessages());

      socket.on('newProduct', (product) => {
        products.add(product);
        this.ioServer.sockets.emit('products', products.getAll());
      });

      socket.on('newChatMessage', (newMessage) => {
        chat.addMessage(newMessage);
        this.ioServer.sockets.emit('chatMessages', chat.getAllMessages());
      });
    });
  }
}

export default new Server();
