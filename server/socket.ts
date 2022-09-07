import {Server} from 'socket.io'
import {decrypt} from './crypt.js'
import type { Server as s } from "http";
import type {ViteDevServer as vd} from 'vite'
import type {Msg, MsgTransmit} from '$lib/types'
import { __TRANFER_LIMIT__ } from './settings.js';

export default function injectSocket(server: vd['httpServer']){
    const io = new Server(server as s, {
        maxHttpBufferSize: __TRANFER_LIMIT__
    })

    io.on('connection', (socket)=>{
        const room = socket.handshake.query.room as string
        const key = socket.request.headers.key as string
        const id = socket.handshake.query.id as string
        const alias = socket.handshake.query.alias as string
        
        let match = false
        
        try {
            match = decrypt(key) === room
            
        } catch (error) {
            if((error as {library:string}).library !== "Provider routines") console.log(error);
        }

        if(!key || !match || !room || !alias || !id) {
            console.log(key, match, room, alias, id);     
            socket.emit('kick')
            socket.disconnect(true)
            return
        }

        socket.on('join', ()=>{
            socket.join(room)
            const msg:Msg = {
                from: id,
                type: 'text',
                content : 'Joined room',
                alias,
                time: new Date().getTime()
            }  
            io.to(room).emit('join', msg)
        })
        
        socket.on('message', async (msg:MsgTransmit)=>{  
            io.to(room).emit('message', {...msg, time: new Date().getTime()})
        })

    })
}

export const socketPlugin = {
    name: 'socket.io',
    configureServer(server:vd){
        injectSocket(server.httpServer)
    }
} 