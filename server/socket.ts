import {Server} from 'socket.io'
import {decrypt} from './crypt.js'
import type { Server as s } from "http";
import type {ViteDevServer as vd} from 'vite'
import type {Msg} from '$lib/types'

export default function injectSocket(server: vd['httpServer']){
    const io = new Server(server as s)

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
            socket.emit('kick')
            socket.disconnect(true)
            return
        }

        socket.join(room)

        const msg:Omit<Msg, 'time'> = {
            from: id,
            message: 'Joined room',
            alias,
        }

        socket.broadcast.to(room).emit('join', msg)
        
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