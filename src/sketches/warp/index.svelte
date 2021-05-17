<script>
	import { onMount } from 'svelte'
	import { getRandomColorsFromCategory } from '@kvasi/colors'
	import { map } from '@kvasi/tools'
	import Circle from './components/Circle.svelte'

	const cols = getRandomColorsFromCategory('galaxy')
	const limit = 250

	let circles = []
	let count = 0
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
			const countFactor = map(count, 0, limit, 15, 200)
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
		}, 5)
	}

	onMount(() => {
		handleResize()

		yFactor = randomBetween(10.75, 10.85)
		xFactor = randomBetween(11, 11.15)
		heightFactor = randomBetween(1.15, 1.40)
		widthFactor = randomBetween(2.15, 2.65)

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

<svg width={viewport.width} height={viewport.height} viewBox={`0 0 ${viewport.width} ${viewport.height}`} fill="none">
	{#each circles as { x, y, color }}
		<Circle pos={[x, y]} color={color} size={25}/>
	{/each}
</svg>

<style>
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
@media screen and (min-width: 768px) {
	:global(body) {
		cursor: pointer;
	}
}
</style>
