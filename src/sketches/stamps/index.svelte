<script>
	import { onMount } from 'svelte'
	import Uhh from './components/Uhh.svelte'

	const colors = [
		'red', 'blue', 'yellow', 'green', 'orange', 'rebeccapurple', 'pink',
		'#FFDCC8', 'cyan', 'hotpink', 'purple', 'marine', '#82C1E4', '#DFD0FE',
		'#DAEDFF', '#B1F8B8', '#A1D8FF', '#FFDAA1', '#FFA1A1',
	]

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
			color: colors[Math.floor(Math.random() * colors.length)],
			top: ev.pageY,
			left: ev.pageX,
		})
	}
	const handleMouseDown = ev => isDrag = true
	const handleMouseUp = ev => isDrag = false
	const handleMouseMove = ev => {
		if (!isDrag || isDrawing) return
		isDrawing = true
		createNewUhh({
			color: colors[Math.floor(Math.random() * colors.length)],
			top: ev.pageY,
			left: ev.pageX,
		})
		setTimeout(() => isDrawing = false, 10);
	}
	const handleTouchMove = ev => {
		if (!isDrag || isDrawing) return
		isDrawing = true
		createNewUhh({
			color: colors[Math.floor(Math.random() * colors.length)],
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
				color: colors[Math.floor(Math.random() * colors.length)],
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
