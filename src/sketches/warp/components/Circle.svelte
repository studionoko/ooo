<script>
  export let pos = [0,0]
  export let color = 'white'
  export let size = 25

</script>

<circle cx={pos[0]} cy={pos[1]} r={size} stroke={color}/>

<style>
@keyframes init {
  to {
    transform: scale(1);
  }
}
circle {
  stroke-width: 0.25rem;
  transform: scale(0);
  transform-origin: 50% 50%;
  animation: init 0.5s forwards ease;
}
</style>
