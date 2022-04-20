import dotenv from 'dotenv';
import Server from './models/Server';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

const server: Server = new Server();

server.listen();
