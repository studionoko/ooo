<script>
	import { onMount, tick } from 'svelte'
	import { getRandomColors } from '@kvasi/colors'
	import Frame from './components/Frame.svelte'
	import Scroll from './scroll'
	import { title, date } from './store'

	import F_2021_10_24 from './assets/2021-10-24/index.js'
	import F_Test from './assets/test/index.js'
	import F_Circles from './assets/circles/index.js'

	let scroll
	let observer
	let content
	let cols = getRandomColors()

	const frames = [
		F_Circles,
		F_2021_10_24,
		F_Test,
	].map(f => ({ source: f, ref: null, component: null }))

	export const clear = () => {
		console.log('clearin?')
	}

	const update = () => {
		scroll.update()
		requestAnimationFrame(update)
	}

	const init = async () => {
		// Get initial frame meta
		const first = frames[0].source.meta
		$title = first.name
		$date = first.date

		// Wait a tick…
		await tick()

		// Init asscroll
		scroll = new Scroll()
		scroll.observe(frames)

		setTimeout(() => {
			scroll.toIndex(0)
		}, 1500)

		update()
	}

	const destroy = () => {
		cancelAnimationFrame(update)

		scroll.destroy()
	}

	onMount(() => {
		init()

		return destroy
	})
</script>

<section class="frames" asscroll-container>
	<div class="title">
		<h2>{$title}</h2>
		<h4>{$date}</h4>
	</div>
	<ul class="content" asscroll bind:this={content}>
		<li class="intro"></li>
		{#each frames as { source, component, ref }}
			<li bind:this={ref}>
				<Frame {source} bind:this={component} />
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	:global(body) {
		-webkit-tap-highlight-color: none;
		overscroll-behavior: contain;
		overflow: hidden;
	}

	.title {
		display: flex;
		flex-direction: column;
		align-items: center;
		align-content: center;
		justify-content: center;
		position: absolute;
		top: -1rem;
		left: 0;
		width: 100%;
		height: 100%;

		h2, h4 {
			margin: 0;
		  line-height: 1em;
		  text-align: center;
		}
		h2 {
			font-family: 'Inter', sans-serif;
		  font-size: 1.8rem;
		  font-variation-settings: 'wght' 300, 'slnt' 0;
		  text-transform: uppercase;
		  letter-spacing: -0.02em;
			@media screen and (min-width: 768px) {
		    font-size: 2.75rem;
			}
		}
	}

	.frames {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		width: 100%;
		height: auto;
		min-height: 100vh;
	}

	.intro {
		width: 100%;
		height: 90vh;
	}

	.content {
		list-style: none;
		display: block;
		width: 100%;
		height: auto;
		padding: 0;
		margin: 0;
	}
</style>
