<script>
	import { onMount, tick } from 'svelte'
	import { getRandomColors } from '@nokonoko/colors'
	import { gsap } from 'gsap'
	import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { range } from 'canvas-sketch-util/random'
	import Scroll from './scroll'
	import { title, date } from './store'
  import { activeMenuItems } from '../../components/store'

  // Frame component
	import Frame from './components/Frame.svelte'

	// Frames
	import F_2021_10_24 from './assets/2021-10-24/index.js'
	import F_Test from './assets/test/index.js'
	import F_Circles from './assets/circles/index.js'

	gsap.config({
		nullTargetWarn: false,
	})
	gsap.registerPlugin(ScrollTrigger)

	let scroll
	let content
	let index = 0
	let introTimer
	let titleEl
	let isAnimatingTitle = true
	let cols = getRandomColors()
	let hasInitializedGsap = false
	let winHeight, winWidth
	let frameOffset
	let inputsVisible = false

	const frames = [
		F_Circles,
		F_2021_10_24,
	].map(f => ({
		source: f,
		ref: null,
		component: null,
	}))

	export const refresh = () => {
		frames.forEach(f => {
			f.component.rerender()
		})
	}
	export const prev = () => {
		const pos = Math.abs(scroll.scroll.targetPos)
		const current = (pos + frameOffset) % winHeight
		scroll.to(pos - (winHeight + current))
	}
	export const next = () => {
		const pos = Math.abs(scroll.scroll.targetPos)
		const current = (pos + frameOffset) % winHeight
		scroll.to(pos + (winHeight - current))
	}
	export const toggleInputs = () => {
		frames.forEach(f => {
			f.component.toggleInputs()
		})
		inputsVisible = !inputsVisible
	}

	const init = async () => {
		// Get initial frame meta
		const first = frames[0].source.meta
		$title = first.name
		$date = first.date

		setTimeout(() => isAnimatingTitle = false, 2100)

		$activeMenuItems = [true, false, true, true, true]

		onResize()

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
		}, 500 + timeout)

		for (let i = 0; i < frames.length; i++) {
			const f = frames[i]
			const next = i < frames.length-1 ? frames[i+1] : false
			const rotation = range(-12, 13)

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
				rotation: `${rotation}deg`,
				ease: 'circ.out',
			})

			if (inputsVisible) {
				const inputs = f.ref.querySelector('.frame-inputs > div')
				gsap.from(inputs, {
					scrollTrigger: {
						start: 'top bottom',
						once: false,
						trigger: inputs,
					},
					duration: 1,
					opacity: 0,
					y: '50%',
					ease: 'power2.out',
				}, 0.5)
			}
		}
	}

	const setTitlePos = () => {
		titleEl.style.marginTop = winHeight / 2 + 'px'
	}

	const onResize = () => {
		const w = window.innerWidth
		winHeight = window.innerHeight
		frameOffset = winHeight * 0.2

		if (w !== winWidth) {
			setTitlePos()
			winWidth = w
		}
	}

	const destroy = () => {
		scroll.destroy()
		clearTimeout(introTimer)
		document.querySelector('body').classList.remove('frames')
		window.removeEventListener('resize', onResize)
	}

	onMount(() => {
		document.querySelector('body').classList.add('frames')
		window.addEventListener('resize', onResize)

		init()
		return destroy
	})
</script>

<section class="frames" asscroll-container>
	<div
		class="title"
		bind:this={titleEl}
		class:animating={isAnimatingTitle}
	>
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
		<li class="outro">
			<div class="outro-content">
				<h2>More soon</h2>
				<h3>(Maybe)</h3>
			</div>
		</li>
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

	h2, h3, h4 {
		display: inline-block;
		margin: 0;
	  line-height: 1.05em;
	  text-align: center;
		overflow: hidden;
		font-family: 'Inter', sans-serif;
	  font-size: 1.8rem;
	  font-variation-settings: 'wght' 300, 'slnt' 0;
	  text-transform: uppercase;
	  letter-spacing: -0.02em;

		span {
	  	display: inline-block;
			position: relative;
	  }

		@media screen and (min-width: 768px) {
	    font-size: 2.75rem;
		}
	}

	.title {
		display: flex;
		flex-direction: column;
		align-items: center;
		align-content: center;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		transform: translateY(-65%);

		@media screen and (min-width: 600px) {
			position: absolute;
		}

		&.animating {
			h2, h4 {
				span {
					animation: up 1s 0.7s backwards;
			  	&:nth-child(1) { animation-delay: 0.75s; }
			  	&:nth-child(2) { animation-delay: 0.80s; }
			  	&:nth-child(3) { animation-delay: 0.85s; }
			  	&:nth-child(4) { animation-delay: 0.90s; }
			  	&:nth-child(5) { animation-delay: 0.95s; }
			  	&:nth-child(6) { animation-delay: 1.00s; }
				}
			}
		}

	  @media (prefers-color-scheme: light) {
			color: #000;
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

    @media (prefers-color-scheme: light) {
    	background: #fff;
    }
	}

	.intro,
	.outro {
		width: 100%;
		height: 80vh;
	}

	.outro {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		margin-top: -30vh;
		height: 131vh;
		background: black;
		color: white;
		position: relative;
		z-index: 1;

		&-content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100vh;
		}

		@media screen and (min-width: 1100px) {
			height: 150vh;
			margin-top: -50vh;
		}

		@media (prefers-color-scheme: light) {
			background: white;
			color: black;
		}
	}

	.item {
		margin: 0;
		padding: 0;
		position: relative;
		z-index: 2;
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
