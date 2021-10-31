<script>
	import { onMount } from 'svelte'
	import { getRandomColorsFromCategory } from '@nokonoko/colors'
	import { map } from '@nokonoko/tools'
	import Circle from './components/Circle.svelte'
  import { resetMenuItems } from '../../components/store'

	const cols = getRandomColorsFromCategory('galaxy')
	const limit = 500

	let circles = []
	let count = 0
	let velocity = 10
	let spreadFactor = 100
	let viewport = { width: 1920, height: 1080 }
	let raf,
			rafTimeout
	let isDrag,
			isDrawing
	let yFactor,
			xFactor,
			widthFactor,
			heightFactor

	$: shouldDoShit = count < limit

	const setup = () => {
		velocity = 1;
		yFactor = randomBetween(10.5, 12)
		xFactor = randomBetween(11.2, 12.5)
		heightFactor = randomBetween(1.25, 1.80)
		widthFactor = randomBetween(2.15, 2.85)
		spreadFactor = randomBetween(120, 400)
	}

	export const clear = () => {
		circles = []
		clearTimeout(rafTimeout)
		cancelAnimationFrame(raf)
	}

	const createNewCircle = circle => {
		circles = [...circles, circle]
	}

	const handleClick = ev => {
		createNewCircle({
			color: cols[Math.floor(Math.random() * cols.length)],
			y: ev.pageY,
			x: ev.pageX,
		})
	}
	const handleMouseDown = ev => {
		isDrag = true
	}
	const handleMouseUp = ev => {
		isDrag = false
	}
	const handleMouseMove = ev => {
		if (!isDrag || isDrawing) return
		isDrawing = true
		createNewCircle({
			color: cols[Math.floor(Math.random() * cols.length)],
			y: ev.pageY,
			x: ev.pageX,
		})
		setTimeout(() => isDrawing = false, 10);
	}
	const handleTouchMove = ev => {
		if (!isDrag || isDrawing) return
		isDrawing = true
		createNewCircle({
			color: cols[Math.floor(Math.random() * cols.length)],
			x: ev.touches[0].clientX,
			y: ev.touches[0].clientY,
		})
		setTimeout(() => isDrawing = false, 10);
	}
	const handleResize = () => {
		viewport = {
			width: window.innerWidth,
			height: window.innerHeight,
		}
	}

	const randomBetween = (min, max) => {
		return Math.round(
	    (Math.random() * (max - min) + min) * 100
	  ) / 100
	}

	const draw = () => {
		count++

		rafTimeout = setTimeout(() => {
			const countFactor = map(count, 0, limit, 15, spreadFactor)
			const yBase = viewport.height / 2 + Math.sin(count/yFactor) * countFactor * heightFactor
			const xBase = viewport.width / 2 + Math.cos(count/xFactor) * countFactor * widthFactor

			const current = {
				y: yBase,
				x: xBase,
			}
			createNewCircle({
				color: cols[Math.floor(Math.random() * cols.length)],
				...current,
			})

			if (shouldDoShit) {
				raf = requestAnimationFrame(draw)
			} else {
				cancelAnimationFrame(raf)
			}
		}, velocity)
	}

	onMount(() => {
		resetMenuItems()
		handleResize()

		setup()

		raf = requestAnimationFrame(draw)

		requestAnimationFrame(() => {
			window.addEventListener('resize', handleResize)
			window.addEventListener('click', handleClick)
			window.addEventListener('mousedown', handleMouseDown)
			window.addEventListener('mouseup', handleMouseUp)
			window.addEventListener('mousemove', handleMouseMove)
			window.addEventListener('touchstart', handleMouseDown)
			window.addEventListener('touchend', handleMouseUp)
			window.addEventListener('touchmove', handleTouchMove)
		})

		return () => {
			clear()
		}
	})
</script>

<div class="wrapper">
	<svg width={viewport.width} height={viewport.height} viewBox={`0 0 ${viewport.width} ${viewport.height}`} fill="none">
		{#each circles as { x, y, color }}
			<Circle pos={[x, y]} color={color} size={25}/>
		{/each}
	</svg>
</div>

<style lang="scss">
	svg {
	  position: absolute;
	  top: 0;
	  left: 0;
		width: 100%;
		height: 100%;
	}
	:global(body) {
		-webkit-tap-highlight-color: none;
		overscroll-behavior: contain;
		overflow: hidden;
	}
</style>
