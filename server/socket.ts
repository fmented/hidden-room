import {Server} from 'socket.io'
import {decrypt} from './crypt.js'
import type { Server as s } from "http";
import type {ViteDevServer as vd} from 'vite'
import type {Msg, MsgTransmit} from '$lib/types'
import { __TRANFER_LIMIT__ } from './settings.js';

export default function injectSocket(server: vd['httpServer']){
    const io = new Server(server as s, {
        pingInterval:25_000, 
        pingTimeout:200_000,
        maxHttpBufferSize: __TRANFER_LIMIT__
    })

    io.on('connection', (socket)=>{
        const room = socket.handshake.query.room as string
        const key = socket.request.headers.key as string
        const id = socket.handshake.query.id as string
        const alias = socket.handshake.query.alias as string
        
        let match = false
        

        try {
            match = decrypt(key as string) === room
            
        } catch (error) {
            if((error as {library:string}).library !== "Provider routines") console.log(error);
        }

        if(!key || !match || !room || !alias || !id) {
            console.log(key, match, room, alias, id);
            
            socket.emit('kick')
            socket.disconnect(true)
            return
        }

        socket.on('test', ()=>{
            socket.disconnect(true)
        })

        socket.join(room)

        const msg:Omit<Msg, 'time'> = {
            from: id,
            type: 'text',
            content : 'Joined room',
            alias,
        }

        socket.broadcast.to(room).emit('join', msg)
        
        socket.on('message', async (msg:MsgTransmit)=>{       
            socket.broadcast.to(room).emit('message', msg)

        })

    })
}

export const socketPlugin = {
    name: 'socket.io',
    configureServer(server:vd){
        injectSocket(server.httpServer)
    }
} 