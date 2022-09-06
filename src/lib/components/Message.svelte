<script lang="ts">
    import { calcTime, Timer } from "$lib/utils";
    import {browser} from '$app/environment'
    import {objURL} from '$lib/store'
    import { onMount, onDestroy } from "svelte";
    export let sender = false;
    export let content:string|File = ''
    export let _from = ''
    export let time: number

    let displayTime = calcTime(time)

    let url:string|undefined = ''

    $: if(browser && content instanceof File){
        if($objURL.has(content)){
            url = $objURL.get(content)
        }
        else{
            url = URL.createObjectURL(content)
            $objURL.set(content as File, url)
        }
    }

    let t: Timer

    onMount(()=>{
        t = new Timer(()=>displayTime=calcTime(time))
        t.start()
    })

    onDestroy(()=>{
        if(t) t.stop()
    })
    
</script>

<style>
.msg{
    display: flex;
    flex-direction: column;
    border-radius: .5em;
    padding: .5em;
    min-width: 20ch;
    max-width: 60vw;
    overflow-x: hidden;
    border: 2px solid var(--fg1);
    background-color: var(--bg2);
    margin-left: 1rem;
    margin-top: 1rem;
    word-break: break-all;
    opacity: 1;
    align-self: flex-start;
    color: var(--fg1);
    min-height: max-content;
    flex-shrink: 0;
}

.accent{
    background-color: var(--ac2);
    align-self: flex-end;
    margin-right: 1rem;
    color: var(--bg1);
    border-color: var(--bg1);
}

.head{
    border-bottom: 3px solid var(--fg1);
    font-size: 18px;
    padding-bottom: .5em;

}

.accent>.head{
    border-color: var(--bg1);
}

p{
    padding: .5em;
    margin: 0;
    font-size: 18px;
    font-weight: 900;
    white-space: pre-wrap;
    word-break: break-all;
}

em{
    align-self: flex-end;
}

a{
    color: inherit;
}

img, video, audio{
    padding: .5rem;
    max-width: 40vw;
}



</style>

<div class="msg" class:accent={sender}>
    <div class="head">
        <strong>{sender?'you':_from}</strong>
    </div>
    <em>
        <small>
            {displayTime}
        </small>
    </em>
    {#if typeof content === 'string'}
        <p>{content}</p>
        {:else}
        {#if content.type.startsWith('image')}
            <img src="{url}" alt="{content.name}"/>
        {:else if content.type.startsWith('audio')}
            <audio controls>
                <source src="{url}" type="{content.type}">
                Your Browser Does't Support Audio Element
            </audio>
        {:else if content.type.startsWith('video')}
            <video controls>
                <track kind="captions"/>
                <source src="{url}" type="{content.type}">
                Your Browser Does't Support Video Element
            </video>
         {:else}
            <p style="white-space: normal;">
                Sent file:<br/>
                <a href="{url}" download="{content.name}">
                {content.name}
                </a>
            </p>
        {/if}
    {/if}
</div>