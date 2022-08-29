import { createCipheriv, createDecipheriv } from 'node:crypto'
import {KEY, IV} from './key.js'


const alg = 'aes-256-cbc'
const key = Buffer.from(KEY, 'hex')
const iv = Buffer.from(IV, 'hex')

export function encrypt(txt:string) {
    let cipher = createCipheriv(alg, key, iv)
    let enc = cipher.update(txt)
    enc = Buffer.concat([enc, cipher.final()])
    return enc.toString('hex')
}

export function decrypt(enc:string) {
    let decipher = createDecipheriv(alg, key, iv)
    let dec = decipher.update(Buffer.from(enc, 'hex'))
    dec = Buffer.concat([dec, decipher.final()])
    return dec.toString()
}
