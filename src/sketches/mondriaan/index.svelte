<script>
	import { onMount } from 'svelte'
	import { getRandomColorsFromCategory } from '@kvasi/colors'
	import { map } from '@kvasi/tools'

	const cols = getRandomColorsFromCategory('galaxy')
	const limit = 500

	let viewport = { width: 1920, height: 1080 }
	let rows = Array(20)

	export const clear = () => {
		// circles = []
		console.log('clearin');
	}

	const addRow = () => {
		rows = [...rows, {}];
	};

	onMount(() => {

		return () => {
			clear()
		}
	})
</script>

<div class="grid">
	{#each rows as i}
		<div class="grid-row">
			<div class="grid-item">1</div>
			<div class="grid-item">2</div>
			<div class="grid-item">3</div>
			<div class="grid-item">4</div>
			<div class="grid-item">5</div>
			<div class="grid-item">6</div>
			<div class="grid-item">7</div>
			<div class="grid-item">8</div>
			<div class="grid-item">9</div>
			<div class="grid-item">10</div>
			<div class="grid-item">12</div>
		</div>
	{/each}
</div>

<style lang="scss">
:global(body) {
	overflow: scroll;
}

.grid {
	width: 100%;
	display: flex;
	flex-direction: column;

	&-row {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-column-gap: 1rem;
		margin: 0 0 1rem;
	}
	&-item {
		display: flex;
		width: auto;
		height: 20vh;
		background: #fff;
		@media (prefers-color-scheme: light) {
			background: #000;
			color: #fff;
		}
	}

	&-row:nth-child(1) :nth-child(8) { grid-column: span 2; background: #f00; }
	&-row:nth-child(2) :nth-child(2) { grid-column: span 2; }
	&-row:nth-child(3) :nth-child(7) { grid-column: span 2; }
	&-row:nth-child(4) :nth-child(1) { grid-column: span 2; }
}
</style>
