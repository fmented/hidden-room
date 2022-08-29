import {encrypt} from '$server/crypt'
import type { RequestHandler } from '@sveltejs/kit'
import {v4 as uuid} from 'uuid'



export const POST:RequestHandler = async function(){
    const room = uuid()
    let res = new Response(JSON.stringify({
        room,
        key: encrypt(room)
    }))
    return res
}
