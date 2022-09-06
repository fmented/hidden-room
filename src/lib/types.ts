export type Msg = {
    type: 'text'|'file'
    content: string|File
    from: string
    alias: string
    time: number
}

export type FileConstructParam = {
    buff: ArrayBuffer
    name: string
    type: string
}

export type MsgTransmit = Omit<Msg, "content"> & {content:FileConstructParam|string}