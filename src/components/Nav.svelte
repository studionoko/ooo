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

<style lang="scss">
  .nav {
    position: fixed;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    top: 0.5rem;
    right: 0.5rem;
    mix-blend-mode: exclusion;
    line-height: 1em;
    user-select: none;
    cursor: pointer;

    @media screen and (min-width: 768px) {
      .link::after {
        border-width: 0.23rem;
      }
    }
    @media (prefers-color-scheme: light) {
      mix-blend-mode: difference;
    }
  }

  :global(.nav .link) {
    position: relative;
    display: inline-block;
    width: auto;
    padding: 0 1rem;
    margin: 0;
    color: inherit;
    text-decoration: none;
    transform: translateX(1rem);
    transition: 0.1s padding;
    -webkit-tap-highlight-color: transparent;
    font-variation-settings: 'wght' 210;

    @media (prefers-color-scheme: light) {
      font-variation-settings: 'wght' 230;
    }

    &::after {
      content: '';
      display: block;
      opacity: 0;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border: solid 0.12rem currentColor;
      border-radius: 50%;
      transition: 0.1s opacity;
    }

    @media screen and (min-width: 768px) {
      font-variation-settings: 'wght' 250;

      &::after {
        border-width: 0.16rem;
      }
    }
  }

  :global(.nav .link[aria-current]) {
    padding: 0.5rem 1rem;
    &::after {
      opacity: 1;
    }
  }
</style>