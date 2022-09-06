import type { Msg } from "./types";

export function calcTime(sent_date:number, now:number=timeNow()) {
    const x = now
    const ms = x - sent_date;
    if(ms > 3_600_000) return calcHours(ms, true);
    else if(ms > 60_000) return calcMinutes(ms, true);
    else return calcSeconds(ms, true);
}


export function scroll() {
    const h = document.querySelector('html')
    h?.scroll({top:h.scrollHeight|0 + h.clientHeight, behavior:'smooth'})
}

export function createTitle(messages:Msg[], room:string){
    if(messages.length){
        const m = messages[messages.length-1]
        return `${m.alias}: ${m.content instanceof File? parseType(m.content): m.content}`
    }
    return `Hidden Room ${room}` 
}

export function timeNow(){
    return new Date().getTime()
}

function parseType(m:File){
        const emj = m.type.startsWith('image')? '📷'
                    : m.type.startsWith("audio")? "🎵"
                    : m.type.startsWith("video")? "🎥"
                    : '📁'
        return `${emj} ${m.name}`
    }


export class Timer{
    #anim: number|undefined
    #lastTime:number|undefined
    #cb:()=>void
    #counter=0
    #loop: (t:number)=>void

    constructor(cb: ()=>void){
        this.#cb = cb
        this.#lastTime = undefined
        this.#anim = undefined
        this.#loop = (time:number)=>{
            if (this.#lastTime === undefined) this.#lastTime = time
            const delta = time - this.#lastTime
            if(delta > (this.#counter < 5 ? 2_000 
                : this.#counter < 11? 5_000
                : this.#counter < 13? 10_000 : 60_000)
                ){
                this.#cb()
                this.#counter += 1
                this.#lastTime = time            
            }
            this.#anim = requestAnimationFrame(this.#loop)
        }

    }

    start(){
        this.#anim = requestAnimationFrame(this.#loop)
    }

    reset(){
        this.stop()
        this.start()
    }

    stop(){
        if (!this.#anim) return
        this.#lastTime = undefined
        this.#counter = 0
        cancelAnimationFrame(this.#anim)
    }
}

function calcSeconds(ms:number):number
function calcSeconds(ms:number, show:true):string
function calcSeconds(ms:number, show?:boolean) {
    const val = Math.round(ms / 1000)
    return show ? `${val} second${val > 1 ?'s':''} ago`: val
}

function calcMinutes(ms:number):number
function calcMinutes(ms:number, show:true):string
function calcMinutes(ms:number, show?:boolean):string|number{
    const val = Math.round(calcSeconds(ms) / 60)
    return show ? `${val} minute${val > 1 ?'s':''} ago`: val
}

function calcHours(ms:number):number
function calcHours(ms:number, show:true):string
function calcHours(ms:number, show?:boolean){
    const val = Math.round(calcMinutes(ms) / 60)
    return show? `${val} hour${val > 1 ?'s':''} ago` : val
}
