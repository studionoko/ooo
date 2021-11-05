<script>
  import { onMount } from 'svelte'
  import { clamp, map } from '../../../util/math'

  export let val = 5
  export let min = 0
  export let max = 12

  let actualVal
  let actualMin
  let actualMax

  let track
  let wheel

  let active = false

  /**
   *  Handlers
   */
  const onMousedown = ev => {
    active = true
  }
  const onMousemove = ev => {
    if (!active) return
  }
  const onMouseup = () => {
    active = false
  }

  $: wheelStyle = `left: ${actualVal}px;`

  onMount(() => {
    actualMin = 0
    actualMax = track.offsetWidth
    actualVal = val / max * actualMax

    // console.table({val, min, max})
    // console.table({actualVal, actualMin, actualMax})
  })
</script>

<div
  class="slider"
>
  <div class="slider-wrapper">
    <span
      class="track"
      bind:this={track}
    >
      <span
        class="wheel"
        style={wheelStyle}
        on:mousemove={onMousemove}
        on:mousedown={onMousedown}
        on:mouseup={onMouseup}
      />
    </span>
  </div>
</div>

<style lang="scss">
  .slider {
    display: block;
    position: absolute;
    mix-blend-mode: exclusion;
    user-select: none;


    &-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 12rem;
      height: 3rem;
      background: transparent;
      border: solid 2px white;
      color: black;
      transform: rotate(-2deg);
      transition: transform 0.5s;
    }

    &:hover {
      .slider-wrapper {
        transform: translateY(-2px);
      }

      .wheel {
        height: 1.2rem;
        width: 1.2rem;
      }
    }

    @media screen and (min-width: 600px) {
      &-wrapper {
        border-width: 3px;
        width: 16rem;
        height: 4rem;
      }

      &:hover {
        .wheel {
          height: 1.5rem;
          width: 1.5rem;
        }
      }
    }
  }

  .track {
    display: block;
    flex: 0 1 80%;
    background: white;
    height: 2px;
    position: relative;

    @media screen and (min-width: 600px) {
      height: 3px;
      flex-basis: 80%;
    }
  }

  .slider .wheel {
    display: block;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
    transition: width 0.2s, height 0.2s;

    &:hover {
      height: 1.4rem;
      width: 1.4rem;
    }
    &:active {
      height: 1.2rem;
      width: 1.2rem;
      transition-duration: 0.1s;
    }

    @media screen and (min-width: 600px) {
      height: 1.2rem;
      width: 1.2rem;

      &:hover {
        height: 1.8rem;
        width: 1.8rem;
      }
      &:active {
        height: 1.4rem;
        width: 1.4rem;
      }
    }
  }
</style>