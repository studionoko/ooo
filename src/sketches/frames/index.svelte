<script>
	import { onMount, tick } from 'svelte'
	import { getRandomColors } from '@kvasi/colors'
	import Frame from './components/Frame.svelte'
	import { gsap } from 'gsap'
	import { ScrollTrigger } from 'gsap/ScrollTrigger'
	import Scroll from './scroll'
	import { title, date } from './store'

	import F_2021_10_24 from './assets/2021-10-24/index.js'
	import F_Test from './assets/test/index.js'
	import F_Circles from './assets/circles/index.js'

	gsap.registerPlugin(ScrollTrigger)

	let scroll
	let content
	let introTimer
	let cols = getRandomColors()

	const frames = [
		F_Circles,
		F_2021_10_24,
		F_Test,
	].map(f => ({ source: f, ref: null, component: null }))

	export const clear = () => {
		console.log('clearin?')
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

		// Init scrolltrigger
		ScrollTrigger.defaults({
			scroller: scroll.scroll.containerElement
		})

		// Use gsap's ticker method
		gsap.ticker.add(scroll.update)

		scroll.on('update', ScrollTrigger.update)

		// Scroll to first frame
		const timeout = (first.name.length * 100) + (first.date.length * 100)
		introTimer = setTimeout(() => {
			if (scroll.position < 100) {
				scroll.to(frames[0].ref.offsetTop)
			}
		}, timeout)
	}

	const destroy = () => {
		scroll.destroy()
		clearTimeout(introTimer)
	}

	onMount(() => {
		init()
		return destroy
	})
</script>

<section class="frames" asscroll-container>
	<div class="title">
		<h2>{#each $title.split(' ') as w}<span>{w}</span> {/each}</h2>
		<h4>{#each $date.split(' ') as w}<span>{w}</span> {/each}</h4>
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

	@keyframes up {
		from {
			transform: translateY(100%);
		}
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
			display: inline-block;
			margin: 0;
		  line-height: 1em;
		  text-align: center;
			overflow: hidden;
		  span {
		  	display: inline-block;
				position: relative;
		  	animation: up 1s 0.1s backwards;
		  	&:nth-child(1) { animation-delay: 0.15s; }
		  	&:nth-child(2) { animation-delay: 0.20s; }
		  	&:nth-child(3) { animation-delay: 0.25s; }
		  	&:nth-child(4) { animation-delay: 0.30s; }
		  	&:nth-child(5) { animation-delay: 0.35s; }
		  	&:nth-child(6) { animation-delay: 0.40s; }
		  }
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
