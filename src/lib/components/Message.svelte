<script lang="ts">
    import { calcTime } from "$lib/utils";
    import {browser} from '$app/environment'
    import {objURL} from '$lib/store'
    export let sender = false;
    export let content:string|File = ''
    export let _from = ''
    export let time: number


    let url:string|undefined = ''

    $: if(browser && content instanceof File){
        if($objURL.has(content)){
            url = $objURL.get(content)
        }
        else{
            const r = new FileReader()
            r.readAsDataURL(content)
            r.addEventListener('load', _=>{
                url = r.result as string
                $objURL.set(content as File, url)
            })

            r.onerror = e=>{
                console.log(e);     
            }
        }
    }

    let t = calcTime(time)
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

</style>

<div class="msg" class:accent={sender}>
    <div class="head">
        <strong>{sender?'you':_from}</strong>
    </div>
    <em>
        <small>
            {calcTime(time)}
        </small>
    </em>
    {#if typeof content === 'string'}
        <p>{content}</p>
        {:else}
        <p style="white-space: normal;">
            Sent file:<br/>
            <a href="{url}" download="{content.name}">
            {content.name}
            </a>
        </p>
    {/if}
</div>