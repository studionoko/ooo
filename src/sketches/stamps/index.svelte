<script>
	import { onMount } from 'svelte'
	import { getRandomColors } from '@kvasi/colors'
	import Uhh from './components/Uhh.svelte'

	let cols = getRandomColors()

	let uhhs = []
	let isDrag = false
	let isDrawing = false
	let inactivityTimer = null
	let viewport = { width: 1920, height: 1080 }

	const createNewUhh = uhh => {
		uhhs = [...uhhs, uhh]
	}

	const handleClick = ev => {
		restartTimer()

		createNewUhh({
			color: cols[Math.floor(Math.random() * cols.length)],
			top: ev.pageY,
			left: ev.pageX,
		})
	}
	const handleMouseDown = ev => {
		isDrag = true
		cols = getRandomColors()
	}
	const handleMouseUp = ev => isDrag = false
	const handleMouseMove = ev => {
		if (!isDrag || isDrawing) return
		isDrawing = true
		createNewUhh({
			color: cols[Math.floor(Math.random() * cols.length)],
			top: ev.pageY,
			left: ev.pageX,
		})
		setTimeout(() => isDrawing = false, 10);
	}
	const handleTouchMove = ev => {
		if (!isDrag || isDrawing) return
		isDrawing = true
		createNewUhh({
			color: cols[Math.floor(Math.random() * cols.length)],
			top: ev.touches[0].clientY,
			left: ev.touches[0].clientX,
		})
		setTimeout(() => isDrawing = false, 10);
	}
	const handleResize = () => {
		viewport = {
			width: window.innerWidth,
			height: window.innerHeight,
		}
	}

	const startAnimation = () => {
		inactivityTimer = setInterval(() => {
			createNewUhh({
				color: cols[Math.floor(Math.random() * cols.length)],
				top: Math.floor(Math.random() * viewport.height),
				left: Math.floor(Math.random() * viewport.width),
			})
		}, 1000)
	}
	const restartTimer = () => {
		clearTimeout(inactivityTimer)
		clearInterval(inactivityTimer)
		inactivityTimer = setTimeout(startAnimation, 50)
	}

	onMount(() => {
		restartTimer()
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

{#each uhhs as u}
	{#if u.top !== 0}
		<Uhh color={u.color} top={u.top} left={u.left}/>
	{/if}
{/each}

<style>
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
