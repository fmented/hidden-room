<script lang="ts">
    import { page } from "$app/stores";
    import {room, objURL} from '$lib/store'
    import JoinRoomModal from "$lib/components/JoinRoomModal.svelte";
    import MessageInput from "$lib/components/MessageInput.svelte";
    import MessageList from "$lib/components/MessageList.svelte";
    import { userAlias, userId } from "$lib/store";
    import {io} from "socket.io-client";
    import type { Msg, MsgTransmit, FileConstructParam } from "$lib/types";
    import { createTitle, scroll, timeNow } from "$lib/utils";
    import { onDestroy } from "svelte";

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

        client.on('message', (msg:MsgTransmit)=>{
            let content:Msg['content']

            if(msg.type === 'file') {
                const d = msg.content as FileConstructParam
                content = new File([d.buff], d.name, {type: d.type})
            }

            else{
                content = msg.content as string
            }

            const m = {...msg, content}    
            messages = [...messages, {...m, time:new Date().getTime()}]
            scroll()
            
        })

        client.on('join', (msg:Msg)=>{
            messages = [...messages, {...msg, time:new Date().getTime()}]
            scroll()
        })

        client.on('kick', ()=>{
            messages = []
            client?.disconnect()
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


    async function send(_msg:Pick<MsgTransmit, "content" | "type">) {
        if(!client) return
        const m:MsgTransmit = {
            type: _msg.type as Msg["type"],
            content: _msg.content,
            from:$userId,
            alias:$userAlias,
            time: timeNow()
        }

        const selfmsg:Msg = typeof _msg.content === 'string'
        ? {...m, content:_msg.content}
        : {...m, content:new File([_msg.content.buff], _msg.content.name, {type: _msg.content.type})}

        messages = [...messages, selfmsg]

        scroll()
        client.emit('message', m)
    }

    $: title = createTitle(messages, $room)

    onDestroy(()=>{
        $objURL.clear()
    })
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
