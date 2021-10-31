<script>
	import { onMount, tick } from 'svelte'
	import { getRandomColors } from '@nokonoko/colors'
	import { gsap } from 'gsap'
	import { ScrollTrigger } from 'gsap/ScrollTrigger'
	import Scroll from './scroll'
	import { title, date } from './store'
  import { activeMenuItems } from '../../components/store'

	import Frame from './components/Frame.svelte'

	import F_2021_10_24 from './assets/2021-10-24/index.js'
	import F_Test from './assets/test/index.js'
	import F_Circles from './assets/circles/index.js'

	gsap.registerPlugin(ScrollTrigger)

	let scroll
	let content
	let index = 0
	let introTimer
	let isAnimatingTitle = true
	let cols = getRandomColors()
	let hasInitializedGsap = false
	let winHeight;

	const frames = [
		F_Circles,
		F_2021_10_24,
		F_Test,
		F_Circles,
		F_2021_10_24,
		F_Circles,
		F_2021_10_24,
		F_Circles,
		F_Circles,
		F_2021_10_24,
		F_2021_10_24,
		F_Circles,
	].map(f => ({
		source: f,
		ref: null,
		component: null,
	}))

	export const clear = () => {
		console.log('clearin?')
	}
	export const prev = () => {
		console.log('prev!')
		// scroll.to(frames[index-1].ref.offsetTop)
	}
	export const next = () => {
		console.log('next!')
		// scroll.to(frames[index+1].ref.offsetTop)
	}

	const init = async () => {
		// Get initial frame meta
		const first = frames[0].source.meta
		$title = first.name
		$date = first.date

		setTimeout(() => isAnimatingTitle = false, 1500)

		$activeMenuItems = [true, false, true, true]

		winHeight = window.innerHeight
		// TODO: redefine on resize

		// Wait a tick…
		await tick()

		// Init asscroll
		scroll = new Scroll()

		// Init scrolltrigger
		ScrollTrigger.defaults({
			scroller: scroll.el
		})

		ScrollTrigger.scrollerProxy(scroll.el, {
			scrollTop(val) {
				return arguments.length ? scroll.position = val : scroll.position;
			},
			getBoundingClientRect() {
				return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
			}
		})

		// Use gsap's ticker method
		// ONLY DO THIS ONCE
		if (!hasInitializedGsap) {
			hasInitializedGsap = true

			gsap.ticker.add(scroll.update)
			gsap.ticker.fps(60)
			scroll.on('update', ScrollTrigger.update)
		}

		// Scroll to first frame
		const timeout = (first.name.length * 100) + (first.date.length * 100)
		introTimer = setTimeout(() => {
			if (scroll.position < 100) {
				scroll.to(frames[0].ref.offsetTop)
			}
		}, timeout)

		for (let i = 0; i < frames.length; i++) {
			const f = frames[i]
			const next = i < frames.length-1 ? frames[i+1] : false

			gsap.from(f.ref.querySelector('figure'), {
				scrollTrigger: {
					start: 'top bottom',
					end: 'top 5%',
					scrub: 0.25,
					trigger: f.ref,
					onToggle: ({ isActive }) => {
						if (isActive && index !== i) {
							f.component.handleEnter()
							index = i
						}
					}
				},
				scale: 0.6,
				ease: 'circ.out',
			})
		}
	}

	$: { index; console.log(index) }

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
	<div class="title" class:animating={isAnimatingTitle}>
		<h2>{#each $title.split(' ') as w}<span>{w}</span> {/each}</h2>
		<h4>{#each $date.split(' ') as w}<span>{w}</span> {/each}</h4>
	</div>
	<ul class="content" asscroll bind:this={content}>
		<li class="intro"></li>
		{#each frames as { source, component, ref }, i}
			<li class="item" bind:this={ref}>
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
		  line-height: 1.05em;
		  text-align: center;
			overflow: hidden;
		  span {
		  	display: inline-block;
				position: relative;
		  }
		}
		h2 {
			font-family: 'Inter', sans-serif;
		  font-size: 1.8rem;
		  font-variation-settings: 'wght' 300, 'slnt' 0;
		  text-transform: uppercase;
		  letter-spacing: -0.02em;
		  padding-top: 0.4em;
			@media screen and (min-width: 768px) {
		    font-size: 2.75rem;
			}
		}

		&.animating {
			h2, h4 {
				span {
					animation: up 1s 0.1s backwards;
			  	&:nth-child(1) { animation-delay: 0.15s; }
			  	&:nth-child(2) { animation-delay: 0.20s; }
			  	&:nth-child(3) { animation-delay: 0.25s; }
			  	&:nth-child(4) { animation-delay: 0.30s; }
			  	&:nth-child(5) { animation-delay: 0.35s; }
			  	&:nth-child(6) { animation-delay: 0.40s; }
				}
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
		height: 80vh;
	}
	.item {
		margin: 0;
		padding: 0;
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
