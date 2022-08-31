<script lang="ts">
    import {room} from '$lib/store'
    let w:number
    import Logo from '$lib/components/Logo.svelte'
    import { page } from '$app/stores';
    
    $: x = $page.url.pathname
    
    
</script>

<svelte:window bind:innerWidth="{w}"/>
<style>

header{
    display: flex;
    justify-items: baseline;
    align-content: space-between;
    height: 5em;
    padding: .25em;
    background: var(--bg1);
    color: var(--fg1);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
}

.logo{
    font-size: 24px;
    display: flex;
    align-items: center;
    flex-grow: 1;
    cursor: pointer;
}

.room{
    position: absolute;
    bottom: 1em;
    right: 1em;
}

.logo>*{cursor: pointer;}


</style>

<header class:bounce="{x=='/'}">
    <div class="logo">
        <a href="/">
            <Logo/>
        </a>
    </div>
    <em class="room" class:sr={w<600}>{$room}</em>
</header>