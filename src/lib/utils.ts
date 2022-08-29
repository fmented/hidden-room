export function calcTime(sent_date:number) {
    const x = new Date().getTime();
    const ms = x - sent_date;
    if(ms > 3_600_000) return calcHours(ms, true);
    else if(ms > 60_000) return calcMinutes(ms, true);
    else return calcSeconds(ms, true);
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
