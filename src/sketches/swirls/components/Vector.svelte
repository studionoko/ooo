<script>
  import { onMount } from 'svelte'

  export let to = [0,0]
  export let from = [0,0]
  export let color = 'white'

  let el
  let dashLength = 1000
  const curve = '107.304 -0.28566 364.26 -65.0555'

  /* const ac = 500.28566
  const bc = -5.0555 */

  const ac = Math.random() * 1000
  const bc = Math.random() * 1000

  $: a = (to[0]+from[0]) / 3
  $: b = (to[1]+from[1]) / 3

  $: position = `M${to[0]} ${to[1]} C${a} ${ac} ${b} ${bc} ${from[0]} ${from[1]}`

  onMount(() => {
    setTimeout(() => {
      dashLength = el.getTotalLength()
    }, 100)
  })
</script>

<path
  bind:this={el}
  d={position}
  stroke={color}
  stroke-width="4"
  stroke-dasharray={dashLength}
  stroke-dashoffset={dashLength}
/>
<!-- <path d="M1.12354 96.6078C107.304 -0.28566 364.26 -65.0555 449.204 150.49" stroke="white" stroke-width="4"/> -->

<style>
@keyframes init {
  to {
    stroke-dashoffset: 0;
  }
}
path {
  animation: init 2s both ease;
}
</style>
