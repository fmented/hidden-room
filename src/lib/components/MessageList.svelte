<script lang="ts">
    import { userId } from "$lib/store";
    import type { Msg } from "$lib/types";
    import { calcTime } from "$lib/utils";
    import Message from "./Message.svelte"

    export let messages:Msg[] = []
    export let id = $userId
</script>

<style>
section{
    display: flex;
    flex-direction: column;
    gap: .5rem;
    width: 100%;
    overflow: hidden;
    margin: 5.5rem 0 5rem 0;
    min-height: calc(100vh - 11.5rem);
    padding-bottom: 1rem;
    height: auto;
}

</style>

<section>
    <!-- svelte-ignore missing-declaration -->
    {#each messages as message, i (`${i}${message.from}${calcTime(message.time)}`)}
        <Message 
            content={message.content}
            _from={message.alias}
            sender={message.from===id} 
            time={message.time}/>
    {/each}
</section>
