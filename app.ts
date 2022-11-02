import { Server } from './models/';
import dotenv from 'dotenv'


dotenv.config({
    debug: true
})


const server = new Server();


server.listen();

