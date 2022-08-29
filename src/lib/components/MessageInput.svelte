<script lang="ts">
    let message = ''
    import { createEventDispatcher } from "svelte";
    const d = createEventDispatcher()
    let inputHeight = '4em'

    function send(){
        if(message==='') return
        d('send', message.trim())
        message = ''
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


</style>

<div class="input">
    <label for="message" class="sr">Message</label>
    <textarea id="message" placeholder="type your message here" style="min-height: {inputHeight};" bind:value="{message}" on:keypress={e=>{
        const k = e.key.toLowerCase()
        if( (k === 'enter' || k === 'return') && !e.getModifierState('Shift')) {
            e.preventDefault()
            send()
        }
    }}/>
    <button on:click="{send}">send</button>
</div>