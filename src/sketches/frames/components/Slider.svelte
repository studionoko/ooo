<script>
  import { onMount } from 'svelte'
  import { clamp, map } from '../../../util/math'

  export let val = 5
  export let min = 0
  export let max = 12

  let actualVal,
      actualMin,
      actualMax

  let track,
      wheel

  let active = false

  /**
   *  Handlers
   */
  const onMousedown = ev => {
    active = true
  }
  const onMousemove = ev => {
    if (!active) return

    let pos = ev.touches ? ev.touches[0].pageX : ev.pageX
    const size = track.offsetWidth
    console.log(pos / size)
    // actualVal += ev.pageX
  }
  const onMouseup = () => {
    active = false
  }

  $: pos = clamp(val, min, max) / max * 100
  $: wheelStyle = `left: ${pos}%;`

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
  on:mousemove={onMousemove}
>
  <div class="slider-wrapper">
    <span
      class="track"
      bind:this={track}
    />
    <span
      class="wheel"
      style={wheelStyle}
      on:mousedown={onMousedown}
      on:mouseup={onMouseup}
    />
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
      width: 16rem;
      height: 4rem;
      background: transparent;
      border: solid 3px white;
      color: black;
      transform: rotate(-2deg);
      transition: transform 0.5s;
    }

    &:hover {
      .slider-wrapper {
        transform: translateY(-2px);
      }

      .wheel {
        height: 1.5rem;
        width: 1.5rem;
      }
    }
  }

  .track {
    display: block;
    flex: 0 1 80%;
    background: white;
    height: 3px;
  }

  .slider .wheel {
    display: block;
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 50%;
    height: 1.2rem;
    width: 1.2rem;
    transition: width 0.2s, height 0.2s;

    &:hover {
      height: 1.8rem;
      width: 1.8rem;
    }
    &:active {
      height: 1.4rem;
      width: 1.4rem;
      transition-duration: 0.1s;
    }
  }
</style>