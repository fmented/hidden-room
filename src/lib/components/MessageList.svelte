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
    min-height: 100vh;
}

</style>

<section>
    {#each messages as message}
        {#key `${message.from}${message.message}${calcTime(message.time)}`}
            <Message message={message.message} _from={message.alias} sender={message.from===id} time={message.time}/>
        {/key}
    {/each}
</section>
