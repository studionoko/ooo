<script>
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { createEventDispatcher } from 'svelte'
  import { activeMenuItems } from './store'

  export let current

  const dispatch = createEventDispatcher()
  const actions = [
    {
      action: () => dispatch('refresh'),
      animation: 'rotate',
      icon: `
        <path d="M250 478.74C376.33 478.74 478.74 376.33 478.74 250C478.74 189.53 455.275 134.541 416.955 93.6401V151.203H395.694V59.284H487.613V80.5441H433.808C474.899 125.093 500 184.615 500 250C500 388.071 388.071 500 250 500C206.49 500 165.576 488.885 129.943 469.339V444.738C164.84 466.298 205.967 478.74 250 478.74Z" fill="black"/>
        <path d="M81.7947 405.014C44.2148 364.257 21.2601 309.809 21.2601 250C21.2601 123.67 123.67 21.2601 250 21.2601C293.508 21.2601 334.179 33.4073 368.807 54.4953V29.9795C333.468 10.857 293.002 0 250 0C111.929 0 0 111.929 0 250C0 314.775 24.6347 373.796 65.0463 418.205H11.136V439.465H103.055V347.547H81.7947V405.014Z" fill="black"/>
      `,
    },
    {
      action: () => dispatch('clear'),
      animation: 'cross',
      icon: `
        <path fill-rule="evenodd" clip-rule="evenodd" d="M264.853 250L492.219 22.6338L477.366 7.78082L250 235.147L22.6338 7.78076L7.78087 22.6337L235.147 250L7.78087 477.366L22.6338 492.219L250 264.853L477.366 492.219L492.219 477.366L264.853 250Z" fill="black"/>
      `,
    },
    {
      action: () => dispatch('prevFrame'),
      animation: 'up',
      ghost: true,
      icon: `
        <path fill-rule="evenodd" clip-rule="evenodd" d="M260.503 499V45.3421L477.576 262.254L492.424 247.395L250 5.15262L7.57629 247.395L22.4237 262.254L239.497 45.3421V499H260.503Z" fill="black"/>
      `,
    },
    {
      action: () => dispatch('nextFrame'),
      animation: 'down',
      ghost: true,
      icon: `
        <path fill-rule="evenodd" clip-rule="evenodd" d="M260.503 1V454.658L477.576 237.746L492.424 252.605L250 494.847L7.57629 252.605L22.4237 237.746L239.497 454.658V1H260.503Z" fill="black"/>
      `,
    },
    {
      action: () => dispatch('toggleInputs'),
      animation: 'sliders',
      icon: `
        <path fill-rule="evenodd" clip-rule="evenodd" d="M379.894 27.9148H121.106C70.2429 27.9148 29.01 69.1477 29.01 120.011C29.01 170.874 70.2429 212.107 121.106 212.107H379.894C430.757 212.107 471.99 170.874 471.99 120.011C471.99 69.1477 430.757 27.9148 379.894 27.9148ZM121.106 7.90479C59.1917 7.90479 9 58.0965 9 120.011C9 181.926 59.1917 232.117 121.106 232.117H379.894C441.808 232.117 492 181.926 492 120.011C492 58.0965 441.808 7.90479 379.894 7.90479H121.106Z" fill="black"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M379.894 290.893H121.106C70.2429 290.893 29.01 332.126 29.01 382.989C29.01 433.852 70.2429 475.085 121.106 475.085H379.894C430.757 475.085 471.99 433.852 471.99 382.989C471.99 332.126 430.757 290.893 379.894 290.893ZM121.106 270.883C59.1917 270.883 9 321.075 9 382.989C9 444.904 59.1917 495.095 121.106 495.095H379.894C441.808 495.095 492 444.904 492 382.989C492 321.075 441.808 270.883 379.894 270.883H121.106Z" fill="black"/>
        <path class="p p1" fill-rule="evenodd" clip-rule="evenodd" d="M380 212.99C431.357 212.99 472.99 171.357 472.99 120C472.99 68.643 431.357 27.01 380 27.01C328.643 27.01 287.01 68.643 287.01 120C287.01 171.357 328.643 212.99 380 212.99ZM380 232C441.856 232 492 181.856 492 120C492 58.1441 441.856 8 380 8C318.144 8 268 58.1441 268 120C268 181.856 318.144 232 380 232Z" fill="black"/>
        <path class="p p2" fill-rule="evenodd" clip-rule="evenodd" d="M121 475.99C172.357 475.99 213.99 434.357 213.99 383C213.99 331.643 172.357 290.01 121 290.01C69.643 290.01 28.01 331.643 28.01 383C28.01 434.357 69.643 475.99 121 475.99ZM121 495C182.856 495 233 444.856 233 383C233 321.144 182.856 271 121 271C59.1441 271 9 321.144 9 383C9 444.856 59.1441 495 121 495Z" fill="black"/>
      `,
    },
  ].map(a => ({
    ...a,
    ref: null,
    tl: null,
  }))

  let slidersReversed = false

  const setAnimations = () => {
    actions.forEach(a => {
      const tl = gsap.timeline({ paused: true })

      switch (a.animation) {
        case 'rotate':
          tl.to(a.ref, { rotate: '-180deg', duration: 0.6, ease: 'power2.inOut' })
          break
        case 'cross':
          tl.to(a.ref, { scale: 0.5, duration: 0.2, ease: 'power1.in' })
          tl.to(a.ref, { scale: 1.15, duration: 0.1, ease: 'power1.out' })
          tl.to(a.ref, { scale: 1.0, duration: 0.2, ease: 'power1.inOut' })
          break
        case 'up':
          tl.fromTo([a.ref, a.ghost],
            { y: '0%' },
            { y: '-102%', duration: 0.5, ease: 'power2.inOut' },
          )
          break
        case 'down':
          tl.fromTo([a.ref, a.ghost],
            { y: '-102%' },
            { y: '0%', duration: 0.5, ease: 'power2.inOut' },
          )
          break
        case 'sliders':
          const [p1, p2] = a.ref.querySelectorAll('.p')
          tl.to(p1, { x: '-115%', duration: 0.5, ease: 'expo.inOut' })
          tl.to(p2, { x: '115%', duration: 0.5, ease: 'expo.inOut' }, 0)
          break
      }

      a.tl = tl
    })
  }

  const animate = a => {
    if (a.animation === 'sliders') {
      if (slidersReversed) {
        a.tl.reverse()
        slidersReversed = false
      } else {
        a.tl.play(0)
        slidersReversed = true
      }
    } else {
      a.tl.play(0)
    }
  }

  onMount(() => {
    setAnimations()
  })
</script>

<ul class="tools">

  {#each actions as a, i}
    <li class:hide={!$activeMenuItems[i]}>
      <button
        on:click|stopPropagation={a.action}
        on:mouseenter={() => animate(a)}
        class={`${a.ghost} ${a.animation}`}
        class:ghost={a.ghost}
      >
        <svg
          bind:this={a.ref}
          width="500" height="500" viewBox="0 0 500 500" fill="none"
        >
          {@html a.icon}
        </svg>
        {#if a.ghost}
          <svg
            class="ghost"
            bind:this={a.ghost}
            width="500" height="500" viewBox="0 0 500 500" fill="none"
          >
            {@html a.icon}
          </svg>
        {/if}
      </button>
    </li>
  {/each}

</ul>

<style lang="scss">
  .tools {
    display: flex;
    flex-direction: row;
    left: 1rem;
    bottom: 1rem;
    position: fixed;
    mix-blend-mode: exclusion;
    z-index: 100;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin: 0;
      margin-right: 0.5rem;
      position: relative;
      &.hide {
        display: none;
      }
    }

    svg {
      color: inherit;
      width: inherit;
      height: inherit;
      cursor: pointer;
      display: block;

      &.ghost {
        position: absolute;
        margin: 2% 0;
      }
    }

    button {
      display: block;
      appearance: none;
      border: none;
      background: none;
      box-shadow: none;
      color: inherit;
      padding: 0;
      margin: 0;
      width: 2.5rem;
      height: 2.5rem;

      &.ghost {
        position: relative;
        overflow: hidden;
      }

      &:active svg {
        opacity: 0.5;
      }

      @media screen and (min-width: 768px) {
        width: 3.5rem;
        height: 3.5rem;
      }
    }
  }

  :global(.tools svg path) {
    fill: currentColor;
  }
</style>