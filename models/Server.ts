import express, { Application } from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import mongoose from 'mongoose';
import yargs from 'yargs';

import homeRoutes from '../routes/home.route';
import loginRoutes from '../routes/login.route';
import signUpRoutes from '../routes/signup.route';
import logoutRoutes from '../routes/logout.route';
import failedSignupRoutes from '../routes/failedSignup.route';
import infoRoutes from '../routes/info.route';
import failedLoginRoutes from '../routes/failedSignup.route';
import randomsRoutes from '../routes/randoms.route';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    home: '/',
    login: '/login',
    signup: '/signup',
    logout: '/logout',
    failedLogin: '/failedLogin',
    failedSignup: '/failedSignup',
    info: '/info',
    randoms: '/api/randoms',
  };

  constructor() {
    this.app = express();
    this.port = yargs.argv.PORT ?? '8080';
    this.middlewares();
    this.routes();
    this.views();
    this.passport();
    this.dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    this.app.use(
      session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
          mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@ecommerce.65qp3.mongodb.net/?retryWrites=true&w=majority`,
          ttl: 60 * 10,
        }),
      })
    );
  }

  routes() {
    this.app.use(this.apiPaths.home, homeRoutes);
    this.app.use(this.apiPaths.login, loginRoutes);
    this.app.use(this.apiPaths.signup, signUpRoutes);
    this.app.use(this.apiPaths.logout, logoutRoutes);
    this.app.use(this.apiPaths.failedLogin, failedLoginRoutes);
    this.app.use(this.apiPaths.failedSignup, failedSignupRoutes);
    this.app.use(this.apiPaths.randoms, randomsRoutes);
    this.app.use(this.apiPaths.info, infoRoutes);
  }

  views() {
    this.app.set('views', 'views');
    this.app.set('view engine', 'ejs');
  }

  dbConnection() {
    mongoose
      .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@ecommerce.65qp3.mongodb.net/?retryWrites=true&w=majority`
      )
      .then(() => console.log('MongoDB connection established'))
      .catch((err) => console.log(err));
  }

  passport() {
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  listen() {
    const args = yargs.argv;

    this.app.listen(this.port, () => {
      console.log('Server running on port', this.port);
    });
  }
}

export default new Server();
