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
		position: absolute;
		top: 0;
	}

	div{
		display: flex;
		gap: 2rem
	}

	:global(body){
		position: relative;
	}

	:global(body::before){
		content: "reminder : this web app requires javascript to work properly";
		top: 0;
		position: absolute;
		text-align: center;
		left: 0;
		width: 100%;
		overflow: hidden;
		color: white;
		font-weight: bold;
		z-index: 1;
		font-family: Arial, Helvetica, sans-serif;
	}	
	
</style>