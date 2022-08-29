<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {userAlias, userId} from '$lib/store'
    import { room } from "$lib/store";

    const d = createEventDispatcher()

    let alias:string
    let key:string
    
    let wrongKey=false;

    function check_key() {
        fetch(`/api/check_key`, {
            headers:{
                key,
                room: $room
            },
            method:'POST'
        }).then(r=>r.json()).then(res=>{
            if(res.match===false){
                wrongKey=true
            }
            else{
                d('join', key)
                $userId = res.id;
                $userAlias = alias;
            }
        })
    }

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

    input{
        margin-top: .5rem;
        background-color: var(--bg2);
        border-radius: .5em;
        padding: .5rem;
        color: var(--fg1);
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
            <input type="text" id="alias" bind:value="{alias}">
        </div>
 
        <div class="field">
            <label for="key">Room Key : </label>
            <input type="text" id="key" bind:value="{key}" on:input="{()=>{if(wrongKey) wrongKey=false}}">
            {#if wrongKey}
                <small>Wrong key, Check your key again</small>
            {/if}
        </div>
        <div class="btn">
            <button on:click="{check_key}">Join</button>
        </div>
    </div>
</div>


