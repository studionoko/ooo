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
		}, 2000)
	}
	const restartTimer = () => {
		clearTimeout(inactivityTimer)
		clearInterval(inactivityTimer)
		inactivityTimer = setTimeout(startAnimation, 3000)
	}

	onMount(() => {
		restartTimer()
		handleResize()

		window.addEventListener('click', handleClick)
		window.addEventListener('mousedown', handleMouseDown)
		window.addEventListener('mouseup', handleMouseUp)
		window.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('resize', handleResize)

		window.addEventListener('touchstart', handleMouseDown)
		window.addEventListener('touchend', handleMouseUp)
		window.addEventListener('touchmove', handleTouchMove)
	})
</script>

<Uhh className="logo" color="black"/>

{#each uhhs as u}
	{#if u.top !== 0}
		<Uhh color={u.color} top={u.top} left={u.left}/>
	{/if}
{/each}

<style>
:global(body) {
	background: #000;
	color: #fff;
}
@media (prefers-color-scheme: dark) {
	:global(body) {
		background: #000;
		color: #ff;
	}
	:global(.logo) {
		color: #fff !important;
	}
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
:global(.logo) {
	position: fixed;
	top: 2rem;
	left: 2rem;
	width: 5rem;
	height: 5rem;
	transform: none !important;
}
</style>
