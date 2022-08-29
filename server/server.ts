import http from 'http'
import injectSocket from './socket.js'
import { handler } from '../build/handler.js'
import express from 'express'
import {__PROD_HOSTNAME__, __PROD_PORT__} from './settings.js'

const app = express();
const server = http.createServer(app)

const port = __PROD_PORT__||3000
const hostname = __PROD_HOSTNAME__||'localhost'

injectSocket(server)

function cb(){
    console.log(`\nServer is running at http://${hostname}:${port}`);
}

app.use(handler as any)

hostname? server.listen(port, cb) : server.listen(port, hostname as any, cb)
