import {decrypt} from '$server/crypt'
import type { RequestHandler } from '@sveltejs/kit';
import { v4 as id } from 'uuid';

 export const POST:RequestHandler = async function POST({request}){
    const room = request.headers.get('room')||null
    const key = request.headers.get('key')||'';
    let d:string
    let match = false
    try {
        d = decrypt(key as string);
        match = room===d 
    } catch (error) {
        if((error as {library:string}).library !== "Provider routines") console.log(error);
        
    }

    let res = new Response(JSON.stringify({
        match,
        id: match ? id() : 'UNWANTED GUEST',
    }))

    return res
}