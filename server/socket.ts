import {Server} from 'socket.io'
import {decrypt} from './crypt.js'
import type { Server as s } from "http";
import type {ViteDevServer as vd} from 'vite'

export default function injectSocket(server: vd['httpServer']){
    const io = new Server(server as s)

    io.on('connection', (socket)=>{
        const id = socket.handshake.query.id
        const room = socket.handshake.query.room||''
        const alias = socket.handshake.query.alias||'annonymous'
        const key = socket.request.headers.key
        let match = false

        try {
            match = decrypt(key as string) === room
            
        } catch (error) {
            
        }

        if(!key || !match) return socket.disconnect(true)

        socket.join(room)
        socket.broadcast.to(room).emit('join')
        
        socket.on('message', (msg)=>{
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