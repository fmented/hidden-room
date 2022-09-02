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
        color: var(--ac1);
        text-decoration: none;
    }

    a>svg{
        fill: var(--ac1);
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
            <em id=link>
                <a href={`/${room}`} title="Open Room In Current Tab">
                    {`Copy Room Key Below and Enjoy Your Room`}
                </a>
                <a href={`/${room}`} target="_blank" title="Open Room In New Tab">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" id="icon">
                        <defs>
                          <style>
                            .cls-1 {
                              fill: none;
                            }
                          </style>
                        </defs>
                        <g>
                          <path d="M26,26H6V6H16V4H6A2.002,2.002,0,0,0,4,6V26a2.002,2.002,0,0,0,2,2H26a2.002,2.002,0,0,0,2-2V16H26Z"/>
                          <path d="M26,26H6V6H16V4H6A2.002,2.002,0,0,0,4,6V26a2.002,2.002,0,0,0,2,2H26a2.002,2.002,0,0,0,2-2V16H26Z"/>
                        </g>
                        <polygon points="26 6 26 2 24 2 24 6 20 6 20 8 24 8 24 12 26 12 26 8 30 8 30 6 26 6"/>
                        <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/>
                      </svg>
                </a>
            </em>
        </div>
 
        <div class="field">
            <label for="key">Room Key : </label>
            <textarea rows="3" id="key" value="{key}" class:copy={supportClipboard} readonly on:click="{
                ()=>{
                    if(!supportClipboard) return
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


