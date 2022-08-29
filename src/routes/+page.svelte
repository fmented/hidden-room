<script lang="ts">
	
	import CreateRoomModal from "$lib/components/CreateRoomModal.svelte";
	
	type Creds = {room:string, key:string}
	
	let creds:Creds|null = null
	
	async function createRoom(){
		const json = await fetch(`/api/create`, {method:'POST'})
		const res = await json.json()
		creds = res
	}
	
</script>
		
<svelte:head>
	<title>Hidden Room</title>
</svelte:head>

<section>
	<div>
		<button on:click="{createRoom}">Create Room</button>
	</div>
</section>

{#if creds !== null}
	<CreateRoomModal key={creds.key} room={creds.room}/>
{/if}

<style>
	section{
		width: 100%;
		height: 100vh;
		display: grid;
		place-items: center;
		background-color: #555;
		background-color: #2af;
		opacity: 0.9;
		background-image: radial-gradient(circle at center center, #222, #2af), repeating-radial-gradient(circle at center center, #222, #222, 40px, transparent 80px, transparent 40px);
		background-blend-mode: multiply;   
		background-attachment: fixed;
	}

	div{
		display: flex;
		gap: 2rem
	}
		
</style>