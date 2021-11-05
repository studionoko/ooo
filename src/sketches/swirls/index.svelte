<script>
	import { onMount } from 'svelte'
	import { getRandomColors } from '@nokonoko/colors'
	import Vector from './components/Vector.svelte'
  import { resetMenuItems } from '../../components/store'

	let cols = getRandomColors(['blues', 'reds', 'oranges', 'greens', 'purples'])

	let paths = []
	let count = 0
	let point = [0, 0]
	let isDrag = false
	let isDrawing = false
	let drawingInterval = null
	let inactivityTimer = null
	let viewport = { width: 1920, height: 1080 }

	$: shouldDoShit = count < 50

	export const clear = () => {
		paths = []
		clearInterval(drawingInterval)
		clearTimeout(inactivityTimer)
	}

	const createNewPath = path => {
		paths = [...paths, path]
	}

	const handleClick = ev => {
		createNewPath({
			color: cols[Math.floor(Math.random() * cols.length)],
			from: [
				Math.round(Math.random() * viewport.height),
				Math.round(Math.random() * viewport.width),
			],
			to: [ ev.pageX, ev.pageY ],
		})
	}
	const handleMouseDown = ev => {
		isDrag = true
		cols = getRandomColors(['blues', 'reds', 'oranges', 'greens', 'purples'])

		drawingInterval = setInterval(() => {
			createNewPath({
				color: cols[Math.floor(Math.random() * cols.length)],
				from: [
					Math.round(Math.random() * viewport.height),
					Math.round(Math.random() * viewport.width),
				],
				to: [ ev.pageX || ev.touches[0].clientX, ev.pageY || ev.touches[0].clientY ],
			})
		}, 20)
	}
	const handleMouseUp = ev => {
		isDrag = false
		isDrawing = false
		clearInterval(drawingInterval)
	}
	const handleMouseMove = ev => {
		if (!isDrag || isDrawing) return
		isDrawing = true
		clearInterval(drawingInterval)
		createNewPath({
			color: cols[Math.floor(Math.random() * cols.length)],
			from: [
				Math.round(Math.random() * viewport.height),
				Math.round(Math.random() * viewport.width),
			],
			to: [ ev.pageX, ev.pageY ],
		})
		setTimeout(() => isDrawing = false, 10);
	}
	const handleTouchMove = ev => {
		if (!isDrag || isDrawing) return
		isDrawing = true
		createNewPath({
			color: cols[Math.floor(Math.random() * cols.length)],
			from: [
				Math.round(Math.random() * viewport.height),
				Math.round(Math.random() * viewport.width),
			],
			to: [
				ev.touches[0].clientX,
				ev.touches[0].clientY,
			],
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
		inactivityTimer = setTimeout(() => {
			count++
			createNewPath({
				color: cols[Math.floor(Math.random() * cols.length)],
				to: point,
				from: [
					Math.round(Math.random() * viewport.height),
					Math.round(Math.random() * viewport.width),
				],
			})
			if (shouldDoShit) startAnimation()
		}, 20)
	}
	const restartTimer = () => {
		clearTimeout(inactivityTimer)
		clearInterval(inactivityTimer)
		inactivityTimer = setTimeout(startAnimation, 500)
	}

	onMount(() => {
		resetMenuItems()
		handleResize()

		point = [
			Math.floor(Math.random() * viewport.width),
			Math.floor(Math.random() * viewport.height),
		]

		restartTimer()

		window.addEventListener('resize', handleResize)

		requestAnimationFrame(() => {
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
	<svg width={viewport.width} height={viewport.height} viewBox={`0 0 ${viewport.width} ${viewport.height}`} fill="none">
		{#each paths as p}
			<Vector color={p.color || 'white'} to={p.to} from={p.from}/>
		{/each}
	</svg>
</div>

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
</style>
