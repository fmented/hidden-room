<script lang="ts">
    import { browser } from '$app/environment';
    export let key:string=''
    export let room:string=''
    let copied=false;
    let supportClipboard = false
    $: if(browser){
        supportClipboard = typeof navigator?.clipboard?.writeText == 'function'
    }
</script>

<style>
    .modal{
        position: fixed;
        top: 0;
        height: 100vh;
        width: 100vw;
        z-index: 1;
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
        border: 1px solid white;
        border-radius: .5rem;
        background: #222;
        padding: 1rem;
    }

    .field{
        display: flex;
        flex-direction: column;
    }

    textarea{
        margin-top: .5rem;
        background-color: #555;
        border-radius: .5em;
        padding: .5rem;
        color: white;
        resize: none;
    }

    .copy{
        cursor: pointer;
    }

    .field:first-of-type, strong{
        border-bottom: 1px solid #555;
        padding-bottom: 1.5rem;
    }

    strong{
        padding-bottom: .5rem;
    }

    label, small{
        color: white;
    }
    small{
        margin-top: .5rem;
    }

    a, strong{
        color: #2af;
    }

    a{
        margin-top: .5em;
    }


</style>

<div class="modal">
    <div class="con">
        <strong>Share these informations to your trusted comrades</strong>
        <div class="field">
            <label for="link">Room URL : </label>
            <a href={`/${room}`} id="link" target="_blank">
                {`Copy Room Key Below and Enjoy Your Room`}
            </a>
        </div>
 
        <div class="field">
            <label for="key">Room Key : </label>
            <textarea rows="3" id="key" value="{key}" class:copy={supportClipboard} readonly on:click="{
                ()=>{
                    navigator.clipboard.writeText(key)
                    copied=true
                    setTimeout(()=>copied=false, 5000)
                }
            }"/>
            {#if copied}
                <small>Key is copied</small>
            {/if}
        </div>
    </div>
</div>


