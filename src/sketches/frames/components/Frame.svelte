<script>
  import { onMount } from 'svelte'
  import canvasSketch from 'canvas-sketch'
  import { range } from 'canvas-sketch-util/random'
  import { title, date } from '../store'

  export let source

  let canvas
  let manager

  let rotation = range(-2, 3)

  /**
   *  Handlers
   */
  const onClick = () => {
    manager.render()
  }

  export const handleIsNext = () => {
    // console.log('title set...', source.meta.name)
    setTitle()
  }
  export const handleEnter = () => {
    // console.log('dis in view', canvas)
  }

  const setTitle = () => {
    $title = source.meta.name
    $date = source.meta.date
  }

  /**
   *  Mount
   */
  onMount(() => {
    async function loadSketch() {
      const { settings, sketch } = source

      const config = Object.assign({}, settings, {
        canvas,
        animate: false,
        playing: false,
        styleCanvas: false,
      })

      manager = await canvasSketch(sketch, config)
    }

    loadSketch()

    return () => {
      if (manager) {
        manager.pause()
        manager.unload()

        manager = undefined
      }
    }
  })
</script>

<div class="frame">
  <div>
    <span class="frame-fade" />
    <figure
      on:click={onClick}
      style={`transform: rotate(${rotation}deg);`}
    >
      <canvas bind:this={canvas} />
    </figure>
  </div>
</div>

<style lang="scss">
  .frame {
    width: 100%;
    height: auto;
    margin: 12rem 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 2rem;
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
    div {
      width: 100%;
      height: auto;
      position: relative;
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

    @media screen and (min-width: 600px) {
      figure {
        width: 30rem;
      }
    }
  }
</style>