<script>
	import { onMount } from 'svelte'
	import { getRandomColors } from '@nokonoko/colors'
	import Uhh from './components/Uhh.svelte'
  import { resetMenuItems } from '../../components/store'

	let cols = getRandomColors()

	let uhhs = []
	let isDrag = false
	let isDrawing = false
	let inactivityTimer = null
	let viewport = { width: 1920, height: 1080 }

	let lastPos = undefined
	let velo = 0

	export const clear = () => {
		uhhs = []
		velo = 0
		lastPos = undefined
	}

	const createNewUhh = uhh => {
		uhhs = [...uhhs, uhh]
	}

	const setVelocity = (x, y) => {
		if (!lastPos) {
			lastPos = [x, y]
			return
		}

		const posDif = [
			lastPos[0] - x,
			lastPos[1] - y,
		]

		velo = Math.abs(posDif[0]) + Math.abs(posDif[1])
		lastPos = [x,y]
	}

	const handleClick = ev => {
		restartTimer()

		createNewUhh({
			velocity: 0,
			color: cols[Math.floor(Math.random() * cols.length)],
			top: ev.pageY,
			left: ev.pageX,
		})
	}
	const handleMouseDown = ev => {
		isDrag = true
		cols = getRandomColors()
	}
	const handleMouseUp = ev => {
		isDrag = false
		lastPos = undefined
		velo = 0
	}
	const handleMouseMove = ev => {
		if (!isDrag || isDrawing) return
		isDrawing = true
		setVelocity(ev.pageX, ev.pageY)
		createNewUhh({
			velocity: velo,
			color: cols[Math.floor(Math.random() * cols.length)],
			top: ev.pageY,
			left: ev.pageX,
		})
		restartTimer()
		setTimeout(() => isDrawing = false, 10)
	}
	const handleTouchMove = ev => {
		if (!isDrag || isDrawing) return
		isDrawing = true
		setVelocity(ev.touches[0].clientX, ev.touches[0].clientY)
		createNewUhh({
			velocity: velo,
			color: cols[Math.floor(Math.random() * cols.length)],
			top: ev.touches[0].clientY,
			left: ev.touches[0].clientX,
		})
		restartTimer()
		setTimeout(() => isDrawing = false, 10)
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
		resetMenuItems()
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

<div class="wrapper">
	{#each uhhs as u}
		{#if u.top !== 0}
			<Uhh color={u.color} top={u.top} left={u.left} velocity={u.velocity}/>
		{/if}
	{/each}
</div>

<style>
	:global(body) {
		-webkit-tap-highlight-color: none;
		overscroll-behavior: contain;
		overflow: hidden;
	}
</style>
