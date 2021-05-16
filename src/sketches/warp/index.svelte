<script>
	import { onMount } from 'svelte'
	import { getRandomColors } from '@kvasi/colors'
	import Circle from './components/Circle.svelte'

	const cols = getRandomColors()

	export const name = 'Warp'

	let circles = []
	let viewport = { width: 1920, height: 1080 }
	let isDrag,
			isDrawing

	export const clear = () => {
		circles = []
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

	onMount(() => {
		handleResize()

		window.addEventListener('resize', handleResize)

		requestAnimationFrame(() => {
			window.addEventListener('click', handleClick)
			window.addEventListener('mousedown', handleMouseDown)
			window.addEventListener('mouseup', handleMouseUp)
			window.addEventListener('mousemove', handleMouseMove)
			window.addEventListener('touchstart', handleMouseDown)
			window.addEventListener('touchend', handleMouseUp)
			window.addEventListener('touchmove', handleTouchMove)
		})
	})
</script>

<svg width={viewport.width} height={viewport.height} viewBox={`0 0 ${viewport.width} ${viewport.height}`} fill="none">
	{#each circles as c}
		<Circle pos={[c.x, c.y]} color={c.color} size={25}/>
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
