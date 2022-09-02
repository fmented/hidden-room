<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {userAlias, userId} from '$lib/store'
    import { room } from "$lib/store";

    const d = createEventDispatcher()

    let alias:string='anonymous'
    let key:string=''

    let processing = false;
    
    let wrongKey=false;
    let noAlias=false;

    function check_key() {
        if(processing) return
        processing = true
        if(alias.length < 4) 
        noAlias = true 
        fetch(`/api/check_key`, {
            headers:{
                key,
                room: $room
            },
            method:'POST'
        }).then(r=>r.json()).then(res=>{
            if(res.match===false ){
                wrongKey=true
            }
            else{
                if(noAlias) return
                $userId = res.id;
                $userAlias = alias;
                d('join', key)
            }
            
            processing = false
        })
    }

    let keyField:HTMLTextAreaElement
</script>

<style>
    .modal{
        position: fixed;
        top: 0;
        height: 100vh;
        width: 100vw;
        z-index: 0;
        display: grid;
        place-items: center;;
    }

    .con{
        min-height: max-content;
        display: flex;
        gap: 1em;
        max-width: 90vw;
        min-width: 20rem;
        flex-direction: column;
        border: 1px solid var(--fg1);
        border-radius: .5rem;
        background: var(--bg1);
        padding: 1rem;
    }

    .field{
        display: flex;
        flex-direction: column;
    }

    input, textarea{
        margin-top: .5rem;
        background-color: var(--bg2);
        border-radius: .5em;
        padding: .5rem;
        color: var(--fg1);
    }

    textarea{
        resize: none;
    }

    .field:first-of-type{
        border-bottom: 1px solid var(--bg2);
        padding-bottom: 1.5rem;
    }

    label, small{
        color: var(--fg1);
    }
    small{
        margin-top: .5rem;
    }

    .btn{
        display: flex;
        flex-direction: row-reverse;
    }

</style>

<div class="modal">
    <div class="con">
        <div class="field">
            <label for="alias">Alias : </label>
            <input type="text" id="alias" readonly={processing} bind:value="{alias}" 
            on:input="{()=>{
                    if(noAlias) noAlias=false
            }}"

            on:click="{()=>{
                if(processing) processing = false
            }}"
             
            on:keypress="{(e)=>{
                const k = e.key.toLowerCase()
                if( (k === 'enter' || k === 'return')) {
                    e.preventDefault()
                    keyField.focus()
                }
            }}">
            {#if noAlias}
                <small>Alias has to be 4 characters or more</small>
            {/if}
        </div>
 
        <div class="field">
            <label for="key">Room Key : </label>
            <textarea bind:this="{keyField}" readonly={processing} id="key" rows="3" bind:value="{key}" on:input="{()=>{if(wrongKey) wrongKey=false}}" on:keypress="{(e)=>{
                const k = e.key.toLowerCase()
                if( (k === 'enter' || k === 'return')) {
                    e.preventDefault()
                    check_key()
                }
            }}"/>
            {#if wrongKey}
                <small>Wrong key, Check your key again</small>
            {/if}
        </div>
        <div class="btn">
            <button on:click="{check_key}">Join</button>
        </div>
    </div>
</div>


