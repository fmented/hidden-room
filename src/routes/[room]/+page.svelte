<script lang="ts">
    import { page } from "$app/stores";
    import {room} from '$lib/store'
    import JoinRoomModal from "$lib/components/JoinRoomModal.svelte";
    import MessageInput from "$lib/components/MessageInput.svelte";
    import MessageList from "$lib/components/MessageList.svelte";
    import { userAlias, userId } from "$lib/store";
    import {io} from "socket.io-client";
    import type { Msg } from "$lib/types";
    import { browser } from "$app/environment";

    let messages:Msg[] = []

    $room=$page.params.room
    let auth = false
    let client:ReturnType<typeof io>| undefined = undefined    

    function connect(key:string) {
        if(!key || !$userAlias || !$userId) return
        client = io({
            query:{
                room:$room,
                alias:$userAlias,
                id: $userId
            },
            extraHeaders: {key}
        });

        client.on('connect', ()=>{
            if(client?.connected) auth=true
        })

        client.on('message', (msg:Msg)=>{
            messages = [...messages, {...msg, time:new Date().getTime()}]
            scroll()
            
        })

        client.on('join', (msg:Msg)=>{
            messages = [...messages, {...msg, time:new Date().getTime()}]
            scroll()
        })

        client.on('kick', ()=>{
            console.log('kicked');
            
        })

        client.on('disconnect', reason =>{

            if(reason==="transport close"){
                client?.connect()
            }
            else if(reason==="io client disconnect" || 
                    reason==="io server disconnect"){
                         window.location.href= "/"
            }     
            else{
                console.log(reason);   
            }
        })
    }

    function scroll() {
        const h = document.querySelector('html')
        h?.scroll({top:h.scrollHeight+1000, behavior:'smooth'})
    }


    async function send(_msg:{type:string, content:string|File}) {
        if(!client) return
        const m:Msg = {
            type: _msg.type as Msg["type"],
            content: _msg.content,
            from:$userId,
            alias:$userAlias,
            time: new Date().getTime()
        }
        messages = [...messages, m]
        scroll()
        client.emit('message', m)
    }

    let title = messages.length
        ? `${messages[messages.length-1].alias} : ${messages[messages.length-1].type=="text" ? messages[messages.length-1].content: (messages[messages.length-1].content as {name:string}).name}`
        : `Hidden Room ${$room}` 

    let lastTime:number|undefined
    let counter=0
    let anim:number

    function loop(time:number) {
        if (lastTime == undefined) lastTime = time
        const delta = time - lastTime
        if(delta > (counter < 5 ? 2_000 
            : counter < 11? 5_000
            : counter < 13? 10_000 : 60_000)
            ){
            messages = [...messages];
            counter += 1
            lastTime = time            
        }
        anim = requestAnimationFrame(loop)
    }

    function resetLoop(){
        if (!browser || !anim) return
        lastTime = undefined
        counter = 0
        cancelAnimationFrame(anim)
        anim = requestAnimationFrame(loop)
    }

    $: if(messages.length){ 
        anim = requestAnimationFrame(loop)
    }

    $: q = messages.length

    $: q, resetLoop()
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>


<style>
    :global(body::before){
        content: '' !important;
    }
</style>
{#if !auth}
    <section>
        <JoinRoomModal on:join={e=>connect(e.detail)}/>
    </section>
    {:else}
    <MessageList {messages}/>
    <MessageInput on:send={(e)=>send(e.detail)}/>
{/if}
