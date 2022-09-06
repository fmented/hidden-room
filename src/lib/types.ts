export type Msg = {
    type: 'text'|'file'
    content: string|File
    from: string
    alias: string
    time: number
}