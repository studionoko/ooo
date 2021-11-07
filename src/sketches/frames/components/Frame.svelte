<script>
  import { onMount } from 'svelte'
  import canvasSketch from 'canvas-sketch'
  import { range } from 'canvas-sketch-util/random'
  import { gsap } from 'gsap'
  import { title, date } from '../store'
  import Slider from './Slider.svelte'

  export let source

  let canvas
  let manager
  let isHorizontal = false
  let inputs
  let inputsSliders
  let showInputs = false
  let opts

  /**
   *  External
   */
  export const handleEnter = () => {
    if (manager) manager.play()

    setTitle()
  }
  export const handleLeave = () => {
    if (manager) {
      manager.pause()
      manager.unload()

      manager = undefined
    }
  }

  export const toggleInputs = () => {
    showInputs = !showInputs

    if (showInputs) {
      gsap.fromTo(inputsSliders, {
        opacity: 0,
        y: '30%',
      }, {
        opacity: 1,
        y: '0%',
        duration: 0.4,
        ease: 'power1.out',
      })
    } else {
      gsap.to(inputsSliders, {
        opacity: 0,
        y: '30%',
        ease: 'power1.in',
        duration: 0.4,
      })
    }
  }

  export const rerender = () => {
    manager.render()
  }

  const onClick = () => {
    manager.render()
  }

  const onSliderUpdate = () => {
    if (manager && opts) {
      manager.render()
    }
  }

  const setTitle = () => {
    $title = source.meta.name
    $date = source.meta.date
  }

  const loadSketch = async () => {
    const { settings, sketch } = source

    if (source.options) opts = source.options

    if (settings.dimensions[0] > settings.dimensions[1]) {
      isHorizontal = true
    }

    const config = Object.assign({}, settings, {
      canvas,
      animate: false,
      playing: false,
      styleCanvas: false,
    })

    manager = await canvasSketch(args => sketch(opts, args), config)
    manager.stop()
  }

  /**
   *  Mount
   */
  onMount(() => {
    loadSketch()

    if (source.options) {
      inputsSliders = inputs.querySelectorAll('.slider')
      if (!showInputs) {
        inputsSliders.forEach(el => el.style.opacity = 0)
      }
    }

    return handleLeave
  })

</script>

<div class="frame" class:horizontal={isHorizontal}>

  <div class="frame-wrapper">
    <span class="frame-fade" />
    <figure on:click={onClick}>
      <canvas bind:this={canvas} />
    </figure>
  </div>

  <div class="frame-inputs" bind:this={inputs}>
    {#if source.options}
      {#each source.options as opt}
        <Slider
          bind:val={opt.val}
          on:update={onSliderUpdate}
          min={opt.min}
          max={opt.max}
        />
      {/each}
    {/if}
  </div>

</div>

<style lang="scss">
  .frame {
    width: 100%;
    height: 100vh;
    margin: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 0;
    box-sizing: border-box;
    position: relative;

    figure {
      margin: 0;
      max-width: 100%;
      height: auto;
      display: inline-block;
    }
    canvas {
      width: 100%;
      display: block;
      background: #fff;
    }

    &-wrapper {
      width: 100%;
      height: auto;
      position: relative;
      padding: 0 2rem;
    }

    &-fade {
      position: absolute;
      top: 1.5rem;
      left: 0;
      width: 100%;
      height: calc(100% - 3rem);
      background: linear-gradient(to bottom, rgba(white,0), rgba(white,1) 25% 75%, rgba(white,0));

      @media (prefers-color-scheme: dark) {
        background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 25% 75%, rgba(0,0,0,0));
      }
    }

    &-inputs {
      position: absolute;
      display: block;
      top: 60%;
      left: 20%;
      background: #f30;
      width: auto;
      height: auto;
      transform-origin: 50% 50% !important;
    }

    @media screen and (min-width: 600px) {
      figure {
        width: 100%;
        max-width: 30rem;
      }

      &.horizontal {
        figure {
          width: 100%;
          max-width: 50rem;
        }
      }
    }
  }
</style>