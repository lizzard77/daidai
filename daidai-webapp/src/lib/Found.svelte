<script>
	export let front;
</script>

<div class="w-16 h-16 m-1 relative">
    <div class="side m-2 rounded-full w-16 h-16 bg-blue-500 text-center">{front}</div>
</div>

<style>
    .side {
		position: absolute;
		height: 100%;
		width: 100%;
		overflow: hidden;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>