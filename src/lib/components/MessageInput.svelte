<script lang="ts">
    import type {FileConstructParam} from "$lib/types" 
    import { createEventDispatcher } from "svelte";

    let message = ''
    const d = createEventDispatcher()
    let inputHeight = '4em'
    let processing= false

    function sendText(){
        if(message==='' || processing) return
        processing = true
        d('send', {content:message.trim(), type:'text'})
        message = ''
        processing = false
    }

    let inputFile = false
    let fileToSend: FileList|undefined = undefined 
    let fileEl:HTMLInputElement 

    async function sendFile(){
        if(fileToSend===undefined || processing) return
        processing = true
        const f = fileToSend[0]
        const p:FileConstructParam = {
            buff: await f.arrayBuffer(),
            name: f.name,
            type: f.type
        }

        d('send', {content:p, type:'file'})
        fileToSend= undefined
        fileEl.value = ''
        processing = false
    }

    function send() {
        return inputFile? sendFile() : sendText()
    }
</script>

<style>

*{
    box-sizing: border-box;
}

.input{
    display: flex;
    bottom: 0rem;
    width: 100%;
    align-items: center;
    position: fixed;
    background-color: var(--bg2);
    padding: 1rem .5rem;
    border: 0;
    outline: 0;
}

button{
    font-weight: bold;
    color: var(--bg1);
    background: var(--ac1);
    border-width: 3px;
}

textarea{
    border-radius: .5em;
    flex-grow: 1;
    min-height: 4em;
    padding: .5em;
    font-size: 12px;
    background-color: var(--bg1);
    color: var(--fg1);
    resize: none;
}

input[type="file"]{
    flex-grow: 1;
    min-height: 4em;
    padding: .5em;
    font-size: 12px;
    background-color: var(--bg1);
    color: var(--fg1);
    align-self: center;
}

</style>

<div class="input">
    <button on:click="{()=>inputFile=!inputFile}">{inputFile? "Text" : "File"}</button>
    {#if !inputFile}
        <label for="message" class="sr">Message</label>
        <textarea id="message" placeholder="type your message here" style="min-height: {inputHeight};" bind:value="{message}" on:keypress={e=>{
            const k = e.key.toLowerCase()
            if( (k === 'enter' || k === 'return') && !e.getModifierState('Shift')) {
                e.preventDefault()
                send()
            }
        }}/>
    {:else}
        <label for="file" class="sr">File</label>
        <input type="file" bind:files="{fileToSend}" bind:this="{fileEl}" style="height: {inputHeight};">
    {/if}
    <button on:click="{send}">Send</button>
</div>