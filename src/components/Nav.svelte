<script>
  import { Link } from 'svelte-routing'
  export let sketches = []
</script>

<nav class="nav">
  <Link class="link" to="frames">Frames</Link>
  {#each sketches as sketch}
    <Link class="link" to={`sketch/${sketch.name.toLowerCase()}`}>{ sketch.name }</Link>
  {/each}
</nav>