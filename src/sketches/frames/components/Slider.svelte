<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { clamp, map } from '../../../util/math'

  export let val = 6
  export let min = 0
  export let max = 12

  let actualVal
  let actualMin
  let actualMax

  let x
  let track
  let wheel

  let ready = false
  let active = false

  const dispatch = createEventDispatcher()

  /**
   *  Wheel handlers
   */
  const onMousedown = ev => {
    active = true
    x = track.getBoundingClientRect().left
  }
  const onMousemove = ev => {
    if (!active) return
    const ex = ev.clientX || ev.touches[0].clientX
    actualVal = clamp(ex - x, actualMin, actualMax)
  }
  const onMouseup = ev => {
    if (!active) return
    active = false
    x = track.getBoundingClientRect().left
  }

  /**
   *  Track handlers
   */
  const onTrackClick = ev => {
    const { left } = track.getBoundingClientRect()
    const ex = ev.clientX || ev.touches[0].clientX
    actualVal = ex - left
  }

  /**
   *  Conditional styles
   */
  $: wheelStyle = `left: ${actualVal}px;`
  $: { actualVal;
    if (ready) {
      val = Math.round(actualVal / actualMax * max)
    }
  }
  $: val, dispatch('update', val)

  /**
   *  Set defaults on mount
   */
  onMount(() => {
    actualMin = min
    actualMax = track.offsetWidth
    actualVal = val / max * actualMax

    ready = true
  })
</script>

<svelte:window
  on:mousemove={onMousemove}
  on:mouseup={onMouseup}
  on:touchend={onMouseup}
  on:touchmove={onMousemove}
/>

<div
  class="slider"
  class:active={active}
>
  <div class="slider-wrapper">
    <span
      class="track"
      bind:this={track}
      on:click={onTrackClick}
    >
      <span
        class="wheel"
        class:active={active}
        style={wheelStyle}
        on:mousedown={onMousedown}
        on:touchstart={onMousedown}
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
    user-drag: none;
    touch-action: none;
    -webkit-app-region: no-drag;

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
      position: relative;
    }

    &:hover {
      .slider-wrapper {
        transform: translateY(-3px);
      }

      .wheel {
        height: 1.2rem;
        width: 1.2rem;
      }
    }

    &.active {
      .slider-wrapper {
        transform: translateY(-3px);
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
    flex: 0 1 85%;
    height: 2.25rem;
    position: relative;

    &::before {
      content: "";
      display: block;
      position: absolute;
      margin: auto;
      top: 0;
      height: 2px;
      bottom: 0;
      left: -0.2rem;
      right: -0.2rem;
      background: white;
    }

    @media screen and (min-width: 600px) {
      flex-basis: 80%;
      &::before {
        height: 3px;
      }
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
    transition: width 0.2s, height 0.2s, left 0.3s;

    &:hover {
      height: 1.4rem;
      width: 1.4rem;
    }
    &:active {
      height: 1.2rem;
      width: 1.2rem;
      transition-duration: 0.1s;
    }

    &.active {
      transition: width 0.2s, height 0.2s;
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